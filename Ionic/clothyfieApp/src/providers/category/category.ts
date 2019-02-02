import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/Operators';
import { Category } from './../../models/category';

@Injectable()
export class CategoryProvider {

  categoryCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category[]>;
  categoryDoc: AngularFirestoreDocument<Category>;
  
  constructor(private afs: AngularFirestore) {
  }

  getCategories() {
    this.categoryCollection = this.afs.collection('Categories');
    return this.categoryData(this.categoryCollection);
  }

  categoryData(categoryCollection) {
    return this.categories = this.categoryCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Category;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    )
  }
}
