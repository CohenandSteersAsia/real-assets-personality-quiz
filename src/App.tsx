import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import { LandingPage } from "./pages/LandingPage";
import { QuizPage } from "./pages/QuizPage";
import { ResultPage } from "./pages/ResultPage";
import { ComponentsPreviewPage } from "./pages/dev/ComponentsPreviewPage";
import { ResultsPreviewPage } from "./pages/dev/ResultsPreviewPage";
import "./styles/app.css";

export default function App() {
  return (
    <HashRouter>
      <QuizProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result/:id" element={<ResultPage />} />
          {import.meta.env.DEV && (
            <>
              <Route path="/dev/results" element={<ResultsPreviewPage />} />
              <Route
                path="/dev/components"
                element={<ComponentsPreviewPage />}
              />
            </>
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </QuizProvider>
    </HashRouter>
  );
}
