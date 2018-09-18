import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product/product.service';
import { Products } from './../../models/products';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

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

  latestEntry: any;
  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      timeout: 2000,
      positionClass: 'toast-bottom-center'
    });

  constructor(private modalService: NgbModal, private productService: ProductService, private ts: ToasterService) { }

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
        this.latestEntry = res[res.length - 1];
      });
  }

  closeModel(callback) {
    callback();
  }

  deleteProduct(id) {
    let result = confirm('Do You Want to Delete?');
    if (result) {
      this.productService.deleteProduct(id);
      this.ts.pop('success', 'Deleted Successfully');
    } else {
      return;
    }    
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

  search(event) {
    this.productService.searchProduct(event.target.value, event.target.value+"\uf8ff")
    .subscribe((products: Products[]) => {
      this.products = products;
      this.spinner = false;

      this.productCount = this.products.length > 0 ? true : false;
    });
  }

  clearFilter() {
    this.getProducts();
  }

  showAlert(event) {
    this.ts.pop('success', event);
  }
}
