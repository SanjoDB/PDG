import React, { useState } from 'react';
import Question from '@/interfaces/Question';
// @ts-ignore
import Article from '@/interfaces/Article';
import ArticleModal from '@/components/ArticleModal';
import QuestionsModal from '@/components/QuestionsModal';

interface ActivityModalProps {
  onClose: (score: number, isCompleted: boolean) => void;
  questions: Question[];
  articles: Article[];
}

const ActivityModal: React.FC<ActivityModalProps> = ({
  onClose,
  questions,
  articles,
}) => {
  const [isArticlesRead, setIsArticlesRead] = useState<boolean>(false);

  const handleArticleFinish = () => {
    setIsArticlesRead(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-50 p-4 bg-white border rounded-lg shadow-lg w-5/6 h-auto flex">
        {!isArticlesRead ? (
          <ArticleModal
            onClose={onClose}
            articles={articles}
            initQuestions={handleArticleFinish}
          />
        ) : (
          <QuestionsModal onClose={onClose} questions={questions} />
        )}
      </div>
    </div>
  );
};

export default ActivityModal;
