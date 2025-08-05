package com.joy.FixMateBackend.io;

import com.joy.FixMateBackend.enums.TechnicianStatus;
import com.joy.FixMateBackend.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TechnicianUserResponse {
    private String technicianId;
    private String name;
    private String skill;
    private String email;
    private String phone;
    private UserRole role;
    private TechnicianStatus status;
}
