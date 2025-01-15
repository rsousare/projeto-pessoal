package com.example.crudMySql.service;

import com.example.crudMySql.entity.UsersType;
import com.example.crudMySql.repository.UsersTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersTypeService {
    private UsersTypeRepository usersTypeRepository;

    @Autowired
    public UsersTypeService(UsersTypeRepository usersTypeRepository) {
        this.usersTypeRepository = usersTypeRepository;
    }

    public List<UsersType> getAll() {
        return usersTypeRepository.findAll();
    }

    public boolean existsById(Integer id) {
        return usersTypeRepository.existsById(id);
    }
}
