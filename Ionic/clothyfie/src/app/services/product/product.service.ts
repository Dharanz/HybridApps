import { map } from 'rxjs/Operators';
import { Injectable } from '@angular/core';
import { Products, ProductColor, ProductSize } from './../../models/products';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productModel: Products;
  productCollection: AngularFirestoreCollection<Products>;
  product: Observable<Products[]>;
  productDoc: AngularFirestoreDocument<Products>;

  productPrize: Observable<Products>;



  constructor(private afs: AngularFirestore) {
    this.getProducts();
  }

  getProducts() {
    this.productCollection = this.afs.collection('product', ref => ref.orderBy('name', 'asc').limit(25));
    return this.product = this.productCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Products;
          data.id = a.payload.doc.id;
          this.getProductColorByID(data.colorID).subscribe((res: Products) => data.color = res.color);
          this.getProductSizeByID(data.sizeID).subscribe((res: Products) => data.size = res.size);
          return data;
        });
      })
    )
  }

  getProductColor() {
    return this.afs.collection(`productColor`).snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as ProductColor;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    )
  }

  getProductColorByID(id) {
    return this.afs.doc(`productColor/${id}`).valueChanges();
  }


  getProductSize() {
    return this.afs.collection(`productSize`).snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as ProductSize;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    )
  }

  getProductSizeByID(id) {
    return this.afs.doc(`productSize/${id}`).valueChanges();
  }

  addProduct(product: Products) {
    this.productCollection.add(product);
  }

  updateProduct(product: Products) {
    this.productDoc = this.afs.doc(`product/${product.id}`);
    this.productDoc.update(product);
  }

  deleteProduct(id) {
    this.productDoc = this.afs.doc(`product/${id}`);
    this.productDoc.delete();
  }

  getProductsByProductName(searchColor) {
    return this.afs.collection(`product`, ref => ref.where('colorID', "==", searchColor)).snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Products;
          data.id = a.payload.doc.id;
          this.getProductColorByID(data.colorID).subscribe((res: Products) => data.color = res.color);
          this.getProductSizeByID(data.sizeID).subscribe((res: Products) => data.size = res.size);
          return data;
        });
      })
    )
  }

  getProductByID(id) {
    return this.productPrize = this.afs.doc(`product/${id}`).valueChanges();
  }
}
