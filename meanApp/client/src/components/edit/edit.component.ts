import { Component, OnInit } from '@angular/core';
import { IssueService } from './../../service/issue.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private issueService: IssueService) { }

  ngOnInit() {
  }

}