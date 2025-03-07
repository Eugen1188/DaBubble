import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore } from '@angular/fire/firestore';

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
}
