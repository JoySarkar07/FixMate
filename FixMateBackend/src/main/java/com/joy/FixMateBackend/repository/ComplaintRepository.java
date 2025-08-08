package com.joy.FixMateBackend.repository;

import com.joy.FixMateBackend.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, String> {
    List<Complaint> findAllByOrderByCreatedAtDesc();

    List<Complaint> findByUserUserIdOrderByCreatedAtDesc(String userId);

    List<Complaint> findByTechnicianTechnicianIdOrderByCreatedAtDesc(String technicianId);

    @Query("SELECT COUNT(c) FROM Complaint c WHERE c.technician.technicianId = :technicianId AND c.status <> com.joy.FixMateBackend.enums.ComplaintStatus.CLOSED")
    Long countActiveComplaintsByTechnicianId(@Param("technicianId") String technicianId);

    @Query("SELECT t.technicianId, COUNT(c) " +
            "FROM Complaint c LEFT JOIN c.technician t " +
            "WHERE c.status <> com.joy.FixMateBackend.enums.ComplaintStatus.CLOSED " +
            "AND t IS NOT NULL " +
            "GROUP BY t.technicianId")
    List<Object[]> countActiveComplaints();
}
