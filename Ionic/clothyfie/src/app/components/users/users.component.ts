import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './../../services/users.service';
import { Users } from './../../models/users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  users: Users[];
  userCount: boolean;
  spinner: boolean = true;

  constructor(private modalService: NgbModal, private userServie: UsersService) { }

  ngOnInit() {
    this.userServie.getUsers()
    .subscribe(user => {
      this.spinner = false;
      this.users = user;
      
      this.userCount = this.users.length > 0 ? true : false;
    })
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

}
