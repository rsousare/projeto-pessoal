package com.example.crudMySql.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "person")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id"
//)
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "area_id",
            referencedColumnName = "id",
            foreignKey = @ForeignKey(name = "fk_person_area")
    )
    @JsonBackReference
    private Area area;

    @ManyToMany(mappedBy = "people")
    @JsonBackReference
    private List<Project> projects;

    public Person(Users user) {
        if (user != null && user.getEmail() != null) {
            this.email = user.getEmail();
        }
    }
}
