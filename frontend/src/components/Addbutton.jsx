import React from "react";
import { useNavigate } from "react-router-dom";
import { createNote } from "../services/api";

const AddButton = ({ addNoteToList }) => {
  const navigate = useNavigate();

  const handleAddNote = async () => {
    const newNote = { title: "", body: "" };
    const createdNote = await createNote(newNote);
    addNoteToList(createdNote);
    navigate(`/note/${createdNote.id}`);
  };

  return <button onClick={handleAddNote}>Add Note</button>;
};

export default AddButton;
