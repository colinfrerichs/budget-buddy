import { useEffect, useState } from "react"

const STORAGE_KEY = "budget";

export const useBudget = () => {
    const [ budget, setBudget ] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(budget));
    }, [budget]);
}