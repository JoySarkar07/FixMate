package com.joy.FixMateBackend.service;

import com.joy.FixMateBackend.io.TechnicianRequest;
import com.joy.FixMateBackend.io.TechnicianUserRequest;
import com.joy.FixMateBackend.io.TechnicianResponse;
import com.joy.FixMateBackend.io.TechnicianUserResponse;

import java.util.List;

public interface TechnicianService {
    public TechnicianUserResponse addTechnician(TechnicianUserRequest request);

    public List<TechnicianUserResponse> getAllTechnician();

    public TechnicianUserResponse getTechnicianById(String technicianId);

    public void deleteTechnician(String technicianId);

    public TechnicianResponse updateTechnicianStatus(TechnicianRequest request, String technicianId);
}
