package com.example.crudMySql.controller;

import com.example.crudMySql.entity.Area;
import com.example.crudMySql.entity.dto.AreaDTO;
import com.example.crudMySql.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/areas")
@CrossOrigin(origins = "http://localhost:4200")
public class AreaController {

    private final AreaService areaService;

    @Autowired
    public AreaController(AreaService areaService) {
        this.areaService = areaService;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Area> areas = areaService.getAll();
        if (areas.isEmpty()) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Empty List");
            response.put("status", HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        }
        List<AreaDTO> areaDTO = areas.stream()
                .map(AreaDTO::new)
                .toList();

        return ResponseEntity.ok(Map.of("data", areaDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPeopleById(@PathVariable Integer id) {
        if (id == null || id <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid id");
        }
        Optional<Area> areaOptional = areaService.getAreaById(id);
        if (areaOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Id not found");
        }
        Area area = areaOptional.get();
        AreaDTO areaDTO = new AreaDTO(area);

        return ResponseEntity.ok(areaDTO);
    }

    @PostMapping
    public ResponseEntity<?> createArea(@RequestBody Area area) {
        if (area.getName().isEmpty() || area.getDescription().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name and/or Description are required");
        }
        areaService.createArea(area);
        return ResponseEntity.ok("Area successfully created");
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateArea(@RequestBody Area area) {
        if (area.getName().isEmpty() || area.getDescription().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name and/or Description are required");
        }
        areaService.updateArea(area);
        return ResponseEntity.ok(area);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteArea(@PathVariable Integer id) {
        if (id == null || id <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .header("X-Error-Message","Incorrect id").build();
        }
        Optional<Area> area = areaService.getAreaById(id);
        if (area.isPresent()) {
            areaService.deleteArea(id);
            return ResponseEntity.ok().header("X-Error-Message", "Success deleting id: " + id).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).header("X-Error-Message", "Id not found").build();
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteArea(@PathVariable Integer id) {
//        if (id == null || id <= 0) {
//            return ResponseEntity.badRequest().build();
//        }
//        Optional<Area> area = areaService.getAreaById(id);
//        if (area.isPresent()) {
//            areaService.deleteArea(id);
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.notFound().build();
//    }
}
