import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import NotePage from "../components/NotePage";
import NewTab from "../components/NewTab";
import { fetchNotes } from "../services/api";
import Logout from "../components/Logout";
import "../styles/MainPage.scss";

const MainPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      let data = await fetchNotes();
      setNotes(data);
    };
    getNotes();
  }, []);

  const updateNoteInList = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const addNoteToList = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const removeNoteFromList = (noteId) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== noteId);
      return updatedNotes;
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="*"
          element={
            <div className="app-container">
              <Sidebar notes={notes} addNoteToList={addNoteToList} />
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<NewTab />} />
                  <Route
                    path="/note/:id"
                    element={
                      <NotePage
                        notes={notes}
                        setNotes={setNotes}
                        updateNoteInList={updateNoteInList}
                        removeNoteFromList={removeNoteFromList}
                      />
                    }
                  />
                </Routes>
              </div>
              {/* <Logout /> */}
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default MainPage;
