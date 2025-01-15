package com.example.crudMySql.controller;

import com.example.crudMySql.entity.Users;
import com.example.crudMySql.entity.dto.UsersDTO;
import com.example.crudMySql.service.UsersService;
import com.example.crudMySql.service.UsersTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UsersController {
    private UsersTypeService usersTypeService;
    private UsersService usersService;

    @Autowired
    public UsersController(UsersTypeService usersTypeService, UsersService usersService) {
        this.usersTypeService = usersTypeService;
        this.usersService = usersService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Users> users = usersService.getAll();
        if (users.isEmpty()) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Empty List");
            response.put("status", HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        }
        List<UsersDTO> usersDTOS = users.stream()
                .map(UsersDTO::new)
                .toList();
        return ResponseEntity.ok(Map.of("data", usersDTOS));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UsersDTO usersDTO) {
        if (usersDTO.getEmail().isEmpty() || usersDTO.getPassword().isEmpty() || usersDTO.getUserTypeId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All fields are required");
        }

        try {
            boolean userTypeExists = usersTypeService.existsById(usersDTO.getUserTypeId());
            if (!userTypeExists) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The provided User Type ID does not exist");
            }

            if (usersService.existsByEmail(usersDTO.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("This Email is already registered");
            }

            Users users = usersService.createUser(usersDTO.getEmail(), usersDTO.getPassword(), usersDTO.getUserTypeId());
            return ResponseEntity.status(HttpStatus.CREATED).body("User Created Successfully");

        }catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An Error occurred: " + ex.getMessage());
        }
    }
}
