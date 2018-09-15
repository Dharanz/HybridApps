import { Products } from './../../../models/products';
import { ProductService } from 'src/app/services/product/product.service';
import { UsersService } from './../../../services/user/users.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Orders } from './../../../models/orders';
import { OrderService } from './../../../services/order/order.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  editOrder: FormGroup;
  @Input() orders: Orders;
  @Output() closeModel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showAlert: EventEmitter<String> = new EventEmitter<String>();
  @Input() validation: boolean;

  users: any = [];
  products: any = [];
  productPrize;
  currencyCount: Number;
  defaultQty;

  model;

  constructor(private usersService: UsersService,
    private productService: ProductService,
    private fb: FormBuilder,
    private orderService: OrderService) {
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe(res => this.users = res);
    this.productService.getProducts().subscribe(res => this.products = res);
    this.productService.getProductByID(this.orders.productID)
      .subscribe((res: Products) => {

        if (res == undefined) {
          this.currencyCount = 0;
          this.productPrize = 0;
        } else {
          this.productPrize = res.prize;
          this.defaultQty = this.orders.quantity;
          let defaultPrize: any = res.prize;
          this.currencyCount = this.defaultQty * defaultPrize;
        }
      });

    this.editOrderValidation();

  }

  editOrderValidation() {
    if (this.validation == true) {
      this.editOrder = this.fb.group({
        userName: ['', Validators.required],
        productName: ['', Validators.required],
        quantity: ['', Validators.required],
        status: ['', Validators.required]
      });
      this.editOrder.get('quantity').disabled;
    } else {
      this.editOrder = this.fb.group({
        userName: ['customerName', Validators.required],
        productName: ['productName', Validators.required],
        quantity: [0, Validators.required],
        status: ['status', Validators.required]
      });
    }
  }

  count(event) {
    this.currencyCount = 0;
    this.currencyCount = this.productPrize * event.target.value;
  }

  getProductPrize(event, qty) {
    this.productService.getProductByID(event.target.value)
      .subscribe((res: Products) => {
        this.productPrize = res.prize;
        this.defaultQty = qty;
        let defaultPrize: any = res.prize;
        this.currencyCount = this.defaultQty * defaultPrize;
      });
  }

  saveOrder(id, userID, productID, quantity, status) {
    const orders = {
      id: id,
      customerID: userID,
      productID: productID,
      quantity: quantity,
      status: status
    };
    if (id == undefined) {
      const addOrder = {
        customerID: userID,
        productID: productID,
        quantity: quantity,
        status: status
      }
      this.orderService.addOrder(addOrder);
      this.showAlert.emit('Created Successfully');
    } else {
      this.orderService.updateOrder(orders);
      this.showAlert.emit('Updated Successfully');
    }

    this.closeModel.emit(true);
  }
}
