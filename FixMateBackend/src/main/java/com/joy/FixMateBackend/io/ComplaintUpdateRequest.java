package com.joy.FixMateBackend.io;

import com.joy.FixMateBackend.enums.ComplaintStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintUpdateRequest {
    private String title;
    private String description;
    private String technicianId;
    private ComplaintStatus status;
}
