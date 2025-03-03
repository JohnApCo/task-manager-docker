package com.johnapcode.backend.mapper;

import com.johnapcode.backend.dto.TaskDTO;
import com.johnapcode.backend.entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface TaskMapper {
  TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);
  TaskDTO toDTO(Task task);

  Task toEntity(TaskDTO taskDTO);

}
