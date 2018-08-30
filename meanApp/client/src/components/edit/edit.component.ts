import { Component, OnInit } from '@angular/core';
import { IssueService } from './../../service/issue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Issue } from './../../issue.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  issue: any = [];
  updateForm: FormGroup;

  constructor(private issueService: IssueService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
      this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssueById(this.id)
      .subscribe(res => {
        this.issue = res;
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('responsible').setValue(this.issue.responsible);
        this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('severty').setValue(this.issue.severty);
        this.updateForm.get('status').setValue(this.issue.status);        
      });
    });
  }

  updateIssue(title, responsible, description, severty, status) {
    this.issueService.updateIssues(this.id, title, responsible, description, severty, status)
    .subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severty: ''
    });
  }

}
