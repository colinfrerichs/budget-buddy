import { type BudgetState, type Transaction, type Debt, type IncomeStream } from "./budgetTypes";

export const initialState: BudgetState = {
    incomeStreams: [],
    transactions: [],
    debts: [],
};

export type BudgetAction =
    | {
        type: "ADD_TRANSACTION",
        payload: Transaction,
      }
    | {
        type: "DELETE_TRANSACTION",
        payload: string;
      }
    | {
        type: "EDIT_TRANSACTION",
        payload: Transaction,
      }
    | {
        type: "ADD_INCOME",
        payload: IncomeStream,
      }
    | {
        type: "DELETE_INCOME",
        payload: string,
    }
    | {
        type: "EDIT_INCOME",
        payload: IncomeStream,
      }
    | {
        type: "ADD_DEBT",
        payload: Debt,
      }
    | {
        type: "DELETE_DEBT",
        payload: string,
    }
    | {
        type: "EDIT_DEBT",
        payload: Debt,
    };

export const budgetReducer = (
    state: BudgetState,
    action: BudgetAction,
): BudgetState => {
    switch(action.type) {
        case "ADD_TRANSACTION":
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
            }
        case "DELETE_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.filter(
                    transaction => transaction.id !== action.payload
                ),
            }
        case "EDIT_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.map(
                    transaction => transaction.id === action.payload.id ? action.payload : transaction
                ),
            }
        case "ADD_INCOME":
            return {
                ...state,
                incomeStreams: [ ...state.incomeStreams, action.payload ],
            }
        
        case "DELETE_INCOME":
            return {
                ...state,
                incomeStreams: state.incomeStreams.filter(
                    income => income.id !== action.payload
                ),
            }
        case "EDIT_INCOME":
            return {
                ...state,
                incomeStreams: state.incomeStreams.map(
                    incomeStream => incomeStream.id === action.payload.id ? action.payload : incomeStream
                ),
            }
        case "ADD_DEBT":
            return {
                ...state,
                debts: [...state.debts, action.payload],
            }
        case "DELETE_DEBT":
            return {
                ...state,
                debts: state.debts.filter(debt => debt.id !== action.payload),
            }
        case "EDIT_DEBT":
            return {
                ...state,
                debts: state.debts.map(
                    debt => debt.id === action.payload.id ? action.payload : debt
                ),
            }
        default:
            return state;
    }
}
