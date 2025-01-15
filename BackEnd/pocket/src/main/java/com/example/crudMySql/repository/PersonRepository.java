package com.example.crudMySql.repository;

import com.example.crudMySql.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {
    boolean existsByEmail(String email);
}
