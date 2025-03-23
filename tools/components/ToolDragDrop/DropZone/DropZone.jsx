import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        width: '200px',
        height: '100px',
        backgroundColor: isOver ? 'lightgreen' : 'lightgray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px',
      }}
    >
      Drop Here
    </div>
  );
};

export default DropZone;
