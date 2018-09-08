import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editProduct: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.editFormValidation();
  }

  ngOnInit() {
  }

  editFormValidation() {
  }

}
