import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Products } from './../../models/products';
import { ProductProvider } from './../../providers/product/product';
import { UILoader } from '../../ui/loader.component';

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  productDetail: Products;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productProvider: ProductProvider,
    private loader: UILoader
  ) {
    this.getProductById();
  }

  getProductById() {
    this.loader.presentLoader();
    this.productProvider.getProductById(this.navParams.get('id'))
    .subscribe((res: Products) => {
      this.productDetail = res;
      this.loader.loading.dismissAll();
    });
  }
}
