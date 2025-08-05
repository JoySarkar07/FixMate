package com.joy.FixMateBackend.entity;

import com.joy.FixMateBackend.enums.TechnicianStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tbl_technician")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Technician {
    @Id
    private String technicianId;
    private String name;
    private String skill;
    @Enumerated(EnumType.STRING)
    private TechnicianStatus status;
}
