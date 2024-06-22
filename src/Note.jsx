
import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Note(props) {
  const deleteNote = () => {
    props.deleteItem(props.id);
  };

  return (
    <div className='note bg-green-500 text-black rounded-md shadow-md p-4 flex flex-col justify-between w-full'>
      <div>
        <h1 className='text-lg font-semibold mb-2'>{props.title}</h1>
        <p className='mb-4 break-words'>{props.content}</p>
      </div>
      <button className='self-end text-black' onClick={deleteNote}>
        <DeleteOutlineIcon />
      </button>
    </div>
  );
}

export default Note;








