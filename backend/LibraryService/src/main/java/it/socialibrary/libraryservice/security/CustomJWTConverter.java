package it.socialibrary.libraryservice.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@Slf4j
public class CustomJWTConverter implements Converter<Jwt, AbstractAuthenticationToken>{

    private static final String GIVEN_NAME_KEY = "given_name";
    private static final String FAMILY_NAME_KEY = "family_name";
    private static final String ROLES_KEY = "roles";
    private static final String ROLE_PREFIX = "ROLE_";

    @Override
    public AbstractAuthenticationToken convert(Jwt source) {
        try {
            log.debug("Starting JWT conversion for token with subject: {}", source.getSubject());
            final UUID idUser = UUID.fromString(source.getSubject());

            // Trasformo i ruoli di Keycloak con la seguente nomenclatura ROLE_NOMERUOLO
            final Collection<GrantedAuthority> authorities = extractRolesFromJWT(source);
            final String name = source.getClaimAsString(GIVEN_NAME_KEY) + " " + source.getClaimAsString(FAMILY_NAME_KEY);

            log.info("Authentication principal created for user: {}", idUser);
            // Viene autenticato l'utente
            return new JwtAuthenticationToken(source, authorities, name);
        } catch (RuntimeException e) {
            log.error("Error converting JWT to Authentication", e);
            throw e;
        }
    }

    /**
     * Converte una lista di ruoli in un elenco di {@link GrantedAuthority} con il prefisso "ROLE_".
     * <p>
     * Questo metodo prende una lista di ruoli in formato stringa, aggiunge il prefisso "ROLE_"
     * a ciascun ruolo e li converte in un elenco di oggetti {@link GrantedAuthority},
     * che sono utilizzati da Spring Security per il controllo degli accessi basato sui ruoli.
     * </p>
     *
     * @param jwt - JWT da cui estrarre i ruoli
     * @return una lista di {@link GrantedAuthority} contenente i ruoli convertiti con il prefisso "ROLE_"
     */
    private Collection<GrantedAuthority> extractRolesFromJWT(final Jwt jwt) {
        final List<GrantedAuthority> grantedAuthorities = new ArrayList<>();

        final List<String> roles = jwt.getClaimAsStringList(CustomJWTConverter.ROLES_KEY);
        Optional.of(roles).ifPresent(r -> {
            for (String role : roles) {
                if (role != null && !role.trim().isEmpty()) {
                    grantedAuthorities.add(
                            new SimpleGrantedAuthority(CustomJWTConverter.ROLE_PREFIX + role.toUpperCase().trim()));
                }
            }
        });

        log.debug("Roles extracted from JWT: {}", grantedAuthorities);
        return Collections.unmodifiableCollection(grantedAuthorities);
    }
}
