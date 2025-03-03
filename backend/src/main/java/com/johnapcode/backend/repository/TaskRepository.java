package com.johnapcode.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.johnapcode.backend.entity.Task;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
  
}
