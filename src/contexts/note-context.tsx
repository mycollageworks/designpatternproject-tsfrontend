import React, { createContext, useContext, useEffect, useState } from "react";
import { Note } from "../models/note";
import { NoteService } from "../services/note-service";

interface NoteContextType {
  notes: Note[];
  refresh: (searchTerm?: string) => void;
}

const NoteContext = createContext<NoteContextType>({
  notes: [],
  refresh: (searchTerm?: string) => {},
});

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const load = async (searchTerm?: string) => {
    try {
      const data = await NoteService.getNotes(searchTerm);
      setNotes(data);
    } catch (e) {
      console.error("Failed to load notes", e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <NoteContext.Provider value={{ notes, refresh: load }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);
