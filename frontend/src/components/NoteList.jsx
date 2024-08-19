import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ note }) => {
  return (
    <Link to={`/note/${note.id}`}>
      <h1>{note.title}</h1>
    </Link>
  );
};

export default ListItem;
