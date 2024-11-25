// @ts-ignore
import Level from '@/interfaces/Level';
import Article from '@/interfaces/Article';
import Question from '@/interfaces/Question';
import { firestore } from '@/config/firebase';
import { collection, getDocs, DocumentReference } from 'firebase/firestore';

export class LevelServices {
  private readonly levelsCollectionRef = collection(firestore, 'levels');

  async getLevels(): Promise<Level[]> {
    console.log('Getting levels...');
    const levels: Level[] = [];

    try {
      const levelsSnapshot = await getDocs(this.levelsCollectionRef);
      for (const levelDoc of levelsSnapshot.docs) {
        const levelData = levelDoc.data() as Level;
        const articles = await this.getArticlesByRef(levelDoc.ref);
        const questions = await this.getQuestionsByRef(levelDoc.ref);
        levels.push({ ...levelData, articles, questions });
      }
    } catch (error) {
      console.error(error);
    }
    return levels;
  }

  private async getArticlesByRef(ref: DocumentReference<any, any>) {
    const articlesSnapshot = await getDocs(collection(ref, 'articles'));
    return articlesSnapshot.docs
      .map((doc) => doc.data() as Article)
      .sort((a, b) => a.id - b.id);
  }

  private async getFeedbackByRef(ref: DocumentReference<any, any>) {
    const articlesSnapshot = await getDocs(collection(ref, 'feedback'));
    return articlesSnapshot.docs
      .map((doc) => doc.data() as Article)
      .sort((a, b) => a.id - b.id);
  }

  private async getQuestionsByRef(ref: DocumentReference<any, any>) {
    const questionsSnapshot = await getDocs(collection(ref, 'questions'));
    return questionsSnapshot.docs.map((doc) => doc.data() as Question);
  }
}
