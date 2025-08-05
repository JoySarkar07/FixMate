package com.joy.FixMateBackend.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TechnicianUserRequest {
    private String name;
    private String skill;
    private String password;
    private String email;
    private String phone;
}
