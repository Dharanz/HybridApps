import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { UIToast } from './../../ui/toast.component';
import { LoginProvider } from './../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage implements OnInit {

  newPassword;
  conformPassword;
  username;

  constructor(private viewCtrl: ViewController,
    private toast: UIToast,
    private loginProvider: LoginProvider,
    private navParams: NavParams) {
  }

  ngOnInit() {
    this.username = this.navParams.get('username');
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  ResetPassword() {
    if (this.newPassword == this.conformPassword) {
      this.loginProvider.updatePassword(this.username, this.conformPassword);
      this.viewCtrl.dismiss();
    }
    else {
      this.toast.presentToast('Passwords Does Not Match!');
    }
    return;
  }

}
