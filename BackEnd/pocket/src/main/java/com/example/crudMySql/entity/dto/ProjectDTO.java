package com.example.crudMySql.entity.dto;

import com.example.crudMySql.entity.Project;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
public class ProjectDTO {
    private Integer id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer areaId;
    private String areaName;

    public ProjectDTO(Project project) {
        this.id = project.getId();
        this.name = project.getName();
        this.startDate = project.getStartDate();
        this.endDate = project.getEndDate();
        this.areaId = project.getArea().getId();
        this.areaName = project.getArea().getName();
    }
}
