package com.example.crudMySql.repository;

import com.example.crudMySql.entity.UsersType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersTypeRepository extends JpaRepository<UsersType, Integer> {
    //Optional<UsersType> findById(Integer id);
}
