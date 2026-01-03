import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PromptSelector } from "./pages/PromptSelector";
import { WritingPage } from "./pages/WritingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PromptSelector />} />
        <Route path="/write/:essayId" element={<WritingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
