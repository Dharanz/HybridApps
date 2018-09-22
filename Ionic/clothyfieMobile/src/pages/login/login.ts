import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username;
  password;

  constructor() {
  }

  ionViewDidLoad() {
  }

  getData() {
    alert(this.username + '' + this.password);
  }

}
