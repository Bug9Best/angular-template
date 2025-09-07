import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TaskService } from '../../services/task';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-task',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    DatePickerModule
  ],
  templateUrl: './task.html',
  styleUrl: './task.scss'
})
export class Task {

  dialogVisible: boolean = false;

  listTasks: any[] = [];

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    due_date: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(
    private taskService: TaskService
  ) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.taskService
      .getTasks()
      .subscribe({
        next: (res) => {
          this.listTasks = res;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  onCreate() {
    this.formGroup.reset();
    this.dialogVisible = true;
  }

  onEdit(task: any) {
    this.formGroup.patchValue(task);
    this.formGroup.get('due_date')?.setValue(new Date(task.due_date));
    this.dialogVisible = true;
  }

  createTask() {
    if (this.formGroup.invalid) {
      return;
    }

    this.taskService.createTask(this.formGroup.value).subscribe({
      next: (res) => {
        this.load();
        this.dialogVisible = false;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  updateTask() {
    if (this.formGroup.invalid) {
      return;
    }

    const id = this.formGroup.get('id')?.value;
    this.taskService
      .updateTask(id, this.formGroup.value)
      .subscribe({
        next: () => {
          this.load();
          this.dialogVisible = false;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  deleteTask() {
    const id = this.formGroup.get('id')?.value;

    this.taskService
      .deleteTask(id)
      .subscribe({
        next: () => {
          this.load();
          this.dialogVisible = false;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}
