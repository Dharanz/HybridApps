import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private storage: Storage, public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  openMenu() {
    this.menuCtrl.open();
  }
}
