package com.example.crudMySql.repository;

import com.example.crudMySql.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Integer> {
//    @Query("SELECT u from Users u WHERE u.email.email = :email")
//    Optional<Users> findByEmail(@Param("email") String email);

    //Optional<Users> findByEmail_Email(String email);

    Optional<Users> findByEmail(String email);

    boolean existsByEmail(String email);
}
