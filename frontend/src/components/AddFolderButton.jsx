import React, { useState } from "react";
import { createFolder } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/ActionButton.scss";

const AddFolderButton = ({ addFolderToList }) => {
  const handleCreateFolder = async () => {
    const newFolder = await createFolder({ name: "" });
    addFolderToList(newFolder);
  };

  return (
    <button className="add-folder-button" onClick={handleCreateFolder}>
      <FontAwesomeIcon icon={faFolderPlus} className="icon" />
    </button>
  );
};

export default AddFolderButton;
