import { Component, OnInit } from '@angular/core';
import { OrderService } from './../../services/order/order.service';
import { Orders } from './../../models/orders';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Orders[];
  orderCount: boolean;
  spinner: boolean = true;
  newOrder: boolean;
  selectedOrder: Orders;

  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      timeout: 2000,
      positionClass: 'toast-bottom-center'
    });

  constructor(private orderService: OrderService,
    private modalService: NgbModal,
    private ts: ToasterService) { }

  ngOnInit() {
    this.orderService.getOrders()
    .subscribe((orders: Orders[]) => {
      this.orders = orders;
      this.spinner = false;

      this.orderCount = this.orders.length > 0 ? true : false;
    })
  }

  openVerticallyCentered(content, create) {
    this.newOrder = create == 'new' ? true : false;
    this.modalService.open(content, { centered: true });
    this.selectedOrder = create;
  }

  deleteOrder(id) {
    let result = confirm('Do You Want to Delete?');
    if (result) {
      this.orderService.deleteOrder(id);
      this.ts.pop('success', 'Deleted Successfully');
    } else {
      return;
    }  
  }

  closeModel(callback) {
    callback();
  }

  showAlert(event) {
    this.ts.pop('success', event);
  }

}
