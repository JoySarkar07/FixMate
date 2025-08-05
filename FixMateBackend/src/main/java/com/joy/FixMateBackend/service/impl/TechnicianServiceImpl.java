package com.joy.FixMateBackend.service.impl;

import com.joy.FixMateBackend.entity.Technician;
import com.joy.FixMateBackend.entity.UserEntity;
import com.joy.FixMateBackend.enums.TechnicianStatus;
import com.joy.FixMateBackend.enums.UserRole;
import com.joy.FixMateBackend.io.TechnicianRequest;
import com.joy.FixMateBackend.io.TechnicianUserRequest;
import com.joy.FixMateBackend.io.TechnicianResponse;
import com.joy.FixMateBackend.io.TechnicianUserResponse;
import com.joy.FixMateBackend.repository.TechnicianRepository;
import com.joy.FixMateBackend.repository.UserRepository;
import com.joy.FixMateBackend.service.TechnicianService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TechnicianServiceImpl implements TechnicianService {

    private final UserRepository userRepository;
    private final TechnicianRepository technicianRepository;

    @Override
    public TechnicianUserResponse addTechnician(TechnicianUserRequest request) {
        Technician newTechnician = convertToTechnician(request);
        UserEntity newUser = convertToUserEntity(request);
        newUser.setUserId(newTechnician.getTechnicianId());
        newUser.setPassword(new BCryptPasswordEncoder(12).encode(newUser.getPassword()));
        newUser = userRepository.save(newUser);
        newTechnician = technicianRepository.save(newTechnician);
        return convertToResponse(newUser, newTechnician);
    }

    private TechnicianUserResponse convertToResponse(UserEntity newUser, Technician newTechnician) {
        return TechnicianUserResponse.builder()
                .technicianId(newTechnician.getTechnicianId())
                .name(newTechnician.getName())
                .skill(newTechnician.getSkill())
                .email(newUser.getEmail())
                .phone(newUser.getPhone())
                .role(newUser.getRole())
                .status(newTechnician.getStatus())
                .build();
    }

    private Technician convertToTechnician(TechnicianUserRequest request) {
        return Technician.builder()
                .technicianId(UUID.randomUUID().toString())
                .name(request.getName())
                .skill(request.getSkill())
                .status(TechnicianStatus.AVAILABLE)
                .build();
    }

    @Override
    public List<TechnicianUserResponse> getAllTechnician() {
        return technicianRepository.findAll()
                .stream()
                .map(tech->{
                    UserEntity user = userRepository.findById(tech.getTechnicianId())
                            .orElseThrow(()->new RuntimeException("User Not found"));
                    return convertToResponse(user, tech);
                })
                .collect(Collectors.toList());
    }

    @Override
    public TechnicianUserResponse getTechnicianById(String technicianId) {
        Technician existingTechnician = technicianRepository.findById(technicianId)
                .orElseThrow(()-> new RuntimeException("Technician not found"));
        UserEntity technicianUser = userRepository.findById(technicianId)
                .orElseThrow(()->new RuntimeException("User not found"));
        return convertToResponse(technicianUser, existingTechnician);
    }

    @Override
    public void deleteTechnician(String technicianId) {
        Technician existingTechnician = technicianRepository.findById(technicianId)
                .orElseThrow(()->new RuntimeException("Technician not found"));
        UserEntity existingUser = userRepository.findById(technicianId)
                .orElseThrow(()->new RuntimeException("Technician not found"));
        technicianRepository.delete(existingTechnician);
        userRepository.delete(existingUser);
    }

    @Override
    public TechnicianResponse updateTechnicianStatus(TechnicianRequest request, String technicianId) {
        Technician existingTechnician = technicianRepository.findById(technicianId)
                .orElseThrow(()->new RuntimeException("Technician not found"));
        if(request.getStatus() != null){
            existingTechnician.setStatus(request.getStatus());
        }
        if(request.getSkill() != null){
            existingTechnician.setSkill(request.getSkill());
        }
        technicianRepository.save(existingTechnician);
        return convertToTechnicianResponse(existingTechnician);
    }

    private TechnicianResponse convertToTechnicianResponse(Technician existingTechnician) {
        return TechnicianResponse.builder()
                .technicianId(existingTechnician.getTechnicianId())
                .name(existingTechnician.getName())
                .skill(existingTechnician.getSkill())
                .status(existingTechnician.getStatus())
                .build();
    }

    private UserEntity convertToUserEntity(TechnicianUserRequest user) {
        return UserEntity.builder()
                .username(user.getName())
                .password(user.getPassword())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(UserRole.TECHNICIAN)
                .build();
    }
}
