import axios from "axios";
import { Note } from "../models/note";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const NoteService = {
  async getNotes(): Promise<Note[]> {
    const response = await axios.get(`${BASE_URL}/notes`);
    return response.data.notes;
  },

  async createNote(note: Note): Promise<void> {
    await axios.post(`${BASE_URL}/notes`, { note });
  },

  async updateNote(note: Note): Promise<void> {
    await axios.put(`${BASE_URL}/notes/${note.id}`, { note });
  },

  async deleteNote(noteId: number): Promise<void> {
    await axios.delete(`${BASE_URL}/notes/${noteId}`);
  },
};
