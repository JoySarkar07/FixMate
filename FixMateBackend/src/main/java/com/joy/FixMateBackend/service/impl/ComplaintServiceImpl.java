package com.joy.FixMateBackend.service.impl;

import com.joy.FixMateBackend.entity.Complaint;
import com.joy.FixMateBackend.entity.Technician;
import com.joy.FixMateBackend.entity.UserEntity;
import com.joy.FixMateBackend.enums.ComplaintStatus;
import com.joy.FixMateBackend.io.*;
import com.joy.FixMateBackend.repository.ComplaintRepository;
import com.joy.FixMateBackend.repository.TechnicianRepository;
import com.joy.FixMateBackend.repository.UserRepository;
import com.joy.FixMateBackend.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final TechnicianRepository technicianRepository;

    @Override
    public ComplaintResponse addComplaint(ComplaintRequest request) {
        Complaint newComplaint = convertToComplaintEntity(request);
        newComplaint = complaintRepository.save(newComplaint);
        return convertToResponse(newComplaint);
    }

    private ComplaintResponse convertToResponse(Complaint newComplaint) {
        return ComplaintResponse.builder()
                .complaintId(newComplaint.getComplaintId())
                .title(newComplaint.getTitle())
                .description(newComplaint.getDescription())
                .status(newComplaint.getStatus())
                .createdAt(newComplaint.getCreatedAt())
                .updatedAt(newComplaint.getUpdatedAt())
                .user(newComplaint.getUser() != null ? convertToUserResponse(newComplaint.getUser()) : null)
                .technician(newComplaint.getTechnician() != null ? convertToTechnicianResponse(newComplaint.getTechnician()) : null)
                .build();
    }

    private Complaint convertToComplaintEntity(ComplaintRequest request) {
        return Complaint.builder()
                .complaintId(UUID.randomUUID().toString())
                .title(request.getTitle())
                .description(request.getDescription())
                .status(ComplaintStatus.PENDING)
                .user(userRepository.findById(request.getUserId()).orElseThrow(()->new RuntimeException("User not found")))
                .build();
    }

    @Override
    public List<ComplaintResponse> getAllComplaints() {
        return complaintRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ComplaintResponse getComplaintByComplaintId(String complaintId) {
        Complaint existingComplaint = complaintRepository.findById(complaintId)
                .orElseThrow(()->new RuntimeException("Complaint not found"));
        return convertToResponse(existingComplaint);
    }

    @Override
    public List<ComplaintResponse> getAllUserComplaints(String userId) {
        return complaintRepository.findByUserUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ComplaintResponse> getAllTechnicianComplaints(String technicianId) {
        return complaintRepository.findByTechnicianTechnicianIdOrderByCreatedAtDesc(technicianId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteComplaint(String complaintId) {
        Complaint existingComplaint = complaintRepository.findById(complaintId)
                .orElseThrow(()->new RuntimeException("Complaint not found"));
        complaintRepository.delete(existingComplaint);
    }

    @Override
    public ComplaintResponse updateComplaint(ComplaintUpdateRequest request, String complaintId) {
        Complaint exitstingComplaint = complaintRepository.findById(complaintId)
                .orElseThrow(()->new RuntimeException("Complaint not found"));
        if(request.getStatus() != null){
            exitstingComplaint.setStatus(request.getStatus());
        }
        if(request.getTechnicianId() != null){
            Technician existingTechnician = technicianRepository.findById(request.getTechnicianId()).orElseThrow(()->new RuntimeException("Technician not found"));
            exitstingComplaint.setTechnician(existingTechnician);
        }
        if(request.getTitle()!=null) exitstingComplaint.setTitle(request.getTitle());
        if(request.getDescription() != null) exitstingComplaint.setDescription(request.getDescription());
        exitstingComplaint = complaintRepository.save(exitstingComplaint);
        return convertToResponse(exitstingComplaint);
    }

    private UserResponse convertToUserResponse(UserEntity newUser) {
        return UserResponse.builder()
                .userId(newUser.getUserId())
                .username(newUser.getUsername())
                .email(newUser.getEmail())
                .phone(newUser.getPhone())
                .role(newUser.getRole())
                .build();
    }

    private TechnicianResponse convertToTechnicianResponse(Technician existingTechnician) {
        return TechnicianResponse.builder()
                .technicianId(existingTechnician.getTechnicianId())
                .name(existingTechnician.getName())
                .skill(existingTechnician.getSkill())
                .status(existingTechnician.getStatus())
                .build();
    }
}
