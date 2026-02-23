package it.socialibrary.administratorservice.service.impl;

import it.socialibrary.administratorservice.entity.User;
import it.socialibrary.administratorservice.exceptions.AdministratorException;
import it.socialibrary.administratorservice.exceptions.NotFoundException;
import it.socialibrary.administratorservice.repository.UserRepository;
import it.socialibrary.administratorservice.service.IUserService;
import it.socialibrary.administratorservice.utils.JWTUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Slf4j
public class UserService implements IUserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Salva un nuovo utente dal JWT ricevuto.
     * @param jwt - JWT ricevuto dal client
     * @throws AdministratorException Errore generico
     */
    @Override
    @Transactional
    public void saveFromJwt(Jwt jwt) throws AdministratorException {
        if(jwt == null) throw new AdministratorException("JWT cannot be null");

        UUID userId = JWTUtils.getUserId();
        if(userRepository.existsById(userId)) return;

        User user = new User();
        user.setId(userId);
        user.setName(JWTUtils.getName());
        user.setSurname(JWTUtils.getSurname());
        user.setEmail(JWTUtils.getEmail());

        // Effettuo il salvataggio del nuovo utente
        userRepository.save(user);
        log.info("User {} created", user.getId());
    }

    /**
     * Restituisce tutti gli utenti registrati nel sistema in maniera paginata.
     *
     * @param pageable pagina da recuperare
     * @return Page<User> - Ritorna una pagina di utenti
     */
    @Override
    @Transactional(readOnly = true)
    public Page<User> findAll(Pageable pageable) {
        return this.userRepository.findAll(pageable);
    }

    /**
     * Restituisce un utente specifico dal suo ID.
     *
     * @param idUser ID dell'utente da recuperare
     * @return Page<User> - Ritorna una pagina di utenti
     */
    @Transactional(readOnly = true)
    public User findById(UUID idUser) throws NotFoundException {
        return userRepository.findById(idUser).orElseThrow(() -> new NotFoundException("Record not found"));
    }
}
