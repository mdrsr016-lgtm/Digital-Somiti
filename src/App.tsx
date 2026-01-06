import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { MemberPage } from "./pages/MemberPage/MemberPage";
import { Dashboard } from "./pages/Member/Dashboard";
import { Transactions } from "./pages/Member/Transactions";
import { Loan } from "./pages/Member/Loan";
import { Profile } from "./pages/Member/Profile";
import { Settings } from "./pages/Member/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/member" element={<MemberPage />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="loan" element={<Loan />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
