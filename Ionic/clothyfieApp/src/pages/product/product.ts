import { ProductDetailsPage } from './../product-details/product-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from './../../providers/product/product';
import { Products } from './../../models/products';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  productDetails: Products[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private productProvider: ProductProvider) {                
  }

  ionViewDidLoad() {
    this.getProductByCategory();
  }

  getProductByCategory() {
    this.productProvider.getProductsByCategory(this.navParams.get("id"))
    .subscribe((res:Products[]) => {
      this.productDetails = res;
    });
  }

  goToProductDetails(productId: string) {
    this.navCtrl.push(ProductDetailsPage, {id: productId});
  }

}
