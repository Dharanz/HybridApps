import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, App, ViewController } from 'ionic-angular';
import { Storage  } from '@ionic/storage';
import { LoginProvider } from './../../providers/login/login';
import { Users } from './../../models/users';
import { UIToast } from './../../ui/toast.component';
import { UILoader } from '../../ui/loader.component';
import { ResetPasswordPage } from './../reset-password/reset-password';
import { RegisterPage } from './../register/register';
import { HomePage } from './../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username;
  password;

  constructor(private loginProvider: LoginProvider,
    private toast: UIToast, public loader: UILoader,
    private modalCtrl: ModalController,
    private storage: Storage, public viewCtrl: ViewController,
    public appCtrl: App) {
      
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
            let model = this.modalCtrl.create(ResetPasswordPage, {username: this.username });
            model.present();
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
            {
              this.storage.set('username', this.username);
              this.storage.set('password', this.password);
              this.appCtrl.getRootNav().push(HomePage);
            }
            else {
              this.toast.presentToast('Invalid UserName or Password!!');
            }
          });
        }
      });
  }
}