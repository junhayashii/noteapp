import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchNote, updateNote, deleteNote, fetchNotes } from "../services/api";
import "../styles/NotePage.scss";
import { MDXEditor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import {
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
} from "@mdxeditor/editor";

const NotePage = ({ updateNoteInList, removeNoteFromList, setNotes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [note, setNote] = useState({ title: "", body: "" });
  const [isNewNote, setIsNewNote] = useState(false);
  const [noteLoaded, setNoteLoaded] = useState(false);
  const titleRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setIsNewNote(queryParams.get("new") === "true");

    const getNote = async () => {
      if (id) {
        const data = await fetchNote(id);
        setNote(data);
      }
      setNoteLoaded(true);
    };

    getNote();
  }, [id, location.search]);

  useEffect(() => {
    const saveNote = async () => {
      if (id && note) {
        await updateNote(id, note);
        updateNoteInList(note);
      }
    };
    if (note.title || note.body) {
      saveNote();
    }
  }, [note, id]);

  useEffect(() => {
    if (noteLoaded) {
      if (isNewNote && titleRef.current) {
        titleRef.current.select();
      } else if (!isNewNote && editorRef.current) {
        editorRef.current.focus();
      }
      setNoteLoaded(false);
    }
  }, [isNewNote, noteLoaded]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (value) => {
    setNote((prevNote) => ({ ...prevNote, body: value }));
  };

  const handleDelete = async () => {
    if (id) {
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
    <div className="note-container">
      <input
        className="note-title"
        name="title"
        onChange={handleChange}
        value={note.title}
        ref={titleRef}
      />
      <MDXEditor
        key={note.title}
        markdown={note.body}
        onChange={handleEditorChange}
        ref={editorRef}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
        ]}
      />
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default NotePage;
