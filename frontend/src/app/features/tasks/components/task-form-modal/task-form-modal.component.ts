import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Priority } from '../../models/priority.enum';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form-modal',
  templateUrl: './task-form-modal.component.html',
  styleUrls: ['./task-form-modal.component.scss']
})
export class TaskFormModalComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode: boolean = false;
  priorities = Object.values(Priority);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormModalComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { task?:Task }
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      completed: [false],
      priority: [Priority.LOW, Validators.required]
    });
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data?.task;

    this.taskForm = this.fb.group({
      id: [this.data?.task?.id || null],
      title: [this.data?.task?.title || '', Validators.required],
      description: [this.data?.task?.description || ''],
      completed: [this.data?.task?.completed ?? false], // Usa `??` para evitar valores `null`
      priority: [this.data?.task?.priority ?? Priority.LOW, Validators.required]
    });
  }

  saveTask() {
    if (this.taskForm.valid) {
      console.log('Task Created:', this.taskForm.value);
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '350px',
        data: {
          title: `${this.isEditMode?"Edit Task":"Create Task"}`,
          message: `Are you sure you want to ${this.isEditMode?"edit":"create"}`
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dialogRef.close(this.taskForm.value);
        }
      });
    }
  }
}
