export interface Transaction {
  id: string;
  member_id: string;
  type: "contribution" | "loan_payment" | "withdrawal" | "deposit";
  amount: number;
  description: string;
  status: "pending" | "completed" | "failed";
  created_at: string;
}

export interface Loan {
  id: string;
  member_id: string;
  amount: number;
  remaining_amount: number;
  monthly_payment: number;
  interest_rate: number;
  start_date: string;
  end_date: string;
  status: "active" | "completed" | "defaulted";
  created_at: string;
}

export interface Savings {
  id: string;
  member_id: string;
  balance: number;
  monthly_contribution: number;
  last_updated: string;
}

export interface MemberProfile {
  id: string;
  username: string;
  full_name: string;
  email: string;
  role: string;
  member_since: string;
  status: "active" | "inactive" | "suspended";
  tier: "standard" | "premium" | "gold";
  avatar_url?: string;
}

export interface FinancialSummary {
  total_contributions: number;
  active_loans_total: number;
  savings_balance: number;
  monthly_growth: number;
  contribution_streak: number;
}
