import { map } from 'rxjs/Operators';
import { Injectable } from '@angular/core';
import { Products, ProductColor, ProductSize, ProductCategory } from './../../models/products';
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
    this.productCollection = this.afs.collection('product', ref => ref.orderBy('name', 'asc').limit(5));
    return this.productData(this.productCollection);
  }

  productData(productCollection) {
    return this.product = this.productCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Products;
          data.id = a.payload.doc.id;
          this.getProductColorByID(data.colorID).subscribe((res: Products) => data.color = res.color);
          this.getProductSizeByID(data.sizeID).subscribe((res: Products) => data.size = res.size);
          this.getProductCategoryByID(data.CategoryID).subscribe((res: Products) => data.CategoryName = res.CategoryName);
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

  getProductCategory() {
    return this.afs.collection(`Categories`).snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as ProductCategory;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    )
  }

  getProductSizeByID(id) {
    return this.afs.doc(`productSize/${id}`).valueChanges();
  }

  getProductCategoryByID(id) {
    return this.afs.doc(`Categories/${id}`).valueChanges();
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
    this.productCollection = this.afs.collection(`product`, ref => ref.where('colorID', "==", searchColor).limit(5));
    return this.productData(this.productCollection);
  }

  getProductByID(id) {
    return this.productPrize = this.afs.doc(`product/${id}`).valueChanges();
  }

  searchProduct(searchStartText, searchEndText) {
    this.productCollection = this.afs.collection('product', ref => ref.orderBy('name', 'asc').limit(5)
    .startAt(searchStartText).endAt(searchEndText))
    return this.productData(this.productCollection);
  }

  nextPage(latest) {
    this.productCollection = this.afs.collection('product', ref => ref.orderBy('name', 'asc').limit(5)
    .startAfter(latest));
    return this.productData(this.productCollection);
  }
}
