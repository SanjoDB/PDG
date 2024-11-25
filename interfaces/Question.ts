import { QuestionsTypeEnum } from '@/types';
import Article from '@/interfaces/Article';

interface Question {
  id: string;
  question: string;
  options: string[];
  type: QuestionsTypeEnum;
  answers: number[] | number | string[] | string;
  points: number;
  content: string | undefined;
  feedback: string;
}

export default Question;
