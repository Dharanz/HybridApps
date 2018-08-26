import { Component } from '@angular/core';
import { TasksService } from './../service/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private taskService: TasksService) {
    this.taskService.GetTasks()
    .subscribe(res => console.log(res));
  }
}
