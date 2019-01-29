import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  @ViewChild(Slides) slides: Slides;

  clothSlideShowImages = [
    {image: "../../assets/imgs/ClothSample/sample1.png"},
    {image: "../../assets/imgs/ClothSample/sample2.png"},
    {image: "../../assets/imgs/ClothSample/sample3.png"},
    {image: "../../assets/imgs/ClothSample/sample4.png"}
  ];
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
