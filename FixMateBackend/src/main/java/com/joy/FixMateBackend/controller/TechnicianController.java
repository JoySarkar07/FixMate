package com.joy.FixMateBackend.controller;

import com.joy.FixMateBackend.io.TechnicianRequest;
import com.joy.FixMateBackend.io.TechnicianUserRequest;
import com.joy.FixMateBackend.io.TechnicianResponse;
import com.joy.FixMateBackend.io.TechnicianUserResponse;
import com.joy.FixMateBackend.service.TechnicianService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TechnicianController {

    private final TechnicianService technicianService;

    @PostMapping("/register/technician")
    public TechnicianUserResponse addTechnician(@RequestBody TechnicianUserRequest request){
        try{
            return technicianService.addTechnician(request);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/admin/technician")
    public List<TechnicianUserResponse> getAllTechnician(){
        try{
            return technicianService.getAllTechnician();
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/technician")
    public TechnicianUserResponse getTechnicianById(@RequestParam String technicianId){
        try{
            return technicianService.getTechnicianById(technicianId);
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found");
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/technician/{technicianId}")
    public void deleteTechnician(@PathVariable String technicianId){
        try{
            technicianService.deleteTechnician(technicianId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/technician/{technicianId}")
    public TechnicianResponse updateTechnicianStatus(@PathVariable String technicianId, @RequestBody TechnicianRequest status){
        try{
            return technicianService.updateTechnicianStatus(status, technicianId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
}
