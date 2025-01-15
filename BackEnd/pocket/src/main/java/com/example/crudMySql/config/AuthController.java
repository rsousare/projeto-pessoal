package com.example.crudMySql.config;

import com.example.crudMySql.entity.Users;
import com.example.crudMySql.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Basic ")) {
            String baseCredentials = authHeader.substring("Basic ".length()).trim();
            String credentials = new String(java.util.Base64.getDecoder().decode(baseCredentials));
            final String[] values = credentials.split(":", 2);
            String email = values[0];
            String password = values[1];

            if (validarUsuario(email, password)) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Successful Login");
                response.put("email", email);
                //System.out.println(response);
                return ResponseEntity.ok(response);

            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
            }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Missing Authorization Header"));
    }


    private boolean validarUsuario(String email, String password) {
        Optional<Users> user = usersRepository.findByEmail(email);
        if (user.isPresent()) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            return passwordEncoder.matches(password, user.get().getPassword());
        }
        return false;
    }
}
