import { Component, OnInit } from '@angular/core';
import { IssueService } from './../../service/issue.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;  

  constructor(
    private issueService: IssueService,
    private fb: FormBuilder,
    private router: Router) { 
      this.createForm = this.fb.group({
        title: ['', Validators.required],
        responsible:'',
        description:'',
        severty:''
      });
    }

  ngOnInit() {
  }

  addIssue(title, responsible, description, severty) {
    this.issueService.addIssues(title, responsible, description, severty)
    .subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

}
