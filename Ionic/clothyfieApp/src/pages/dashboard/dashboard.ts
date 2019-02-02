import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CategoryProvider } from './../../providers/category/category';
import { Category } from './../../models/category';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  @ViewChild(Slides) slides: Slides;
  productListImages: Category[];

  clothSlideShowImages = [
    {image: "../../assets/imgs/ClothSample/sample1.png"},
    {image: "../../assets/imgs/ClothSample/sample2.png"},
    {image: "../../assets/imgs/ClothSample/sample3.png"},
    {image: "../../assets/imgs/ClothSample/sample4.png"}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private storage: Storage, public menuCtrl: MenuController, private categoryProvider: CategoryProvider) {
    
  }

  ionViewDidLoad() {
    this.categoryProvider.getCategories().subscribe((res: Category[]) => console.log(res));
  }

  openMenu() {
    this.menuCtrl.open();
  }
}
