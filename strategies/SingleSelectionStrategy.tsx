import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react';
import { QuestionStrategyProps } from '@/interfaces/QuestionStrategyProps';
import { Option } from '@/components/Option';

export const SingleSelectionStrategy: React.FC<QuestionStrategyProps> = ({
  question,
  score,
  handleSubmit,
  handleFinish,
  isFeedback,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined,
  );

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
  };
  const handleResponse = () => {
    setSelectedOption(undefined);
    handleSubmit(question.answers === selectedOption, question.points);
  };
  return (
    <Card className="h-auto w-full flex items-center p-5">
      <CardHeader className="flex justify-between items-center mb-4 flex-col">
        <div className="flex flex-row w-full">
          <h2 className="text-gray-600 w-5/6 h-auto">{question.question}</h2>
          <p className="flex text-sm w-1/6 justify-end font-bold">
            Puntos: {score}
          </p>
        </div>
        <div className="flex justify-start items-start w-full">
          <span className="text-sm text-gray-500 justify-start">
            Seleccione una opción
          </span>
        </div>
      </CardHeader>
      <CardBody className="flex justify-center items-center">
        <div className="space-y-2 w-full flex flex-col gap-2 items-center">
          {question.options.map((option, index) => (
            <Option
              key={index}
              option={option}
              index={index}
              selectedOptions={selectedOption}
              handleAnswer={handleAnswer}
              disabled={isFeedback}
            />
          ))}
        </div>
      </CardBody>
      <CardFooter className="flex w-full justify-end">
        <Button
          variant="solid"
          color="primary"
          onClick={handleResponse}
          disabled={selectedOption === undefined}
          className="mr-2"
        >
          Siguiente
        </Button>
        <Button variant="solid" color="primary" onClick={handleFinish}>
          Cerrar
        </Button>
      </CardFooter>
    </Card>
  );
};
