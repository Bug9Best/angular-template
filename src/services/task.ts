import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  listTasks: any[] = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
    { id: 4, title: 'Task 4', completed: true },
    { id: 5, title: 'Task 5', completed: false }
  ];

  getTasks() {
    return this.listTasks;
  }

  getTaskById(id: number) {
    return this.listTasks.find(task => task.id === id);
  }

  createTask(task: any) {
    this.listTasks.push(task);
  }

  updateTask(id: number, updatedTask: any) {
    const index = this.listTasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.listTasks[index] = { ...this.listTasks[index], ...updatedTask };
    }
  }

  deleteTask(id: number) {
    this.listTasks = this.listTasks.filter(task => task.id !== id);
  }
}
