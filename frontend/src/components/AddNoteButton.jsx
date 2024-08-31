import React from "react";
import { useNavigate } from "react-router-dom";
import { createNote } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import "../styles/ActionButton.scss";

const AddNoteButton = ({ addNoteToList }) => {
  const navigate = useNavigate();

  const handleAddNote = async () => {
    const newNote = { title: "", body: "" };
    const createdNote = await createNote(newNote);
    addNoteToList(createdNote);
    navigate(`/note/${createdNote.id}?new=true`);
  };

  return (
    <button className="add-note-button" onClick={handleAddNote}>
      <FontAwesomeIcon icon={faNotesMedical} className="icon" />
    </button>
  );
};

export default AddNoteButton;
