export interface IncomeStream {
    id: string;
    name: string;
    amount: number;
    frequency: "weekly" | "biweekly" | "monthly";
}

export interface Transaction {
    id: string;
    title: string;
    amount: string;
    type: "income" | "expense";
    date: string;
}

export interface Debt {
    id: string;
    name: string;
    balance: number;
}

export interface BudgetState {
    incomeStreams: IncomeStream[];
    transactions: Transaction[];
    debts: Debt[];
}
