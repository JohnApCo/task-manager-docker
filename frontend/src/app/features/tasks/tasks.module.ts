import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskHeaderComponent } from './components/task-header/task-header.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskComponent } from './pages/task/task.component';
import { TaskFormModalComponent } from './components/task-form-modal/task-form-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskHeaderComponent,
    TaskCardComponent,
    TaskComponent,
    TaskFormModalComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule
  ]
})
export class TasksModule { }
