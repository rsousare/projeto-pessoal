package com.example.crudMySql.entity.dto;

import com.example.crudMySql.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UsersDTO {
    private String email;
    private String password;
    private Integer userTypeId;

    public UsersDTO(Users users) {
        this.email = users.getEmail();
        this.password = users.getPassword();
        this.userTypeId = getUserTypeId();
    }
}
