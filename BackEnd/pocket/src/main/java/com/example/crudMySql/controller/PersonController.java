package com.example.crudMySql.controller;

import com.example.crudMySql.entity.Person;
import com.example.crudMySql.entity.dto.PersonDTO;
import com.example.crudMySql.service.AreaService;
import com.example.crudMySql.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/people")
public class PersonController {


    private PersonService personService;
    @Autowired
    private AreaService areaService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Person> people = personService.getAll();
        if (people.isEmpty()) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Empty List");
            response.put("status", HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        }
        List<PersonDTO> personDTO = people.stream()
                .map(PersonDTO::new)
                .toList();

        return ResponseEntity.ok(Map.of("data", personDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPersonById(@PathVariable Integer id) {
        if (id == null || id <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid id");
        }
        Optional<Person> personOptional = personService.getPersonById(id);
        if (personOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id not found");
        }
        Person person = personOptional.get();
        PersonDTO personDTO = new PersonDTO(person);
        return ResponseEntity.ok(personDTO);
    }

    @PostMapping
    public ResponseEntity<?> createPerson(@RequestBody Person person) {
        if (person.getFirstName().isEmpty() || person.getLastName().isEmpty() || person.getEmail().isEmpty() || person.getArea().getId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All fields are required");
        }

        try {

            boolean areaExists = areaService.existsById(person.getArea().getId());
            if (!areaExists) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The provided Area ID does not exist");
            }

            personService.createPerson(person);
            return ResponseEntity.ok("Person successfully created.");
        }catch (IllegalArgumentException ex) {
            if (ex.getMessage().contains("Email already exists")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("This Email is already registered");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An Error occurred: " + ex.getMessage());
        }
    }

//    @PostMapping
//    public ResponseEntity<?> createPerson(@RequestBody PersonDTO personDTO) {
//        if (personDTO.getFirstName().isEmpty() || personDTO.getLastName().isEmpty() || personDTO.getEmail().isEmpty() || personDTO.getAreaId() == null) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All fields are required");
//        }
//
//        Area area = areaService.getAreaById(personDTO.getAreaId()).orElseThrow(() -> new RuntimeException("Area id not found"));
//
//        Person person = new Person();
//        person.setFirstName(person.getFirstName());
//        person.setLastName(person.getLastName());
//        person.setEmail(personDTO.getEmail());
//        person.setArea(area);
//
//        personService.createPerson(person);
//        return ResponseEntity.ok(new PersonDTO(person));
//    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePerson(@RequestBody Person person, @PathVariable Integer id) {
        if (person.getFirstName().isEmpty() || person.getLastName().isEmpty() || person.getEmail().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("All fields are required");
        }
        try {
            boolean areExists = areaService.existsById(person.getArea().getId());
            if (!areExists) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The provided Area Id does not exist");
            }
            Person existingPerson = personService.getPersonById(id).get();

            if (!existingPerson.getEmail().equals(person.getEmail())) {
                boolean emailExists = personService.emailExists(person.getEmail());
                if (emailExists) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body("This Email is already registered");
                }
            }

            personService.updatePerson(person);
            return ResponseEntity.ok("Person successfully updated.");
        }catch (IllegalArgumentException ex) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An Error occurred: " + ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePerson(@PathVariable Integer id) {
        if (id == null || id <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect id");
        }
        Optional<Person> person = personService.getPersonById(id);
        if (person.isPresent()) {
            personService.deletePerson(id);
            return ResponseEntity.ok().body("Success deleting id: " + id);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id not found");
    }
}
