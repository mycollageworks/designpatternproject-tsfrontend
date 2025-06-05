import { NoteProvider } from "./contexts/note-context";
import NotesPage from "./pages/note-page";

function App() {
  return (
    <NoteProvider>
      <NotesPage />
    </NoteProvider>
  );
}

export default App;
