import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormModalComponent } from '../../components/task-form-modal/task-form-modal.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit{
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedFilter: string = 'all';


  constructor(private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(){
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilter();
      console.log("task:", tasks);
    });
  }

  setFilter(priority: string){
    this.selectedFilter = priority;
    this.applyFilter();
  }

  applyFilter(){
    this.filteredTasks = this.selectedFilter === 'all'
    ? this.tasks
    : this.tasks.filter(task => task.priority.toLowerCase() === this.selectedFilter);
  }

  editTask(task: Task) {
    console.log("editing...");
    const dialogRef = this.dialog.open(TaskFormModalComponent, {
      width: '400px',
      data: {task}
    });

    dialogRef.afterClosed().subscribe(task => {
      if(task){
        if (task.id === undefined) {
          console.error("Error: Task ID is undefined");
          return;
        }
        this.taskService.updateTask(task.id, task).subscribe(task => {
          if(task){
            this.showNotification('Task updated successfully!', 'success');
            this.loadTasks();
          }
        });
      }
    });
  }

  addTask() {
    console.log("addTask");
    const dialogRef = this.dialog.open(TaskFormModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(task => {
      if (task) {
        console.log('Nueva tarea:', task);
        this.taskService.createTask(task).subscribe(task => {
          if(task){
            this.showNotification('Task added successfully!', 'success');
            this.loadTasks();
          }
        });
      }
    });
  }


  deleteTask(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete Task',
        message: `Are you sure you want to delete "${task.title}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task.id === undefined) {
          console.error("Error: Task ID is null");
          return;
        }
        this.taskService.deleteTask(task.id).subscribe(res => {
          this.showNotification('Task deleted successfully!', 'success');
          this.loadTasks();
        });
      }
    });
  }

  showNotification(message: string, type: 'success' | 'info' | 'error'){
    this.snackBar.open(
      message, 'Close', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: [type]
      }
    );
  }
}
