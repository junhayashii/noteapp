export const fetchNotes = async () => {
  let response = await fetch("http://127.0.0.1:8000/api/notes/");
  return await response.json();
};

export const fetchNote = async (id) => {
  let response = await fetch(`http://127.0.0.1:8000/api/notes/${id}/`);
  return await response.json();
};

export const createNote = async (note) => {
  const response = await fetch(`http://127.0.0.1:8000/api/notes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const updateNote = async (id, note) => {
  await fetch(`http://127.0.0.1:8000/api/notes/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
};

export const deleteNote = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/notes/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the note");
    }
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

export const fetchFolders = async () => {
  const response = await fetch("http://127.0.0.1:8000/api/folders/");
  return await response.json();
};

export const fetchFolder = async (id) => {
  const response = await fetch(`http://127.0.0.1:8000/api/folders/${id}/`);
  return await response.json();
};

export const createFolder = async (folder) => {
  const response = await fetch("http://127.0.0.1:8000/api/folders/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(folder),
  });
  return response.json();
};

export const updateFolder = async (id, folder) => {
  await fetch(`http://127.0.0.1:8000/api/folders/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(folder),
  });
};

export const deleteFolder = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/folders/${id}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the folder");
    }
  } catch (error) {
    console.error("Error deleting folder:", error);
  }
};
