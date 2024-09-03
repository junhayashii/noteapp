import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchNote, updateNote } from "../services/api";
import "../styles/NotePage.scss";
import { MDXEditor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import {
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
} from "@mdxeditor/editor";

const NotePage = ({ updateNoteInList, notes }) => {
  const { id } = useParams();
  const location = useLocation();
  const [note, setNote] = useState({ title: "", body: "" });
  const [isNewNote, setIsNewNote] = useState(false);
  const [noteLoaded, setNoteLoaded] = useState(false);
  const titleRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setIsNewNote(queryParams.get("new") === "true");

    const fetchAndSetNote = async () => {
      if (id) {
        const existingNote = notes?.find((note) => note.id === parseInt(id));
        if (existingNote) {
          setNote(existingNote);
        } else {
          const data = await fetchNote(id);
          setNote(data);
        }
      }
      setNoteLoaded(true);
    };

    fetchAndSetNote();
  }, [id, location.search, notes]);
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
    if (id) {
      const timer = setTimeout(() => {
        if (isNewNote && titleRef.current) {
          titleRef.current.focus();
          titleRef.current.select();
        } else if (editorRef.current) {
          editorRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [id, isNewNote]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (value) => {
    setNote((prevNote) => ({ ...prevNote, body: value }));
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
      <div className="editor-container">
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
      </div>
    </div>
  );
};

export default NotePage;
