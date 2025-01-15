package com.example.crudMySql.entity.dto;

import com.example.crudMySql.entity.Area;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class AreaDTO {
    private Integer id;
    private String name;
    private String description;

    public AreaDTO(Area area) {
        this.id = area.getId();
        this.name = area.getName();
        this.description = area.getDescription();
    }
}
