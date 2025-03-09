import { inject, Injectable } from '@angular/core';
import { collection, doc, updateDoc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FireServiceService {
  constructor() {}
  firestore: Firestore = inject(Firestore);

  getDocRef(ref: string, id: string) {
    return doc(this.firestore, ref, id);
  }

  getCollectionRef(ref: string) {
    return collection(this.firestore, ref);
  }

  async updateOnlineStatus(currentUser: any) {
    if (currentUser.uid) {
      const userRef = doc(this.firestore, 'users', currentUser.uid);
      await updateDoc(userRef, {
        online: currentUser.online,
      })
    }

  }
}

