import { ProductService } from 'src/app/services/product/product.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Products } from './../../../models/products';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { UploadTaskSnapshot } from 'angularfire2/storage/interfaces';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editProduct: FormGroup;
  @Input() products: Products;
  @Input() validation: boolean;
  productColor: any = [];
  productSize: any = [];
  @Output() closeModel: EventEmitter<boolean> = new EventEmitter<boolean>();

  selectedFiles: FileList;
  file: File;
  imgsrc;

  constructor(private fb: FormBuilder, private productService: ProductService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.productService.getProductColor().subscribe(res => this.productColor = res);
    this.productService.getProductSize().subscribe(res => this.productSize = res);
    this.editProductValidation();
  }

  editProductValidation() {
    if (this.validation == true) {
      this.editProduct = this.fb.group({
        name: ['', Validators.required],
        color: ['', Validators.required],
        brand: ['', Validators.required],
        size: ['', Validators.required],
        prize: [0, Validators.required],
        quantity: [0, Validators.required]
      });

      this.imgsrc = "../../../../assets/NoImageFound.jpg";

    } else {
      this.editProduct = this.fb.group({
        name: ['name', Validators.required],
        color: ['color', Validators.required],
        brand: ['brand', Validators.required],
        size: ['size', Validators.required],
        prize: [0, Validators.required],
        quantity: [0, Validators.required]
      });
      if (this.products.images == undefined) {
        this.imgsrc = "../../../../assets/NoImageFound.jpg";
      } else {
        this.imgsrc = this.products.images;
      }
    }
  }

  saveProduct(id, name, colorID, brand, sizeID, prize, quantity, images) {
    images = this.imgsrc;
    const products: Products = { id, name, colorID, brand, sizeID, prize, quantity, images };
    if (id == undefined) {
      const addProduct: Products = {
        name: name,
        colorID: colorID,
        brand: brand,
        sizeID: sizeID,
        prize: prize,
        quantity: quantity,
        images: this.imgsrc
      }
      this.productService.addProduct(addProduct);
    } else {
      this.productService.updateProduct(products);
    }

    this.closeModel.emit(true);
  }

  chooseFiles(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.item(0)) {
      this.uploadPic();
    }
  }

  uploadPic() {
    let file = this.selectedFiles.item(0);
    let uniqueKey = 'pic' + Math.floor(Math.random() * 1000);
    const uploadTask = this.storage.upload('/photos/products/' + uniqueKey, file);
    uploadTask.then((res: UploadTaskSnapshot) => res.ref.getDownloadURL().then(res => this.imgsrc = res));
  }

}
