import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { TasksService } from 'src/app/services/tasks.service';

interface Task {
  id?: string
  title: string
  date: string
}

@Component({
  selector: 'app-organaizer',
  templateUrl: './organaizer.component.html',
  styleUrls: ['./organaizer.component.scss']
})
export class OrganaizerComponent implements OnInit {


  form: FormGroup;
  tasks: Task[] = [];

  constructor(private dateService: DataService, private taskService: TasksService) { }

  ngOnInit() {
    this.dateService.date.pipe(
      switchMap(value => this.taskService.load(value))).subscribe(tasks => {
        this.tasks = tasks
      })
        
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  private submit()
  {
    const {title} = this.form.value;
    
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.taskService.create(task).subscribe(task => {
      this.tasks.push(task);
      this.form.reset();
    }, err => console.error(err));
  }

  remove(task: Task) {
    this.taskService.remove(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id)
      console.log('Удалено!')
    }, error => console.error(error));
  }

}
