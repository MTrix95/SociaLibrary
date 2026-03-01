package it.socialibrary.administratorservice.config;

import it.socialibrary.administratorservice.security.CustomJWTConverter;
import it.socialibrary.administratorservice.security.filters.UserProvisioning;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.web.authentication.BearerTokenAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final UserProvisioning userProvisioning;
    private final CustomJWTConverter customJWTConverter;

    @Autowired
    public SecurityConfig(UserProvisioning userProvisioning, CustomJWTConverter customJWTConverter) {
        this.userProvisioning = userProvisioning;
        this.customJWTConverter = customJWTConverter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(authorize -> authorize
                        // API pubbliche
                        .requestMatchers(HttpMethod.GET, "/actuator/health").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/public/**").permitAll()

                        .requestMatchers("/api/**").authenticated()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth ->
                        oauth.jwt(jwt ->
                                jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())
                        )
                ).addFilterAfter(userProvisioning, BearerTokenAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Fornisce un convertitore personalizzato per l'autenticazione JWT.
     * <p>
     * Questo metodo restituisce un'istanza di {@link Converter} che converte un oggetto {@link Jwt}
     * in un'istanza di {@link AbstractAuthenticationToken}. Il convertitore utilizza una classe personalizzata
     * {@link CustomJWTConverter} per gestire la logica di autenticazione basata sui token JWT.
     * </p>
     *
     * @return un'istanza di {@link Converter} per la conversione di JWT in {@link AbstractAuthenticationToken}.
     */
    @Bean
    public Converter<Jwt, AbstractAuthenticationToken> jwtAuthenticationConverter() {
        return customJWTConverter;
    }
}
