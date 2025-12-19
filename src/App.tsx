import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { MemberDashboard } from "./pages/MemberDashboard";
import { InvestorDashboard } from "./pages/InvestorDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/member" element={<MemberDashboard />} />
      <Route path="/investor" element={<InvestorDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
