import DragSource from '@/components/DragSource';
import { QuestionStrategyProps } from '@/interfaces/QuestionStrategyProps';
import update from 'immutability-helper';
import { ReactElement, useCallback, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react';
import { StatefulTargetBox as TargetBox } from '@/components/DropTarget';
import { toast } from 'sonner';

export interface Item {
  id: number;
  text: string;
}

export const DragAndDropText: React.FC<QuestionStrategyProps> = ({
  question,
  score,
  handleSubmit,
  handleFinish,
}) => {
  {
    const [cards, setCards] = useState(question.options);

    const [answers, setAnswers] = useState<string[]>([]);

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: any) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        }),
      );
    }, []);

    const renderCard = useCallback(
      (card: { id: number; text: string }, index: number) => {
        return (
          <DragSource
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            moveCard={moveCard}
          />
        );
      },
      [moveCard],
    );

    const handleResponse = () => {
      const arr1 = question.answers as string[];
      const pointPerAnswer = question.points / arr1.length;
      const sharedIndexes = arr1.reduce((acc, value, index) => {
        if (value === answers[index]) {
          acc.push(index);
        }
        return acc;
      }, [] as number[]);

      handleSubmit(true, pointPerAnswer * sharedIndexes.length);
      handleFinish();
    };
    const renderQuestion = (questionText: string | undefined) => {
      if (questionText === undefined) {
        toast.error('Este tipo de pregunta no está soportado');
        return;
      }

      const tokens = questionText.split(' ');

      let counter = 0;
      const elements: ReactElement[] = [];

      tokens.forEach((token, index) => {
        if (index > 0)
          elements.push(<span key={`space_${index}`}>&nbsp;</span>);

        if (token !== '*') {
          elements.push(<span key={index}>{token}</span>);
          return;
        }

        elements.push(<TargetBox />);
        counter++;
      });

      return <div className="inline-flex">{elements}</div>;
    };

    return (
      <DndProvider backend={HTML5Backend}>
        <Card className="h-auto w-full flex items-center p-5">
          <CardHeader className="flex justify-between items-center mb-4 flex-col">
            <div className="flex flex-row w-full">
              <h2 className="text-gray-600 w-5/6 h-auto">
                {question.question}
              </h2>
              <p className="flex text-sm w-1/6 justify-end font-bold">
                Puntos: {score}
              </p>
            </div>
            <div className="flex justify-start items-start w-full">
              <span className="text-sm text-gray-500 justify-start">
                Arrastra las palabras a su posición correcta
              </span>
            </div>
          </CardHeader>
          <CardBody className="flex justify-center items-center">
            {renderQuestion(question.content)}
            <div>
              {cards.map((card, i) =>
                renderCard(
                  {
                    id: i,
                    text: card,
                  } as Item,

                  i,
                ),
              )}
            </div>
          </CardBody>
          <CardFooter className="flex w-full justify-end">
            <Button
              variant="solid"
              color="primary"
              onClick={handleResponse}
              disabled={answers.every((option) => option !== '')}
              className="mr-2"
            >
              Siguiente
            </Button>
            <Button variant="solid" color="primary" onClick={handleFinish}>
              Cerrar
            </Button>
          </CardFooter>
        </Card>
      </DndProvider>
    );
  }
};
