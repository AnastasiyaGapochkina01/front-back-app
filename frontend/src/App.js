import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:5000/api/notes');
    setNotes(response.data);
  };

  const addNote = async () => {
    await axios.post('http://localhost:5000/api/notes', { content: newNote });
    setNewNote('');
    fetchNotes();
  };

  return (
    <div>
      <h1>Notes App</h1>
      <input
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="New note"
      />
      <button onClick={addNote}>Add Note</button>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
