import { Note } from "../../models/note";

export default function NoteItem({
  note,
  onEdit,
  onDelete,
}: {
  note: Note;
  onEdit: () => void;
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

      {/* action button to edit note */}
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded float-right"
        onClick={onEdit}
      >
        ✏️ Edit
      </button>

      <p>{note.content.split("\n").map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}</p>
      <span className="text-sm text-gray-500">{note.date}</span>
    </li>
  );
}
