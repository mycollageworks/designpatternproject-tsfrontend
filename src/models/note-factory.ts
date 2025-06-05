import { Note } from "./note";

export class NoteFactory {
  static create(content: string): Note {
    return {
      content,
      // format yyyy-mm-dd
      date: new Date().toISOString().split("T")[0], // Extract only the date part
      id: undefined, // ID will be assigned by the backend
    };
  }
}
