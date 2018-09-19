import { EditFormComponent } from './edit-form/edit-form.component';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './../../services/user/users.service';
import { Users } from './../../models/users';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

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
  selectedUser: Users[];
  staticAlertClosed: boolean = false;
  alertMessage: String;

  latestEntry: any;
  showStartPage: boolean = false;
  showNextPage: boolean = true;

  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      timeout: 2000,
      positionClass: 'toast-bottom-center'
    });

  constructor(private modalService: NgbModal,
    private userServie: UsersService,
    private router: Router,
    private ts: ToasterService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userServie.getUsers()
    .subscribe(user => {
      this.spinner = false;
      this.users = user;

      this.userCount = this.users.length > 0 ? true : false;
      this.showNextPage = this.users.length == 5 ? true : false;
      this.latestEntry = user[user.length - 1];
    });

    this.showStartPage = false;  
  }

  openVerticallyCentered(content, user: Users[]) {
    this.modalService.open(content, { centered: true });
    this.selectedUser = user;
  }

  closeModel(callback) {
    callback();
  }

  deleteUsers(id) {
    let result = confirm('Do You Want to Delete?');
    if (result) {
      this.userServie.deleteUsers(id);
      this.ts.pop('success', 'Deleted Successfully');
    } else {
      return;
    }
  }

  showAlert(event) {
    this.ts.pop('success', event);
  }

  search(event) {
    this.userServie.searchUser(event.target.value, event.target.value + "\uf8ff")
      .subscribe((user: Users[]) => {
        this.spinner = false;
        this.users = user;

        this.userCount = this.users.length > 0 ? true : false;
      });
  }

  nextPage() {
    this.userServie.nextPage(this.latestEntry.name).subscribe(res => {
        this.spinner = false;
        this.users = res;
  
        this.userCount = this.users.length > 0 ? true : false;
        this.showNextPage = this.users.length == 5 ? true : false;
        this.latestEntry = res[res.length - 1];
        this.showStartPage = true; 
    });
  }
}
