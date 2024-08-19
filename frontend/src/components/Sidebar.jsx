import React, { useEffect } from "react";
import ListItem from "./NoteList";
import Addbutton from "./Addbutton";

const Sidebar = ({ notes, addNoteToList }) => {
  return (
    <div key={notes.length}>
      <div className="notes">
        {notes.map((note) => (
          <ListItem key={note.id} note={note} />
        ))}
      </div>
      <Addbutton addNoteToList={addNoteToList} />
    </div>
  );
};

export default Sidebar;
