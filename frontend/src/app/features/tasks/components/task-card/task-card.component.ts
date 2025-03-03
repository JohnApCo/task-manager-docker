import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task?: Task;
  @Output() editTask = new EventEmitter<any>();
  @Output() deleteTask = new EventEmitter<any>();

  onEdit() {
    this.editTask.emit(this.task);
  }

  onDelete() {
    this.deleteTask.emit(this.task);
  }
}
