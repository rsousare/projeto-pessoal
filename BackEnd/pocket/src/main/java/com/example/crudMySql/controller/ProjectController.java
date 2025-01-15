package com.example.crudMySql.controller;

import com.example.crudMySql.entity.Area;
import com.example.crudMySql.entity.Person;
import com.example.crudMySql.entity.Project;
import com.example.crudMySql.entity.dto.ProjectDTO;
import com.example.crudMySql.service.AreaService;
import com.example.crudMySql.service.PersonService;
import com.example.crudMySql.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private ProjectService projectService;
    private AreaService areaService;

    private PersonService personService;

    @Autowired
    public ProjectController(ProjectService projectService, AreaService areaService, PersonService personService) {
        this.projectService = projectService;
        this.areaService = areaService;
        this.personService = personService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Project> projects = projectService.getAll();
        if (projects.isEmpty()) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Empty List");
            response.put("status", HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        }
        List<ProjectDTO> projectDTO = projects.stream()
                .map(ProjectDTO::new)
                .toList();

        return ResponseEntity.ok(Map.of("data", projectDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable Integer id) {
        if (id == null || id <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid id");
        }
        Optional<Project> projectOptional = projectService.getProjectById(id);
        if (projectOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id not found");
        }
        Project project = projectOptional.get();
        ProjectDTO projectDTO = new ProjectDTO(project);

        return ResponseEntity.ok(projectDTO);
    }

    @PostMapping(consumes = "application/json")
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        if (project.getName().isEmpty() || project.getName() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name are required");
        }
        if (project.getEndDate().isBefore(LocalDate.now()) || project.getEndDate() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Verify the field End Date");
        }

        if (project.getArea().getId() == null || project.getArea() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Area id is required");
        }

        boolean areaExists = areaService.existsById(project.getArea().getId());
        if (!areaExists) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The provided Area Id does not exist");
        }

        if (project.getPeople() != null && !project.getPeople().isEmpty()) {
            List<Person> people = personService.findAllById(project.getPeople().stream()
                    .map(Person::getId)
                    .collect(Collectors.toList()));
            if (people.size() != project.getPeople().size()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Some of the people IDs are invalid");
            }
            project.setPeople(people);
        }

        projectService.createProject(project);
        return ResponseEntity.ok("Project successfully created");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@RequestBody Project project) {
        if (project.getName().isEmpty() || project.getName() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name are required");
        }
        if (project.getEndDate().isBefore(LocalDate.now()) || project.getEndDate() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Verify the field End Date");
        }

        if (project.getArea().getId() == null || project.getArea() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Area id is required");
        }
        Optional<Area> area = areaService.getAreaById(project.getArea().getId());
        if (!area.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The provided Area Id does not exist");
        }

            projectService.updateProject(project);
        return ResponseEntity.ok("Project successfully updated");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Integer id) {
        if (id == null || id <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect id");
        }
        Optional<Project> project = projectService.getProjectById(id);
        if (!project.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id not found");
        }
            projectService.deleteProject(id);
        return ResponseEntity.ok().body("Success deleting id: " + id);
    }
}
