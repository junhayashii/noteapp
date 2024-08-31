import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddNoteButton from "./AddNoteButton";
import AddFolderButton from "./AddFolderButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/Sidebar.scss";
import {
  deleteFolder,
  updateFolder,
  updateNote,
  fetchNotes,
  fetchFolders,
  createNote,
} from "../services/api";
import Logout from "./Logout";

const Sidebar = ({
  folders,
  notes,
  addNoteToList,
  addFolderToList,
  setFolders,
  setNotes,
  handleDeleteNote,
}) => {
  const [expandedFolders, setExpandedFolders] = useState({});
  const [isEditing, setIsEditing] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    itemId: null,
    type: null,
  });

  const [configMenuVisible, setConfigMenuVisible] = useState(false);

  const location = useLocation();
  const currentNoteId = location.pathname.split("/").pop();
  const navigate = useNavigate();

  const handleFolderClick = (folder) => {
    toggleFolder(folder.id);
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders((prevExpanded) => ({
      ...prevExpanded,
      [folderId]: !prevExpanded[folderId],
    }));
  };

  const handleAddNoteToFolder = async (folderId) => {
    const newNote = { title: "", body: "", folder: folderId };
    const createdNote = await createNote(newNote);
    addNoteToList(createdNote);
    navigate(`/note/${createdNote.id}?new=true`);
    closeContextMenu();
  };

  const handleSidebarClick = (e) => {
    if (e.target.closest(".folder, .note")) {
      return;
    }
    closeContextMenu();
    setSelectedItem(null);
  };

  const handleEditFolder = async (folderId, newName) => {
    await updateFolder(folderId, { name: newName });
    fetchNotesAndFoldersAgain();
    setIsEditing(null);
  };

  const handleEditNote = async (noteId, newName) => {
    await updateNote(noteId, { title: newName });
    fetchNotesAndFoldersAgain();
    setIsEditing(null);
  };

  const handleDeleteFolder = async (folderId) => {
    await deleteFolder(folderId);
    fetchNotesAndFoldersAgain();
    setContextMenu({ visible: false, x: 0, y: 0, itemId: null, type: null });
    setSelectedItem(null);
  };

  const handleRemoveNote = async (noteId) => {
    await handleDeleteNote(noteId);
    fetchNotesAndFoldersAgain();
    setContextMenu({ visible: false, x: 0, y: 0, itemId: null, type: null });
    setSelectedItem(null);
  };

  const handleContextMenu = (event, itemId, type) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      itemId,
      type,
    });
    setSelectedItem(itemId);
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, itemId: null, type: null });
    setSelectedItem(null);
  };

  const handleRenameClick = () => {
    setIsEditing(contextMenu.itemId);
    closeContextMenu();
  };

  const handleDeleteClick = () => {
    if (contextMenu.type === "folder") {
      handleDeleteFolder(contextMenu.itemId);
    } else if (contextMenu.type === "note") {
      handleRemoveNote(contextMenu.itemId);
    }
  };

  const handleAddNoteClick = () => {
    if (contextMenu.type === "folder") {
      handleAddNoteToFolder(contextMenu.itemId);
    }
  };

  const handleKeyDown = (e, id, type) => {
    if (e.key === "Enter") {
      if (type === "folder") {
        handleEditFolder(id, e.target.value);
      } else if (type === "note") {
        handleEditNote(id, e.target.value);
      }
    }
  };

  const fetchNotesAndFoldersAgain = async () => {
    const notesData = await fetchNotes();
    const foldersData = await fetchFolders();
    setNotes(notesData);
    setFolders(foldersData);
  };

  const renderNotes = (notes) => {
    return notes.map((note) => (
      <div
        key={note.id}
        className={`note ${
          note.id.toString() === currentNoteId ? "opened" : ""
        } ${selectedItem === note.id ? "selected" : ""}`}
        onContextMenu={(e) => handleContextMenu(e, note.id, "note")}
      >
        {isEditing === note.id ? (
          <input
            type="text"
            defaultValue={note.title}
            onBlur={(e) => handleEditNote(note.id, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, note.id, "note")}
            autoFocus
          />
        ) : (
          <Link to={`/note/${note.id}`} className="note-link">
            <h1 className="note-title">{note.title}</h1>
          </Link>
        )}
      </div>
    ));
  };

  const renderFolders = (folders) => {
    return folders.map((folder) => (
      <div
        key={folder.id}
        className={`folder ${selectedItem === folder.id ? "selected" : ""}`}
      >
        {isEditing === folder.id ? (
          <input
            type="text"
            defaultValue={folder.name}
            onBlur={(e) => handleEditFolder(folder.id, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, folder.id, "folder")}
            autoFocus
          />
        ) : (
          <div
            className="folder-header"
            onClick={() => handleFolderClick(folder)}
            onContextMenu={(e) => handleContextMenu(e, folder.id, "folder")}
          >
            <FontAwesomeIcon
              icon={expandedFolders[folder.id] ? faChevronDown : faChevronRight}
              className="toggle-icon"
            />
            <h1 className="folder-title">{folder.name}</h1>
          </div>
        )}
        {expandedFolders[folder.id] && (
          <div className="folder-content">{renderNotes(folder.notes)}</div>
        )}
      </div>
    ));
  };

  const rootNotes = notes.filter((note) => !note.folder);

  return (
    <aside className="sidebar" onClick={handleSidebarClick}>
      {/* Action buttons */}
      <div className="action-buttons">
        <AddNoteButton addNoteToList={addNoteToList} />
        <AddFolderButton addFolderToList={addFolderToList} />
      </div>

      {/* Folder Notes */}
      <div className="folders-container">{renderFolders(folders)}</div>
      <div className="root-notes-container">{renderNotes(rootNotes)}</div>

      {/* Context Menu */}
      {contextMenu.visible && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button onClick={handleAddNoteClick}>Add Note</button>
          <button onClick={handleRenameClick}>Rename</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}

      {/* Configuration */}
      <button
        className="configuration-button"
        onClick={() => setConfigMenuVisible(!configMenuVisible)}
      >
        <FontAwesomeIcon icon={faGear} />
      </button>
      {configMenuVisible && (
        <div className="config-menu" style={{ bottom: 45, right: 25 }}>
          <Logout />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
