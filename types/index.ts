import React, { SVGProps } from 'react';
import { QuestionStrategyProps } from '@/interfaces/QuestionStrategyProps';
import { SingleSelectionStrategy } from '@/strategies/SingleSelectionStrategy';
import { MultipleSelectionStrategy } from '@/strategies/MultipleSelectionStrategy';
import { DragAndDropText } from '@/strategies/DragAndDropText';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export enum QuestionsTypeEnum {
  MULTIPLE = 'MULTIPLE',
  SINGLE = 'SINGLE',
  DRAG_DROP_TEXT = 'DRAG_DROP_TEXT',
}

export const QuestionStrategiesType: Record<
  QuestionsTypeEnum,
  React.FC<QuestionStrategyProps>
> = {
  [QuestionsTypeEnum.MULTIPLE]: MultipleSelectionStrategy,
  [QuestionsTypeEnum.SINGLE]: SingleSelectionStrategy,
  [QuestionsTypeEnum.DRAG_DROP_TEXT]: DragAndDropText,
};

export const ItemTypes = {
  CARD: 'card',
};
