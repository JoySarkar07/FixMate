package com.joy.FixMateBackend.io;

import com.joy.FixMateBackend.enums.TechnicianStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TechnicianResponse {
    private String technicianId;
    private String name;
    private String skill;
    private TechnicianStatus status;
}
