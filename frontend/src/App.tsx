import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import BugReportPage from "./pages/BugReportPage";
import TestCasePage from "./pages/TestCasePage";
import ChecklistPage from "./pages/ChecklistPage";
import InterviewPage from "./pages/InterviewPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="bug-report-generator" element={<BugReportPage />} />
        <Route path="test-case-generator" element={<TestCasePage />} />
        <Route path="checklist-library" element={<ChecklistPage />} />
        <Route path="interview-trainer" element={<InterviewPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
