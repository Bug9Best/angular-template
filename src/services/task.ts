import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiPath: string = environment.apiUrl + '/tasks';

  constructor(
    private httpClient: HttpClient
  ) { }


  getTasks() {
    return this.httpClient.get<any[]>(`${this.apiPath}/getTasks`);
  }

  getTaskById(id: number) {
    return this.httpClient.get<any>(`${this.apiPath}/getTaskById/${id}`);
  }

  createTask(param: any) {
    return this.httpClient.post<any>(`${this.apiPath}/createTask`, param);
  }

  updateTask(id: number, param: any) {
    return this.httpClient.put<any>(`${this.apiPath}/updateTask/${id}`, param);
  }

  deleteTask(id: number) {
    return this.httpClient.delete<any>(`${this.apiPath}/deleteTask/${id}`);
  }
}
