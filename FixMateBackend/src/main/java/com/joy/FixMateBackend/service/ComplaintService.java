package com.joy.FixMateBackend.service;

import com.joy.FixMateBackend.io.ComplaintRequest;
import com.joy.FixMateBackend.io.ComplaintResponse;
import com.joy.FixMateBackend.io.ComplaintUpdateRequest;

import java.util.List;
import java.util.Map;

public interface ComplaintService {
    public ComplaintResponse addComplaint(ComplaintRequest request);

    public List<ComplaintResponse> getAllComplaints();

    public ComplaintResponse getComplaintByComplaintId(String complaintId);

    public List<ComplaintResponse> getAllUserComplaints(String userId);

    public List<ComplaintResponse> getAllTechnicianComplaints(String technicianId);

    public void deleteComplaint(String complaintId);

    public ComplaintResponse updateComplaint(ComplaintUpdateRequest request, String complaintId);

    public Long getComplaintCountOfTechnicianByTechnicianId(String technicianId);

    public Map<String, Long> getComplaintsCount();
}
