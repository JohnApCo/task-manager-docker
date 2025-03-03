import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() tasks: any;
  @Output() editTask = new EventEmitter<any>();
  @Output() deleteTask = new EventEmitter<any>();
  @Output() addTask = new EventEmitter<any>();

  onEdit(task: any) {
    this.editTask.emit(task);
  }

  onDelete(task: any) {
    this.deleteTask.emit(task);
  }

  onAddTask() {
    this.addTask.emit();
  }
}
