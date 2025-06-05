export default function NoteForm({
  note,
  onChange,
  onSave,
}: {
  note: { content: string };
  onChange: (note: { content: string }) => void;
  onSave: () => void;
}) {

  return (
    <div className="mb-4">
      <textarea
        className="border p-2 w-full"
        placeholder="Content"
        value={note.content}
        onChange={(e) => onChange({ ...note, content: e.target.value })}
      />
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={onSave}
      >
        ➕ Add Note
      </button>
    </div>)
}