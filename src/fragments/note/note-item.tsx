import { Note } from "../../models/note";

export default function NoteItem({
  note,
  onDelete
}: {
  note: Note;
  onDelete: () => void;
}) {
  return (
    <li className="border p-2 mb-2 rounded shadow">

      {/* action button to delete note */}
      <button
        className="ml-2 bg-red-500 text-white px-2 py-1 rounded float-right"
        onClick={onDelete}
      >
        🗑️ Delete
      </button>
      <p>{note.content}</p>
      <span className="text-sm text-gray-500">{note.date}</span>
    </li>
  )
}