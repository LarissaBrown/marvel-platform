const editorStyles = {
  tiptap: {
    '&:first-child': {
      marginTop: 0,
    },
    img: {
      display: 'block',
      height: 'auto',
      margin: '1.5rem 0',
      maxWidth: '100%',
      '&.ProseMirror-selectednode': {
        outline: '3px solid var(--purple)',
      },
    },
  },
  editorContainer: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    minHeight: '150px',
    backgroundColor: '#fff',
  },
  menu: {
    display: 'flex',
    gap: '5px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '5px',
  },
  button: {
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    backgroundColor: '#1976d2',
    color: 'white',
  },
  activeButton: {
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    backgroundColor: '#ddd',
    fontWeight: 'bold',
  },
  container: {
    position: 'relative',
    display: 'inline-block',
  },
  buttonGroup: {
    position: 'absolute',
    top: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0, 0, 0, 0.6)',
    padding: '8px',
    borderRadius: '5px',
    display: 'flex',
    gap: '8px',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    color: 'white',
  },
  redoButton: (isDisabled) => ({
    backgroundColor: isDisabled ? '#bdbdbd' : '#2e7d32',
    color: 'white',
  }),
};

export default editorStyles;
