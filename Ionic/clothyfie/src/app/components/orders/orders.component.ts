import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderService } from './../../services/order/order.service';
import { Orders } from './../../models/orders';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import * as firebase from 'firebase';

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
  @Output() dateSelect = new EventEmitter<NgbDateStruct>();

  startDateModel;
  endDateModel;
  latestEntry: any;
  showStartPage: boolean = false;
  showNextPage: boolean = true;

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
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders()
    .subscribe((orders: Orders[]) => {
      this.orders = orders;
      this.spinner = false;

      this.orderCount = this.orders.length > 0 ? true : false;
      this.showNextPage = this.orders.length == 5 ? true : false;
      this.latestEntry = orders[orders.length - 1];
    });

    this.showStartPage = false;  
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

  searchDate(startDate, endDate) {
    startDate = firebase.firestore.Timestamp.fromDate(new Date(startDate)).toDate()
    endDate = endDate == '' ? firebase.firestore.Timestamp.fromDate(new Date(startDate)).toDate() : firebase.firestore.Timestamp.fromDate(new Date(endDate)).toDate();
    this.orderService.getOrderByDate(startDate, endDate)
    .subscribe((orders: Orders[]) => {
      this.orders = orders;
      this.spinner = false;

      this.orderCount = this.orders.length > 0 ? true : false;
    })
  }

  clearFilters() {
    this.startDateModel = undefined;
    this.endDateModel = undefined;

    this.getOrders();
  }

  nextPage() {
    this.orderService.nextPage(this.latestEntry.orderDate).subscribe((orders: Orders[]) => {
      this.orders = orders;
      this.spinner = false;

      this.orderCount = this.orders.length > 0 ? true : false;
      this.showNextPage = this.orders.length == 5 ? true : false;
      this.latestEntry = orders[orders.length - 1];
      this.showStartPage = true;  
    });  
  }
  
}