package com.johnapcode.backend.service;

import com.johnapcode.backend.dto.TaskDTO;
import com.johnapcode.backend.entity.Task;
import com.johnapcode.backend.exception.TaskNotFoundException;
import com.johnapcode.backend.mapper.TaskMapper;
import com.johnapcode.backend.repository.TaskRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {
  private final TaskRepository taskRepository;
  private final TaskMapper taskMapper = TaskMapper.INSTANCE;
  @PostConstruct
  public void init() {
    System.out.println("TaskService ha sido inicializado correctamente.");
  }
  public List<TaskDTO> getAllTasks() {
    return taskRepository.findAll().stream()
        .map(TaskMapper.INSTANCE::toDTO)
        .collect(Collectors.toList());
  }

  public TaskDTO getTaskById(Long id) {
    Task task = taskRepository.findById(id)
        .orElseThrow(() -> new TaskNotFoundException(id));
    return taskMapper.toDTO(task);
  }

  public TaskDTO createTask(TaskDTO taskDTO) {
    System.out.println("creating: "+taskDTO.toString());
    Task task = taskMapper.toEntity(taskDTO);
    Task savedTask = taskRepository.save(task);
    return taskMapper.toDTO(savedTask);
  }

  public TaskDTO updateTask(Long id, TaskDTO taskDTO) {
    Task existingTask = taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException(id));
    existingTask.setTitle(taskDTO.getTitle());
    existingTask.setDescription(taskDTO.getDescription());
    existingTask.setPriority(taskDTO.getPriority());
    existingTask.setCompleted(taskDTO.getCompleted());

    Task updatedTask = taskRepository.save(existingTask);
    return taskMapper.toDTO(updatedTask);
  }

  public void deleteTask(Long id) {
    if(!taskRepository.existsById(id)){
      throw new TaskNotFoundException(id);
    }
    taskRepository.deleteById(id);
  }
}
