import React, { useEffect, useState } from "react";
import { useNotes } from "../contexts/note-context";
import { NoteFactory } from "../models/note-factory";
import { NoteService } from "../services/note-service";
import NoteForm from "../fragments/note/note-form";
import { Note } from "../models/note";
import NoteItem from "../fragments/note/note-item";
import NoteSearch from "../fragments/note/note-search";

const NotesPage: React.FC = () => {
  const { notes, refresh } = useNotes();
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [note, setNote] = useState<{
    content: string;
  }>({
    content: "",
  });

  const handleResetForm = () => {
    setUpdateId(null);
    setNote({
      content: "",
    });
  };

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
    handleResetForm();
  };

  const handleUpdate = async (id: number, content: string) => {
    if (!id || !content) {
      alert("Invalid note ID or content");
      return;
    }

    const existingNote = notes.find((n) => n.id === updateId);
    if (!existingNote) {
      alert("Note not found for update");
      return;
    }
    const updatedNote: Note = {
      ...existingNote,
      content,
    };
    try {
      await NoteService.updateNote(updatedNote);
    } catch (error) {
      console.error("Failed to update note", error);
      alert("Failed to update note. Please try again.");
      return;
    }

    refresh();
    handleResetForm();
  };

  const handleSave = async () => {
    const { content } = note;
    if (!content) {
      alert("Content cannot be empty");
      return;
    }
    if (updateId) {
      await handleUpdate(updateId, content);
    } else {
      await handleAdd();
    }
  };

  const handleEdit = async (id: number) => {
    if (!id) {
      alert("Invalid note ID");
      return;
    }
    const existingNote = notes.find((n) => n.id === id);
    if (!existingNote) {
      alert("Note not found");
      return;
    }
    setUpdateId(id);
    setNote({
      content: existingNote.content,
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
        updateId={updateId}
        onChange={(updatedNote) => setNote(updatedNote)}
        onSave={handleSave}
        onReset={handleResetForm}
      />

      {/* note search */}
      <NoteSearch refresh={refresh} />

      <div className="mt-6 border-gray-300 border-t-2 pt-4">
        <ul>
          {notes.map((note, idx) => (
            <NoteItem
              note={note}
              onEdit={() => handleEdit(note.id as number)}
              onDelete={() => handleDelete(note.id as number)}
              key={idx}
            />
          ))}
          {notes.length === 0 && (
            <li className="text-gray-500">
              No notes available. Please add a note.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotesPage;
