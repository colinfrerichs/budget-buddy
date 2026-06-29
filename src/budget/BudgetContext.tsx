import { v4 as uuidv4 } from "uuid";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";

import { budgetReducer, initialState } from "./budgetReducer";
import {
  type IncomeStream,
  type Debt,
  type Transaction,
  type BudgetState,
} from "./budgetTypes";

const STORAGE_KEY = "budget";

interface BudgetContextValue extends BudgetState {
  addIncome: (income: Omit<IncomeStream, "id">) => void;
  deleteIncome: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  totalIncome: number;
  totalExpenses: number;
}

const BudgetContext = createContext<BudgetContextValue | null>(null);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addIncome = useCallback((income: Omit<IncomeStream, "id">) => {
    dispatch({ type: "ADD_INCOME", payload: { ...income, id: uuidv4() } });
  }, []);

  const deleteIncome = useCallback((id: string) => {
    dispatch({ type: "DELETE_INCOME", payload: id });
  }, []);

  const editIncome = useCallback((income: IncomeStream) => {
    dispatch({ type: "EDIT_INCOME", payload: income });
  }, []);

  const addTransaction = useCallback((transaction: Omit<Transaction, "id">) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: { ...transaction, id: uuidv4() },
    });
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  }, []);

  const editTransaction = useCallback((transaction: Transaction) => {
    dispatch({ type: "EDIT_TRANSACTION", payload: transaction });
  }, []);

  const addDebt = useCallback((debt: Omit<Debt, "id">) => {
    dispatch({ type: "ADD_DEBT", payload: { ...debt, id: uuidv4() } });
  }, []);

  const deleteDebt = useCallback((id: string) => {
    dispatch({ type: "DELETE_DEBT", payload: id });
  }, []);

  const editDebt = useCallback((debt: Debt) => {
    dispatch({ type: "EDIT_DEBT", payload: debt });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      addIncome,
      deleteIncome,
      editIncome,
      addTransaction,
      deleteTransaction,
      editTransaction,
      addDebt,
      deleteDebt,
      editDebt,
    }),
    [
      state,
      addIncome,
      deleteIncome,
      editIncome,
      addTransaction,
      deleteTransaction,
      editTransaction,
      addDebt,
      deleteDebt,
      editDebt,
    ],
  );

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const ctx = useContext(BudgetContext);
  if (!ctx) {
    throw new Error("useBudget must be used within BudgetProvider");
  }

  return ctx;
};
