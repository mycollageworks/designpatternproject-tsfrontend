import { useEffect, useState } from "react";

export default function NoteSearch({
  refresh
}: {
  refresh: (searchTerm?: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter notes based on search term
  useEffect(() => {
    refresh(debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div className="mb-4">
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
