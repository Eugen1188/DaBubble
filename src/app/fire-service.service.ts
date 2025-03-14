import { inject, Injectable } from '@angular/core';
import { collection, doc, getDocs, updateDoc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FireServiceService {
  constructor() { }
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


  async getUsers() {
    try {
      const usersCollection = collection(this.firestore, 'users');
      const userSnapshot = await getDocs(usersCollection);
      return userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error loading users:", error);
      throw error;  
    }
  }

  async getChannels() {
    try {
      const channelCollection = collection(this.firestore, 'channels');
      const channelSnapshot = await getDocs(channelCollection);
      return channelSnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error("Error loading channels:", error);
      throw error;  
    }
  }
}


