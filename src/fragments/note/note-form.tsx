export default function NoteForm({
  note,
  updateId,
  onChange,
  onSave,
  onReset,
}: {
  note: { content: string };
  updateId: number | null;
  onChange: (note: { content: string }) => void;
  onSave: () => void;
  onReset: () => void;
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
        {updateId ? "📝 Update Note" : "➕ Add Note"}
      </button>

      {/* reset */}
      <button
        className="mt-2 ml-2 bg-gray-300 text-black px-4 py-2 rounded"
        onClick={onReset}
      >
        🔄 Reset
      </button>
    </div>
  );
}
