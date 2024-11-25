import { firestore } from '@/config/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  orderBy,
  getDocs,
  where,
  query,
} from 'firebase/firestore';
import { RankUser, User } from '@/interfaces/User';

export class UserServices {
  private readonly collectionRef = collection(firestore, 'users');

  async getUser(id: string): Promise<User> {
    const userRef = doc(this.collectionRef, id);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as User;
    } else {
      throw new Error(`User with ID ${id} not found`);
    }
  }
  async getUserByEmail(email: string): Promise<User> {
    const q = query(this.collectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.data() as User;
    } else {
      throw new Error(`User with email ${email} not found`);
    }
  }
  async updateLevelStatusByEmail(
    email: string,
    points: number,
    levelId: number,
  ) {
    const q = query(this.collectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userRef = doc(this.collectionRef, userDoc.id);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const user = userSnap.data() as User;
        const actualLevelPoints = user.levelStatus[levelId]?.points || 0;
        user.points += points - actualLevelPoints;
        user.levelStatus[levelId] = { points };
        await setDoc(userRef, user);
      } else {
        throw new Error(`User with email ${email} not found`);
      }
    } else {
      throw new Error(`User with email ${email} not found`);
    }
  }

  //   async setUser(id: string, data: User) {
  //     const userRef = doc(this.collectionRef, id);
  //     await setDoc(userRef, data);
  //   }

  async createUser(user: User): Promise<User> {
    const userRef = doc(this.collectionRef, user.id);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      throw new Error('El usuario ya existe en la base de datos.');
    } else {
      await setDoc(userRef, user);
    }
    return user;
  }

  //   async deleteUser(id: string) {
  //     const userRef = doc(this.collectionRef, id);
  //     const docSnapshot = await getDoc(userRef);
  //     if (docSnapshot.exists()) {
  //       await deleteDoc(userRef);
  //     } else {
  //       throw new Error('El usuario no existe en la base de datos.');
  //     }
  //   }

  async getRanking(): Promise<RankUser[]> {
    const ref = query(this.collectionRef, orderBy('points', 'desc'));
    const querySnapshot = await getDocs(ref);

    const users: RankUser[] = [];
    querySnapshot.forEach((doc) => {
      const user = doc.data() as RankUser;
      user.position = users.length + 1;
      users.push(user);
    });
    return users;
  }
}
