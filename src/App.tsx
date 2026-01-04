import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PromptSelector } from "./pages/PromptSelector";
import { WritingPage } from "./pages/WritingPage";
import { StyleGuide } from "./pages/StyleGuide";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PromptSelector />} />
        <Route path="/write/:essayId" element={<WritingPage />} />
        <Route path="/style-guide" element={<StyleGuide />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
