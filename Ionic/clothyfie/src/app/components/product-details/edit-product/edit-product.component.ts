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
  productCategories: any = [];
  @Output() closeModel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showAlert: EventEmitter<String> = new EventEmitter<String>();

  selectedFiles: FileList;
  file: File;
  imgsrc;
  width = {};
  progressHidden: boolean = false;

  constructor(private fb: FormBuilder, private productService: ProductService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.productService.getProductColor().subscribe(res => this.productColor = res);
    this.productService.getProductSize().subscribe(res => this.productSize = res);
    this.productService.getProductCategory().subscribe(res => this.productCategories = res);
    this.editProductValidation();
  }

  editProductValidation() {
    if (this.validation == true) {
      this.editProduct = this.fb.group({
        name: ['', Validators.required],
        color: ['', Validators.required],
        brand: ['', Validators.required],
        category: ['', Validators.required],
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
        category: ['category', Validators.required],
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

  saveProduct(id, name, colorID, brand, CategoryID, sizeID, prize, quantity, images) {
    images = this.imgsrc;
    const products: Products = { id, name, colorID, brand, sizeID, prize, quantity, images, CategoryID };
    if (id == undefined) {
      const addProduct: Products = {
        name: name,
        colorID: colorID,
        brand: brand,
        sizeID: sizeID,
        prize: prize,
        quantity: quantity,
        images: this.imgsrc,
        CategoryID: CategoryID
      }
      this.productService.addProduct(addProduct);
      this.showAlert.emit('Created Successfully');
    } else {
      this.productService.updateProduct(products);
      this.showAlert.emit('Updated Successfully');
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

    this.progressHidden = true;

    uploadTask.percentageChanges().subscribe(res => {
      this.width = { 'width': `${res}%` }
      if (res == 100) {
        this.progressHidden = false;
      }
    });
  }

}
