import type { CSSProperties, FC } from 'react';
import { memo, useCallback, useState } from 'react';
import type { DropTargetMonitor } from 'react-dnd';
import { useDrop } from 'react-dnd';

import type { DragItem } from './DragSource';
import { ItemTypes } from '@/types/index';

const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

export interface TargetBoxProps {
  onDrop: (item: DragItem) => void;
  item: DragItem | null;
}

export const DropTarget: FC<TargetBoxProps> = memo(function TargetBox({
  onDrop,
  item,
}) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      drop(item: DragItem, _monitor) {
        onDrop(item);
        return undefined;
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop],
  );

  const opacity = isOver ? 1 : 0.7;
  let backgroundColor = '#fff';

  return (
    <div
      ref={drop}
      style={{ ...style, backgroundColor, opacity }}
      role="TargetBox"
    >
      {item ? <p>{item.text}</p> : 'Drop here'}
    </div>
  );
});

export interface StatefulTargetBoxState {
  item: string | null;
}
export const StatefulTargetBox: FC = (props) => {
  const [item, setItem] = useState<DragItem | null>(null);
  const handleDrop = useCallback((item: DragItem) => {
    setItem(item);
  }, []);

  return <DropTarget {...props} item={item} onDrop={handleDrop} />;
};
