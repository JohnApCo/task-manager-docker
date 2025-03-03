package com.johnapcode.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.johnapcode.backend.entity.Priority;
import lombok.Data;
import lombok.Getter;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
public class TaskDTO {
  private Long id;
  private String title;
  private String description;
  private Boolean completed;
  private Priority priority;
  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private LocalDateTime createdAt;
}