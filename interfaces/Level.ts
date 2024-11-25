// @ts-ignore
import Article from '@/interfaces/Article';
// @ts-ignore
import Question from '@/interfaces/Question';

interface Level {
  id: number;
  name: string;
  description: string;
  dependsOn: number[] | [];
  image: string;
  articles: Article[] | [];
  questions: Question[] | [];
}

export default Level;
