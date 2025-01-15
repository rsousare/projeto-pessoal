package com.example.crudMySql.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

//    @OneToOne
//    @JoinColumn(name = "email", referencedColumnName = "email", nullable = false)
//    private Person email;
//    @ManyToOne(fetch = FetchType.LAZY)
//    private Person person;

    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "user_type_id", nullable = false)
    @JsonBackReference
    private UsersType userType;
}
