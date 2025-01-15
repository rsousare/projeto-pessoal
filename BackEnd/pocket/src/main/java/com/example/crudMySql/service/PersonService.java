package com.example.crudMySql.service;

import com.example.crudMySql.entity.Person;
import com.example.crudMySql.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {
    private PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person> getAll() {
        return personRepository.findAll();
    }

    public Optional<Person> getPersonById(int id) {
        return personRepository.findById(id);
    }

    public List<Person> findAllById(List<Integer> id) {
        return personRepository.findAllById(id);
    }

    public Person createPerson(Person person) {
        if (personRepository.existsByEmail(person.getEmail())) {
            throw new IllegalArgumentException("Email already exists!");
        }
        return personRepository.save(person);
    }

    public Person updatePerson(Person person) {
        Optional<Person> existingPerson = personRepository.findById(person.getId());

        Person personToUpdate = existingPerson.get();
        personToUpdate.setFirstName(person.getFirstName());
        personToUpdate.setLastName(person.getLastName());
        personToUpdate.setEmail(person.getEmail());
        personToUpdate.setArea(person.getArea());
        return personRepository.save(personToUpdate);
    }

    public void deletePerson(Integer id) {
        personRepository.deleteById(id);
    }

    public boolean emailExists(String email) {
        return personRepository.existsByEmail(email);
    }
}
