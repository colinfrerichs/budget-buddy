import { useEffect, useMemo, useReducer } from "react"

import { budgetReducer, initialState } from "./budgetReducer";
import { type IncomeStream } from "./budgetTypes";

const STORAGE_KEY = "budget";

export const useBudget = () => {
    const [ state, dispatch ] = useReducer(budgetReducer, initialState);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const addIncome = (income: IncomeStream) => {
        dispatch({
            type: "ADD_INCOME",
            payload: income
        })
    }

    return {
        ...state,
        addIncome,
    }
}