package com.joy.FixMateBackend.controller;

import com.joy.FixMateBackend.io.ComplaintRequest;
import com.joy.FixMateBackend.io.ComplaintResponse;
import com.joy.FixMateBackend.io.ComplaintUpdateRequest;
import com.joy.FixMateBackend.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/complaint")
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintService complaintService;

    @PostMapping
    public ComplaintResponse addComplaint(@RequestBody ComplaintRequest request){
        try{
            return complaintService.addComplaint(request);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{complaintId}")
    public ComplaintResponse getComplaintById(@PathVariable String complaintId){
        try{
            return complaintService.getComplaintByComplaintId(complaintId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Complaint not found");
        }
    }

    @GetMapping
    public List<ComplaintResponse> getAllComplaints(@RequestParam(required = false) String userId, @RequestParam(required = false) String technicianId){
        try{
            if(userId!=null) return complaintService.getAllUserComplaints(userId);
            if(technicianId!=null) return complaintService.getAllTechnicianComplaints(technicianId);
            return complaintService.getAllComplaints();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{complaintId}")
    public ComplaintResponse updateComplaint(@PathVariable String complaintId, @RequestBody ComplaintUpdateRequest request){
        try{
            return complaintService.updateComplaint(request, complaintId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Complaint Not found");
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{complaintId}")
    public void deleteComplaint(@PathVariable String complaintId){
        try{
            complaintService.deleteComplaint(complaintId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Content not found");
        }
    }
}
