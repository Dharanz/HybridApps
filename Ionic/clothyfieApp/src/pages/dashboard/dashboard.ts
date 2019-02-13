import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CategoryProvider } from './../../providers/category/category';
import { Category } from './../../models/category';
import { UILoader } from '../../ui/loader.component';
import { ProductPage } from './../product/product';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  @ViewChild(Slides) slides: Slides;
  productListImages: Category[];

  bgImage:any;     

  clothSlideShowImages = [
    { image: "../../assets/imgs/ClothSample/sample1.png" },
    { image: "../../assets/imgs/ClothSample/sample2.png" },
    { image: "../../assets/imgs/ClothSample/sample3.png" },
    { image: "../../assets/imgs/ClothSample/sample4.png" }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage,
    public menuCtrl: MenuController,
    private categoryProvider: CategoryProvider,
    private loader: UILoader) {

  }

  ionViewDidLoad() {
    this.loader.presentLoader();
    this.categoryProvider.getCategories().subscribe(res => {
      this.productListImages = res;
      this.loader.loading.dismissAll();
    });
  }

  openMenu() {
    this.menuCtrl.open();
  }

  goToProductListing(categoryId: string) {
    this.navCtrl.push(ProductPage, {id: categoryId});
  }
}
