import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { LoginProvider } from './../../providers/login/login';
import { Users } from './../../models/users';
import { UIToast } from './../../ui/toast.component';
import { UILoader } from '../../ui/loader.component';
import { ResetPasswordPage } from './../reset-password/reset-password';
import { RegisterPage } from './../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username;
  password;
  isPop: boolean = false;

  constructor(private loginProvider: LoginProvider,
    private toast: UIToast, public loader: UILoader,
    private modalCtrl: ModalController) {
  }

  forgotPassword() {
    this.loader.presentLoader();
    this.loginProvider.getLoginDetails(this.username).
      subscribe(res => {
        this.loader.loading.dismissAll();
        if (res.length == 0) {
          this.toast.presentToast('Invalid UserName!!');
        }
        else {
          if (this.isPop == false) {
            let model = this.modalCtrl.create(ResetPasswordPage, {username: this.username });
            model.onDidDismiss((data: any) => {
              this.isPop = data;
            });
            model.present();
          }
          else {
            return;
          }           
        }
      });
  }

  register() {
    let model = this.modalCtrl.create(RegisterPage);
          model.present();
  }

  login() {
    if (this.username == undefined || this.password == undefined) {
      this.toast.presentToast('Fill Require Fields!!');
      return;
    }

    this.loader.presentLoader();
    this.loginProvider.getLoginDetails(this.username).
      subscribe(res => {
        this.loader.loading.dismissAll();
        if (res.length == 0) {
          this.toast.presentToast('Invalid UserName or Password!!');
        }
        else {
          res.forEach((data: Users) => {
            if (data.username == this.username && data.password == this.password)
              this.toast.presentToast('Login SuccessFull!');
            else
              this.toast.presentToast('Invalid UserName or Password!!');
          });
        }
      });
  }
}