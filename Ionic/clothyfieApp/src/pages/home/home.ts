import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { UIToast } from '../../ui/toast.component';
import { UILoader } from '../../ui/loader.component';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { ResetPasswordPage } from './../reset-password/reset-password';
import { RegisterPage } from './../register/register';
import { Users } from '../../models/users';
import { Storage  } from '@ionic/storage';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username;
  password;

  constructor(public navCtrl: NavController,
    private loginProvider: LoginProvider,
    private toast: UIToast, public loader: UILoader,
    private modalCtrl: ModalController,
    private storage: Storage) {

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
              this.navCtrl.push(DashboardPage);
            }
            else {
              this.toast.presentToast('Invalid UserName or Password!!');
            }
          });
        }
      });
  }

}
