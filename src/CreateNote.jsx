

import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import MicIcon from '@mui/icons-material/Mic';

function CreateNote(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isRecording, setIsRecording] = useState(false);

  const InputEvent = (event) => {
    const { name, value } = event.target;
    setNote((allData) => ({
      ...allData,
      [name]: value,
    }));
  };

  const addEvent = (event) => {
    event.preventDefault(); // Prevent default form submission behavior 
    props.passNote(note);
    setNote({ title: "", content: "" }); // Clear the form fields after submission
  };

  const startRecording = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }
        setNote(prevNote => ({ ...prevNote, content: prevNote.content + ' ' + transcript }));
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } else {
      alert("Your browser doesn't support speech recognition.");
    }
  };

  return (
    <div className='w-full flex justify-center items-center mt-8 p-4'>
      <form className='w-full max-w-md bg-white shadow-md rounded-lg p-4' onSubmit={addEvent}>
        <input
          type='text'
          placeholder='Title'
          className='w-full mb-2 px-3 py-2 border rounded'
          name='title'
          value={note.title}
          onChange={InputEvent}
        />
        <textarea
          className='w-full h-24 px-3 py-2 border rounded'
          placeholder='Write your Note...'
          name='content'
          value={note.content}
          onChange={InputEvent}
        ></textarea>
        <div className="flex justify-end mt-2">
          <button type='button' className={`bg-${isRecording ? 'red' : 'blue'}-500 text-white p-2 rounded-full hover:bg-${isRecording ? 'red' : 'blue'}-600`} onClick={startRecording}>
            <MicIcon />
          </button>
          <button type='submit' className='bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 ml-2'>
            <AddIcon />
          </button>
        </div>
      </form>
    </div>
  ); 
}

export default CreateNote;














