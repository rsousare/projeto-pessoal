package com.example.crudMySql.service;

import com.example.crudMySql.entity.Area;
import com.example.crudMySql.repository.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AreaService {
    private AreaRepository areaRepository;

    @Autowired
    public AreaService(AreaRepository areaRepository) {
        this.areaRepository = areaRepository;
    }

    public List<Area> getAll() {
        return areaRepository.findAll();
    }

    public Optional<Area> getAreaById(int id) {
        return areaRepository.findById(id);
    }

    public Area createArea(Area area) {
        return areaRepository.save(area);
    }

    public Area updateArea(Area area) {
        Optional<Area> existingArea = areaRepository.findById(area.getId());
        Area areaToUpdate = existingArea.get();
        areaToUpdate.setName(area.getName());
        areaToUpdate.setDescription(area.getDescription());
        return areaRepository.save(areaToUpdate);
    }

//    public ResponseEntity<String> deleteArea(Integer id) {
//        if (id == null || id <= 0) {
//            return ResponseEntity.badRequest().body("Invalid id!");
//        }
//        Optional<Area> area = areaRepository.findById(id);
//
//        if (area.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Area id " + id + " not found");
//        }
//
//        areaRepository.deleteById(id);
//
//        return ResponseEntity.ok("Area id " + id + " deleted");
//    }
    public void deleteArea(Integer id) {
        areaRepository.deleteById(id);
    }

    public boolean existsById(Integer id) {
        return areaRepository.existsById(id);
    }
}
