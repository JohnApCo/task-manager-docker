import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent {
  @Output() filterChanged = new EventEmitter<string>();
  selectedFilter: string = 'all';

  setFilter(priority: string) {
    this.selectedFilter = priority;
    this.filterChanged.emit(priority);
  }
}
