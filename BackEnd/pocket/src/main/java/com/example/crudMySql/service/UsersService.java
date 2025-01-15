package com.example.crudMySql.service;

import com.example.crudMySql.entity.Users;
import com.example.crudMySql.entity.UsersType;
import com.example.crudMySql.repository.UsersRepository;
import com.example.crudMySql.repository.UsersTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {

    private UsersRepository usersRepository;
    private PasswordEncoder passwordEncoder;
    private UsersTypeRepository usersTypeRepository;


    @Autowired
    public UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder, UsersTypeRepository usersTypeRepository) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.usersTypeRepository = usersTypeRepository;
    }

    public List<Users> getAll() {
        return usersRepository.findAll();
    }

    public Users createUser(String email, String password, Integer userTypeId) {
        String encodePass = passwordEncoder.encode(password);

        UsersType userType = usersTypeRepository.findById(userTypeId).orElseThrow(() -> new RuntimeException("User Type not found"));

        Users user = new Users();
        user.setEmail(email);
        user.setPassword(encodePass);
        user.setUserType(userType);

        return usersRepository.save(user);
    }

    public boolean existsByEmail(String email) {
        return usersRepository.existsByEmail(email);
    }
}
