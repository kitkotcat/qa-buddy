import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./components/Layout";
import OnboardingGate from "./components/OnboardingGate";
import HomePage from "./pages/HomePage";
import BugReportPage from "./pages/BugReportPage";
import TestCasePage from "./pages/TestCasePage";
import ChecklistPage from "./pages/ChecklistPage";
import InterviewPage from "./pages/InterviewPage";
import QuizPage from "./pages/QuizPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";

function App() {
  return (
    <OnboardingGate>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/bug-reports"
            element={<BugReportPage />}
          />
          <Route
            path="/bug-report-generator"
            element={
              <Navigate
                to="/bug-reports"
                replace
              />
            }
          />

          <Route
            path="/test-cases"
            element={<TestCasePage />}
          />
          <Route
            path="/test-case-generator"
            element={
              <Navigate
                to="/test-cases"
                replace
              />
            }
          />

          <Route
            path="/checklists"
            element={<ChecklistPage />}
          />
          <Route
            path="/checklist-library"
            element={
              <Navigate
                to="/checklists"
                replace
              />
            }
          />

          <Route
            path="/interview"
            element={<InterviewPage />}
          />
          <Route
            path="/interview-trainer"
            element={
              <Navigate
                to="/interview"
                replace
              />
            }
          />

          <Route
            path="/quiz"
            element={<QuizPage />}
          />

          <Route
            path="/about"
            element={<AboutPage />}
          />

          <Route
            path="/privacy"
            element={<PrivacyPage />}
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Route>
      </Routes>
    </OnboardingGate>
  );
}

export default App;
