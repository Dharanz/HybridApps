import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Products } from '../../models/products';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/Operators';

@Injectable()
export class ProductProvider {

  productCollection: AngularFirestoreCollection<Products>;
  products: Observable<Products[]>;
  productDocument: AngularFirestoreDocument<Products>;

  constructor(private afs: AngularFirestore) {
  }

  getProductsByCategory(categoryId: string) {
    this.productCollection = this.afs.collection('product', ref => ref.where('CategoryID', '==', categoryId));
    return this.productData(this.productCollection);
  }

  productData(productCollection) {
    return this.products = this.productCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Products;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    )
  }

}
