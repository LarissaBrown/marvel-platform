import { useDrag } from 'react-dnd';

const DragItem = ({ id, name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '10px',
        margin: '5px',
        backgroundColor: 'lightblue',
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {name}
    </div>
  );
};

export default DragItem;
