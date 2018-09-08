import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  spinner: boolean = true;
  newProduct: boolean;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openVerticallyCentered(content, create) {
        this.newProduct = create == 'new' ? true : false;
    this.modalService.open(content, { centered: true });  
  }

  closeModel(callback) {
    callback();
  }

}
