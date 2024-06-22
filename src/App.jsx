
import React, { useState } from 'react';
import Header from './Header';
import CreateNote from './CreateNote';
import Note from './Note';

function App() {
  const [addSome, setSomeItem] = useState([]);

  const addNote = (note) => {
    setSomeItem((allData) => {
      return [...allData, note];
    });
  };

  const onDelete = (id) => {
    setSomeItem((oldData) => {
      return oldData.filter((_, index) => index !== id);
    });
  };

  return (
    <>
      <Header />
      <CreateNote passNote={addNote} />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {addSome.map((val, index) => (
            <Note
              key={index}
              id={index}
              title={val.title}
              content={val.content}
              deleteItem={onDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;




