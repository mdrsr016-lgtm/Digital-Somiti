import { useNavigate } from "react-router-dom";

export const InvestorDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Investor Dashboard</h1>
        <p className="text-gray-500">UI cleared for rebuild.</p>
      </div>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Log Out
      </button>
    </div>
  );
};
