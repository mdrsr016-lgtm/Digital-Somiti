import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { MemberDashboard } from "./pages/MemberDashboard";
import { MemberProfile } from "./pages/MemberProfile";
import { InvestorDashboard } from "./pages/InvestorDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { InvestorProfile } from "./pages/InvestorProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/member" element={<MemberDashboard />} />
      <Route path="/member/profile" element={<MemberProfile />} />
      <Route path="/investor" element={<InvestorDashboard />} />
      <Route path="/investor/profile" element={<InvestorProfile />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
