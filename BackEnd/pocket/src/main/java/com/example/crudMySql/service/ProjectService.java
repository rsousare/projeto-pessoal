package com.example.crudMySql.service;

import com.example.crudMySql.entity.Area;
import com.example.crudMySql.entity.Project;
import com.example.crudMySql.repository.AreaRepository;
import com.example.crudMySql.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private ProjectRepository projectRepository;
    private AreaRepository areaRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, AreaRepository areaRepository) {
        this.projectRepository = projectRepository;
        this.areaRepository = areaRepository;
    }

    public List<Project> getAll() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(int id) {
        return projectRepository.findById(id);
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Project project) {
        Optional<Project> existingProject = projectRepository.findById(project.getId());
        Project projectToUpdate = existingProject.get();
        projectToUpdate.setName(project.getName());
        projectToUpdate.setStartDate(project.getStartDate());
        projectToUpdate.setEndDate(project.getEndDate());

        Integer areaId = project.getArea().getId();
        Area area = areaRepository.findById(areaId).orElseThrow(() -> new IllegalArgumentException("Area id not found"));
        projectToUpdate.setArea(area);
        return projectRepository.save(projectToUpdate);
    }

    public void deleteProject(Integer id) {
        projectRepository.deleteById(id);
    }
}
