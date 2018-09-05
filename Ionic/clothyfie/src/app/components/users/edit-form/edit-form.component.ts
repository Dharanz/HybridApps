import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../../../services/users.service';
import { Users } from './../../../models/users';

@Component({
  selector: 'edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  editForm: FormGroup;
  @Input() users: any = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
    this.editFormValidation();
  }

  editFormValidation() {
    this.editForm = this.fb.group({
      name: ['name', Validators.required],
      mail: ['mail', Validators.required],
      phone: ['1111111111', Validators.required],
      username: '',
      age: '',
      address: ['address', Validators.required]
    });
  }

  ngOnInit() {    
  }

  editUser() {
    console.log('Submitted');
  }

}
