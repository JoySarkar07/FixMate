package com.joy.FixMateBackend.io;

import com.joy.FixMateBackend.enums.ComplaintStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintResponse {

    private String complaintId;
    private String title;
    private String description;
    private ComplaintStatus status;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private UserResponse user;
    private TechnicianResponse technician;
}
