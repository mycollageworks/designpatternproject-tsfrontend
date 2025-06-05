import React, { useState } from "react";
import { useNotes } from "../contexts/note-context";
import { NoteFactory } from "../models/note-factory";
import { NoteService } from "../services/note-service";
import NoteForm from "../fragments/note/note-form";
import { Note } from "../models/note";
import NoteItem from "../fragments/note/note-item";

const NotesPage: React.FC = () => {
  const { notes, refresh } = useNotes();
  const [note, setNote] = useState<{
    content: string;
  }>({
    content: "",
  });

  const handleAdd = async () => {
    const { content } = note;
    if (!content) {
      alert("Content cannot be empty");
      return;
    }

    const newNote: Note = NoteFactory.create(content);
    try {
      await NoteService.createNote(newNote);
    } catch (error) {
      console.error("Failed to add note", error);
      alert("Failed to add note. Please try again.");
      return;
    }

    refresh();
    setNote({
      content: "",
    });
  };

  const handleDelete = async (id: number) => {
    if (!id) {
      alert("Invalid note ID");
      return;
    }

    try {
      await NoteService.deleteNote(id);
      refresh();
    } catch (error) {
      console.error("Failed to delete note", error);
      alert("Failed to delete note. Please try again.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">📝 Note Manager</h1>

      <NoteForm
        note={note}
        onChange={(updatedNote) => setNote(updatedNote)}
        onSave={handleAdd}
      />

      <div className="mt-6 border-gray-300 border-t-2 pt-4">
        <ul>
          {notes.map((note, idx) => (
            <NoteItem
              note={note}
              onDelete={() => handleDelete(note.id as number)}
              key={idx}
            />
          ))}
          {notes.length === 0 && (
            <li className="text-gray-500">No notes available. Please add a note.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotesPage;