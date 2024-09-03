import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import NotePage from "../components/NotePage";
import NewTab from "../components/NewTab";
import { fetchNotes, fetchFolders, deleteNote } from "../services/api";
import "../styles/MainPage.scss";

const MainPage = () => {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getNotesAndFolders = async () => {
      const notesData = await fetchNotes();
      const foldersData = await fetchFolders();
      setNotes(notesData);
      setFolders(foldersData);
    };
    getNotesAndFolders();
  }, []);

  const updateNoteInList = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setFolders((prevFolders) => {
      return prevFolders.map((folder) => {
        if (folder.id === updatedNote.folder) {
          return {
            ...folder,
            notes: folder.notes.map((note) =>
              note.id === updatedNote.id ? updatedNote : note
            ),
          };
        }
        return folder;
      });
    });
  };

  const addNoteToList = (newNote) => {
    if (newNote.folder) {
      setFolders((prevFolders) => {
        return prevFolders.map((folder) => {
          if (folder.id === newNote.folder) {
            return {
              ...folder,
              notes: [...folder.notes, newNote],
            };
          }
          return folder;
        });
      });
    } else {
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }
  };

  const removeNoteFromList = (noteId) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== noteId);
    });
    setFolders((prevFolders) => {
      return prevFolders.map((folder) => {
        const updatedNotes = folder.notes.filter((note) => note.id !== noteId);
        return {
          ...folder,
          notes: updatedNotes,
        };
      });
    });
  };

  const handleDeleteNote = async (noteId) => {
    await deleteNote(noteId);
    removeNoteFromList(noteId);

    const currentNoteId = window.location.pathname.split("/").pop();
    if (currentNoteId === noteId.toString()) {
      navigate("/");
    }
  };

  const addFolderToList = (newFolder) => {
    setFolders((prevFolders) => [...prevFolders, newFolder]);
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="*"
          element={
            <div className="app-container">
              <Sidebar
                notes={notes}
                setNotes={setNotes}
                folders={folders}
                setFolders={setFolders}
                addNoteToList={addNoteToList}
                addFolderToList={addFolderToList}
                handleDeleteNote={handleDeleteNote}
                updateNoteInList={updateNoteInList}
              />
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<NewTab />} />
                  <Route
                    path="/note/:id"
                    element={
                      <NotePage
                        notes={notes}
                        setNotes={setNotes}
                        folders={folders}
                        setFolders={setFolders}
                        updateNoteInList={updateNoteInList}
                      />
                    }
                  />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default MainPage;
