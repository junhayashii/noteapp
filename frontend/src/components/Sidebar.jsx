import { Link } from "react-router-dom";
import Addbutton from "./Addbutton";
import "../styles/Sidebar.scss";

const Sidebar = ({ notes, addNoteToList }) => {
  return (
    <aside className="sidebar">
      <div className="add-button">
        <Addbutton addNoteToList={addNoteToList} />
      </div>
      <div className="notes">
        {notes.map((note) => (
          <Link to={`/note/${note.id}`} key={note.id} className="note-item">
            <h1>{note.title}</h1>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
