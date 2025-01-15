package com.example.crudMySql.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig{

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, CustomAccessDeniedHandler accessDeniedHandler) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
//                        .requestMatchers("/users/**").permitAll()
                                .requestMatchers(HttpMethod.POST, "/login").permitAll()
                                .requestMatchers(HttpMethod.POST, "/users/create").permitAll()

                                .requestMatchers(HttpMethod.GET, "/areas", "/areas/**").hasAnyRole("EMPLOYEE", "MANAGER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/areas").hasAnyRole("ADMIN", "MANAGER")
                                .requestMatchers(HttpMethod.PUT, "/areas/**").hasRole("MANAGER")
                                .requestMatchers(HttpMethod.DELETE, "/areas/**").hasRole("ADMIN")

                                .requestMatchers(HttpMethod.GET, "/people", "/people/**").hasAnyRole("EMPLOYEE", "MANAGER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/people").hasAnyRole("ADMIN", "MANAGER")
                                .requestMatchers(HttpMethod.PUT, "/people/**").hasRole("MANAGER")
                                .requestMatchers(HttpMethod.DELETE, "/people/**").hasRole("ADMIN")

                                .requestMatchers(HttpMethod.GET, "/projects", "/projects/**").hasAnyRole("EMPLOYEE", "MANAGER", "ADMIN")
                                .requestMatchers(HttpMethod.POST, "/projects").hasAnyRole("ADMIN", "MANAGER")
                                .requestMatchers(HttpMethod.PUT, "/projects/**").hasRole("MANAGER")
                                .requestMatchers(HttpMethod.DELETE, "/projects/**").hasRole("ADMIN")

                                .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults())
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .accessDeniedHandler(accessDeniedHandler)
                );



        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
