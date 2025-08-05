package com.joy.FixMateBackend.io;

import com.joy.FixMateBackend.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String userId;
    private String email;
    private String token;
    private UserRole role;
}
