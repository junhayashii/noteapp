import { useState } from "react";
import { Link } from "react-router-dom";
import AddNoteButton from "./AddNoteButton";
import AddFolderButton from "./AddFolderButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Sidebar.scss";
import {
  deleteFolder,
  updateFolder,
  updateNote,
  fetchNotes,
  fetchFolders,
} from "../services/api";

const Sidebar = ({
  folders,
  notes,
  addNoteToList,
  addFolderToList,
  setFolders,
  setNotes,
  handleDeleteNote,
}) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [isEditing, setIsEditing] = useState(null);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    itemId: null,
    type: null,
  });

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder.id);
    toggleFolder(folder.id);
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders((prevExpanded) => ({
      ...prevExpanded,
      [folderId]: !prevExpanded[folderId],
    }));
  };

  const handleSidebarClick = (e) => {
    if (e.target.closest(".folder, .note")) {
      return;
    }
    setSelectedFolder(null);
    closeContextMenu();
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
    setSelectedFolder(null);
    setContextMenu({ visible: false, x: 0, y: 0, itemId: null, type: null });
  };

  const handleRemoveNote = async (noteId) => {
    await handleDeleteNote(noteId);
    fetchNotesAndFoldersAgain();
    setContextMenu({ visible: false, x: 0, y: 0, itemId: null, type: null });
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
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, itemId: null, type: null });
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
        className="note"
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
      <div key={folder.id} className="folder">
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
            className={`folder-header ${
              selectedFolder === folder.id ? "selected" : ""
            }`}
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
        <AddNoteButton
          addNoteToList={addNoteToList}
          selectedFolder={selectedFolder}
        />
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
          <button onClick={handleRenameClick}>Rename</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
