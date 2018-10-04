import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UIToast } from '../../ui/toast.component';
import { LoginProvider } from '../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  newPassword;
  conformPassword;
  username;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: UIToast,
    private loginProvider: LoginProvider) {
  }

  ionViewDidLoad() {
    this.username = this.navParams.get('username');
  }

  cancel() {
    this.navCtrl.pop();
    }
  
    ResetPassword() {
      if (this.newPassword == this.conformPassword) {
        this.loginProvider.updatePassword(this.username, this.conformPassword);  
        this.toast.presentToast('Password has Resetted!!');
        this.navCtrl.pop();
      }
      else {
        this.toast.presentToast('Passwords Does Not Match!');
      }
    }

}
