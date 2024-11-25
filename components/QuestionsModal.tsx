import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import Question from '@/interfaces/Question';
import { QuestionStrategiesType, QuestionsTypeEnum } from '@/types';
import ArticleModal from '@/components/ArticleModal';

interface QuestionsModalProps {
  onClose: (score: number, isCompleted: boolean) => void;
  questions: Question[];
}

const QuestionsModal: React.FC<QuestionsModalProps> = ({
  onClose,
  questions,
}) => {
  const acceptanceRate = parseFloat(process.env.ACCEPTANCE_RATE || '0.8');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setShowScore(false);
    setCurrentQuestionIndex(0);
    setScore(0);
  }, [questions]);

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 === questions.length) {
      setShowScore(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSubmit = async (isCorrect: boolean, newPoints: number) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + newPoints);
      nextQuestion();
    } else {
      setShowFeedback(true);
    }
  };

  const handleFinish = () => {
    const maxScore = questions.reduce(
      (acc, question) => acc + question.points,
      0,
    );
    onClose(score, score >= maxScore * acceptanceRate);
  };

  const onCloseFeedback = () => {
    setShowFeedback(false);
    nextQuestion();
  };

  const QuestionStrategyComponent =
    QuestionStrategiesType[questions[currentQuestionIndex].type];

  return (
    <>
      {!showScore ? (
        <QuestionStrategyComponent
          question={questions[currentQuestionIndex]}
          score={score}
          handleSubmit={handleSubmit}
          handleFinish={handleFinish}
          isFeedback={showFeedback}
        />
      ) : (
        <div className="text-center w-full flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">
            Tu puntuación final es:
          </h2>
          <span className="bg-blue-500 text-white px-3 py-1 rounded-lg w-48">
            {score}
          </span>
          <div className="mt-4">
            <Button variant="solid" onClick={handleFinish}>
              Finalizar
            </Button>
          </div>
        </div>
      )}
      <div className="ml-3">
        {showFeedback && (
          <ArticleModal
            onClose={onCloseFeedback}
            articles={Array.from({ length: 1 }, (_, i) => ({
              id: i,
              title: `Feedback de la pregunta ${currentQuestionIndex + 1}`,
              content: questions[currentQuestionIndex].feedback,
            }))}
            initQuestions={onCloseFeedback}
            isFeedback={true}
          />
        )}
      </div>
    </>
  );
};

export default QuestionsModal;
