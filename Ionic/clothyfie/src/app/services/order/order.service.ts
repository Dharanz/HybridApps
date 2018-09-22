import { Users } from './../../models/users';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Orders } from './../../models/orders';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderCollection: AngularFirestoreCollection<Orders>;
  orderDoc: AngularFirestoreDocument<Orders>
  orders: Observable<Orders[]>;

  userID;

  constructor(private afs: AngularFirestore) {    
   }

   getOrders(userID) {
     this.userID = userID;
    this.orderCollection = this.afs.collection(`users/${this.userID}/orders`, ref => ref.orderBy('orderDate', 'desc').limit(5))
    return this.orderData(this.orderCollection);
   }

   orderData(orderCollection) {
    return this.orders = this.orderCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Orders;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    )
   }

   getUserName() {
     return this.afs.doc(`users/${this.userID}`).valueChanges();
   }

   addOrder(order) {
    this.orderCollection.add(order);
   }

   updateOrder(order) {
    this.orderDoc = this.afs.doc(`users/${this.userID}/orders/${order.id}`);
    this.orderDoc.update(order);
  }

  deleteOrder(id) {
    this.orderDoc = this.afs.doc(`users/${this.userID}/orders/${id}`);
    this.orderDoc.delete();
  } 

  getOrderByDate(startDate, endDate) {
    this.orderCollection = this.afs.collection(`users/${this.userID}/orders`, ref => ref.orderBy('orderDate', 'desc').limit(25)
  .where('orderDate', '>=', startDate).where('orderDate', '<=', endDate))
  return this.orderData(this.orderCollection);
  }

  nextPage(latest) {
    this.orderCollection = this.afs.collection(`users/${this.userID}/orders`, ref => ref.orderBy('orderDate', 'desc').limit(5)
    .startAfter(latest));
    return this.orderData(this.orderCollection);
  }
}
