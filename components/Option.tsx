import React from 'react';
import { Button } from '@nextui-org/react';

interface OptionProps {
  option: string;
  index: number;
  selectedOptions: number | number[] | undefined;
  handleAnswer: (index: number) => void;
  disabled: boolean;
}

export const Option = ({
  option,
  index,
  selectedOptions,
  handleAnswer,
  disabled,
}: OptionProps) => {
  const selectedOptionArray = Array.isArray(selectedOptions)
    ? selectedOptions
    : [selectedOptions];
  return (
    <Button
      key={index}
      className={`w-3/6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 ${
        selectedOptionArray.includes(index) && 'bg-blue-700'
      }`}
      onClick={() => handleAnswer(index)}
      disabled={disabled}
    >
      {option}
    </Button>
  );
};
