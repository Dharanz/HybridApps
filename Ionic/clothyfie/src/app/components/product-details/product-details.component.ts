import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product/product.service';
import { Products } from './../../models/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  products: Products[];
  productCount: boolean = true;
  spinner: boolean = true;
  newProduct: boolean;
  selectedProduct: Products;
  productColor: any = [];
  productSize: any = [];

  constructor(private modalService: NgbModal, private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
    this.productService.getProductColor().subscribe(res => this.productColor = res);
  }

  openVerticallyCentered(content, create) {
    this.newProduct = create == 'new' ? true : false;
    this.modalService.open(content, { centered: true });
    this.selectedProduct = create;
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(res => {
        this.products = res;
        this.spinner = false;

        this.productCount = this.products.length > 0 ? true : false;
      });
  }

  closeModel(callback) {
    callback();
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id);
  }

  searchColor(searchColor) {
    if (searchColor.target.value != 0) {
      this.productService.getProductsByProductName(searchColor.target.value)
        .subscribe(res => {
          this.products = res;
          this.spinner = false;

          this.productCount = this.products.length > 0 ? true : false;
        });
    } else {
      this.getProducts();
    }
  }

  clearFilter() {
    this.getProducts();
  }
}
