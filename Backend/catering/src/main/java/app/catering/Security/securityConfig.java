package app.catering.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class securityConfig {
//    @Bean es para crear un bean de la clase BCryptPasswordEncoder
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        //retorna un BCryptPasswordEncoder que encripta la contraseña
        return new BCryptPasswordEncoder();
    }

    // Deshabilita seguridad por defecto para permitir el registro
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/registro").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }
}
