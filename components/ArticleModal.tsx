// ArticleModal.tsx
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
} from '@nextui-org/react';
import React, { useState } from 'react';
// @ts-ignore
import Article from '@/interfaces/Article';
import { toast } from 'sonner';
import MarkdownViewer from '@/components/MarkdownViewer';

interface ArticleModalProps {
  onClose: (score: number, isCompleted: boolean) => void;
  articles: Article[];
  initQuestions: () => void;
  isFeedback?: boolean;
}

const ArticleModal: React.FC<ArticleModalProps> = ({
  onClose,
  articles,
  initQuestions,
  isFeedback = false,
}) => {
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [readArticles, setReadArticles] = useState<number[]>([]);
  const [startQuestions, setStartQuestions] = useState<boolean>(false);
  const currentArticle = articles[currentArticleIndex];
  const handleArticleRead = (articleId: number) => {
    if (!readArticles.includes(articleId)) {
      setReadArticles([...readArticles, articleId]);
    }

    if (currentArticleIndex < articles.length - 1) {
      setCurrentArticleIndex((prevIndex) => prevIndex + 1);
    } else {
      setStartQuestions(true);
    }
  };
  const handleFinish = () => {
    if (readArticles.length === articles.length) {
      initQuestions();
    } else {
      if (!isFeedback) {
        toast.error('Debe leer todos los artículos para continuar');
      }
      onClose(0, false);
    }
  };

  return (
    <>
      {!startQuestions ? (
        <Card
          className="h-auto w-full flex items-center p-5"
          key={currentArticle.id}
        >
          <CardHeader className="flex justify-center items-center mb-4 flex-col">
            <div className="flex w-full justify-end">
              <p className="flex text-sm w-1/6 justify-end font-bold">
                Artículo {currentArticleIndex + 1} de {articles.length}
              </p>
            </div>
            <div className="flex-row w-full">
              <h1 className="flex justify-center text-lg font-semibold capitalize h-auto w-full">
                {currentArticle.title}
              </h1>
            </div>
          </CardHeader>
          <CardBody className="markdown-content">
            <MarkdownViewer markdownUrl={currentArticle.content} />
          </CardBody>
          <CardFooter className="flex w-full justify-end">
            {!isFeedback && (
              <Button
                variant="solid"
                color="primary"
                className="mr-2"
                onClick={() => handleArticleRead(currentArticle.id)}
              >
                Marcar como leído
              </Button>
            )}
            <Button variant="solid" color="primary" onClick={handleFinish}>
              {isFeedback ? 'Siguiente' : 'Cerrar'}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          {!isFeedback && (
            <div className="text-center w-full flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-4">
                ¡Has leído todos los artículos!
              </h2>
              <div className="mt-4">
                <Button variant="solid" color="primary" onClick={handleFinish}>
                  Iniciar Quiz
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ArticleModal;
