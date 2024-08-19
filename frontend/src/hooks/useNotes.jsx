import { useState, useEffect } from "react";
import { fetchNotes } from "../services/api";

export const useNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const data = await fetchNotes();
      setNotes(data);
    };
    getNotes();
  }, []);

  const updateNote = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  return { notes, updateNote };
};
