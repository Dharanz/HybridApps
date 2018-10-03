import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Users } from './../../models/users';
import { map } from 'rxjs/Operators';

@Injectable()
export class LoginProvider {

  userCollection: AngularFirestoreCollection<Users>;
  users: Observable<Users[]>;
  userDoc: AngularFirestoreDocument<Users>;
  
  constructor(private afs: AngularFirestore) {
  }

  getLoginDetails(userName) {
    this.userCollection = this.afs.collection('users', ref => ref.where('username', '==', userName));
    return this.userData(this.userCollection);
  }

  userData(userCollection) {
    return this.users = this.userCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Users;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    )
  }

  updatePassword(username: string, password: string) {
    this.getLoginDetails(username).subscribe(res => {
      res.forEach((data: Users) => {        
        data.password = password;
        this.afs.doc(`users/${data.id}`).update(data);
      });
    });
  }

  createUser(user: Users) {
    this.afs.collection('users').add(user);
  }
}
