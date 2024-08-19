import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNote, updateNote, deleteNote, fetchNotes } from "../services/api";

const NotePage = ({ updateNoteInList, removeNoteFromList, setNotes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", body: "" });

  useEffect(() => {
    if (id !== "new") {
      const getNote = async () => {
        const data = await fetchNote(id);
        setNote(data);
      };
      getNote();
    } else {
      setNote({ title: "", body: "" });
    }
  }, [id]);

  useEffect(() => {
    const saveNote = async () => {
      if (id !== "new" && note) {
        await updateNote(id, note);
        updateNoteInList(note);
      }
    };
    if (note.title || note.body) {
      saveNote();
    }
  }, [note, id]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    if (id !== "new") {
      await deleteNote(id);
      removeNoteFromList(id);
      await fetchNotesAgain();
      navigate("/", { replace: true });
    }
  };

  const fetchNotesAgain = async () => {
    let data = await fetchNotes();
    setNotes(data);
  };

  return (
    <div>
      <textarea
        name="title"
        onChange={handleChange}
        value={note.title}
        placeholder="Title"
      ></textarea>
      <textarea
        name="body"
        onChange={handleChange}
        value={note.body}
        placeholder="Content"
      ></textarea>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default NotePage;
