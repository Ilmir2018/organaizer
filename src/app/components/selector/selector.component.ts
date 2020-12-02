import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  go(dir: number) {
    this.dataService.changeMonth(dir);
  }

}
