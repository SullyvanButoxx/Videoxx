import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from '../../models/user';

@Injectable()
export class UserProvider {

  constructor(private afAuth: AngularFireAuth) {
  }

  create(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password)
  }
}
