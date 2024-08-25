import React from "react";
import { useNavigate } from "react-router-dom";
import { createNote } from "../services/api";
import "../styles/AddButton.scss";

const AddButton = ({ addNoteToList }) => {
  const navigate = useNavigate();

  const handleAddNote = async () => {
    const newNote = { title: "", body: "" };
    const createdNote = await createNote(newNote);
    addNoteToList(createdNote);
    navigate(`/note/${createdNote.id}?new=true`);
  };

  return (
    <button className="add-note-button" onClick={handleAddNote}>
      Add Note
    </button>
  );
};

export default AddButton;
