import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from '@angular/fire/auth';
import { FIREBASE_DOCUMENTS } from '../../app/app.firebase.doc';

@Injectable()
export class ProfileProvider {

  constructor(private afStore: AngularFirestore, private afAuth: AngularFireAuth) {
  }

  create(profile: Profile) {
    return this.afStore.doc(`${FIREBASE_DOCUMENTS.profile}${this.afAuth.auth.currentUser.uid}`).set(profile.unCustom())
  }

}
