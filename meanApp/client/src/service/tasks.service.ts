import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: Http) { 
    console.log('Task Service has been Initialized...')
  }

  GetTasks() {
    return this.http.get('http://localhost:4200/api/tasks').pipe(
    map(res => res.json()));
  }
}
