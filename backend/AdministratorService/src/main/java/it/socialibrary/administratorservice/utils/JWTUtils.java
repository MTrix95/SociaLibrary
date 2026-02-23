package it.socialibrary.administratorservice.utils;

import lombok.experimental.UtilityClass;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Optional;
import java.util.UUID;

@UtilityClass
public class JWTUtils {

    private static final String GIVEN_NAME_KEY = "given_name";
    private static final String FAMILY_NAME_KEY = "family_name";
    private static final String EMAIL_KEY = "email";

    public static Optional<Jwt> getJwt() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        return Optional.ofNullable(auth)
                .filter(a -> a.getPrincipal() instanceof Jwt)
                .map(a -> (Jwt) a.getPrincipal());
    }

    /**
     * Recupera l'ID dell'utente autenticato.
     * @return UUID dell'utente autenticato
     */
    public static UUID getUserId() {
        return getJwt().map(Jwt::getSubject)
                .map(UUID::fromString)
                .orElseThrow(() -> new RuntimeException("Impossibile recuperare l'utente autenticato"));
    }

    public static String getEmail() {
        return getJwt()
                .map(jwt -> jwt.getClaimAsString(JWTUtils.EMAIL_KEY))
                .orElse(null);
    }

    public static String getName() {
        return getJwt()
                .map(jwt -> jwt.getClaimAsString(JWTUtils.GIVEN_NAME_KEY))
                .orElse(null);
    }

    public static String getSurname() {
        return getJwt()
                .map(jwt -> jwt.getClaimAsString(JWTUtils.FAMILY_NAME_KEY))
                .orElse(null);
    }
}
