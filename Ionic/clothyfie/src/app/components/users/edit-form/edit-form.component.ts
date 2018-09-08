import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../../../services/user/users.service';
import { Users } from './../../../models/users';

@Component({
  selector: 'edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  editForm: FormGroup;
  @Input() users: any = [];
  @Output() closeModel: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  updateUser(id, name, mail, phone, username, age, address) {
    const user: Users = {id, name, mail, phone, username, age, address};
    this.userService.updateUser(user);
    this.closeModel.emit(true);
  }

}
