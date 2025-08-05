package com.joy.FixMateBackend.repository;

import com.joy.FixMateBackend.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, String> {
    List<Complaint> findByUserUserIdOrderByCreatedAtDesc(String userId);

    List<Complaint> findByTechnicianTechnicianIdOrderByCreatedAtDesc(String technicianId);
}
