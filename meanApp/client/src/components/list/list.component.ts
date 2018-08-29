import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from './../../service/issue.service';

import { Issue } from './../../issue.model';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: any = [];
  displayedColumns = ['title', 'responsiblity', 'severty', 'status', 'actions'];

  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit() {
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService.getIssues()
    .subscribe((data) => {
      this.issues = data;
    });
  }

  editIssue(id: any) {
    this.router.navigate([`/edit/${id.textContent}`]);
  }

  deleteIssue(id: any) {
    this.issueService.deleteIssue(id.textContent)
    .subscribe(() => {
      this.fetchIssues();
    });
  }
}
