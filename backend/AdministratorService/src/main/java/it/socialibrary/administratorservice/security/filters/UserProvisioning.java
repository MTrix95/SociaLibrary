package it.socialibrary.administratorservice.security.filters;

import it.socialibrary.administratorservice.service.impl.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
public class UserProvisioning extends OncePerRequestFilter {

    private final UserService userService;

    @Autowired
    public UserProvisioning(UserService userService) {
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        // Verifico se non è autenticato cosi da skippare il provisioning
        if(!(auth instanceof JwtAuthenticationToken jwtAuth) || !auth.isAuthenticated()) {
            // Continuo con il filtro cosi non salva se non ci sono utenti autenticati, utile per gli endpoint pubblici
            filterChain.doFilter(request, response);
            return;
        }

        try {
            userService.saveFromJwt(jwtAuth.getToken());
        } catch (RuntimeException e) {
            log.error("Error provisioning user", e);

            // Blocco il provisioning se si verifica un errore
            response.sendError(HttpServletResponse.SC_SERVICE_UNAVAILABLE, "Service unavailable");
            return;
        }

        filterChain.doFilter(request, response);
    }

}
