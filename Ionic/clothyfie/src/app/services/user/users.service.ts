import { map, take } from 'rxjs/Operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Users } from '../../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userCollection: AngularFirestoreCollection<Users>;
  users: Observable<Users[]>;
  userDoc: AngularFirestoreDocument<Users>;

  constructor(private afs: AngularFirestore) {
    // this.users = this.afs.collection('users').valueChanges();
    this.userCollection = this.afs.collection('users', ref => ref.orderBy('name', 'asc').limit(5));
    this.users = this.userCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Users;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    )
  }

 getUsers() {
    return this.users;
  }

  deleteUsers(id) {
    this.userDoc = this.afs.doc(`users/${id}`);
    this.userDoc.delete();
  }

  updateUser(user: Users) {
    this.userDoc = this.afs.doc(`users/${user.id}`);
    this.userDoc.update(user);
  }

  
}
