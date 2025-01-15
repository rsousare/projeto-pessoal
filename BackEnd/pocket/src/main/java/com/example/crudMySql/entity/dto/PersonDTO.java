package com.example.crudMySql.entity.dto;


import com.example.crudMySql.entity.Person;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PersonDTO {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private Integer areaId;
    private String areaName;

    public PersonDTO(Person person) {
        this.id = person.getId();
        this.firstName = person.getFirstName();
        this.lastName = person.getLastName();
        this.email = person.getEmail();
        this.areaId = person.getArea().getId();
        this.areaName = person.getArea().getName();
    }
}
