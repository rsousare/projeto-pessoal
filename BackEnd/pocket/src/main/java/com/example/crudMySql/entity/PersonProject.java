package com.example.crudMySql.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "person_project")
public class PersonProject implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "person_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_person_project_person"))
    private Person person;

    @Id
    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_person_project_project"))
    private Project project;
}
