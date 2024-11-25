import Question from '@/interfaces/Question';

export interface QuestionStrategyProps {
  question: Question;
  score: number;
  handleSubmit: (isCorrect: boolean, newPoints: number) => void;
  handleFinish: () => void;
  isFeedback: boolean;
}
