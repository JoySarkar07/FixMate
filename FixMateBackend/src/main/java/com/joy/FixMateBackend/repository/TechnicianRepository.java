package com.joy.FixMateBackend.repository;

import com.joy.FixMateBackend.entity.Technician;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechnicianRepository extends JpaRepository<Technician, String> {
}
