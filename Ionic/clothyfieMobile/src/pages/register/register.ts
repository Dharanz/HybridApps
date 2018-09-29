import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  name;  username;  age;  email;  phone;
  address;  password;  conformPassword;

  constructor(private viewCtrl: ViewController) {
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

}
