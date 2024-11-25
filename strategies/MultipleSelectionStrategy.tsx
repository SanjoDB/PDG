import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react';
import { toast } from 'sonner';
import { QuestionStrategyProps } from '@/interfaces/QuestionStrategyProps';
import { Option } from '@/components/Option';

export const MultipleSelectionStrategy: React.FC<QuestionStrategyProps> = ({
  question,
  score,
  handleSubmit,
  handleFinish,
  isFeedback,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleAnswer = (index: number) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(index)) {
        return prevOptions.filter((option) => option !== index);
      } else {
        return [...prevOptions, index];
      }
    });
  };
  const handleResponse = () => {
    const arr1 = question.answers as number[];
    if (typeof question.answers !== 'number') {
      handleSubmit(
        arr1.every((answer) => selectedOptions.includes(answer)),
        question.points,
      );
    } else {
      toast.error('Erorr en la configuración de la pregunta');
      handleFinish();
    }
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
            Seleccione una o mas opciones
          </span>
        </div>
      </CardHeader>
      <CardBody className="flex justify-center items-center">
        <div className="space-y-2 w-3/6 flex flex-col">
          {question.options.map((option, index) => (
            <Option
              key={index}
              option={option}
              index={index}
              selectedOptions={selectedOptions}
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
          disabled={
            typeof question.answers !== 'number'
              ? selectedOptions.length < question.answers?.length
              : false
          }
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
