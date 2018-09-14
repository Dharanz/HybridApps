import { ProductService } from 'src/app/services/product/product.service';
import { UsersService } from './../../../services/user/users.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Orders } from './../../../models/orders';
import { OrderService } from './../../../services/order/order.service';

@Component({
  selector: 'edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  @Input() orders: Orders;
  @Output() closeModel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showAlert: EventEmitter<String> = new EventEmitter<String>();

  users: any = [];
  products: any = [];


  constructor(private usersService: UsersService,
     private productService: ProductService) { 
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(res => this.users = res);
    this.productService.getProducts().subscribe(res => this.products = res);
  }

  saveOrder() {

  }

}
