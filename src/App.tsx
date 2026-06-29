import { BudgetProvider } from "./budget/BudgetContext";

import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";

function App() {
  return (
    <BudgetProvider>
      <Dashboard />
    </BudgetProvider>
  );
}

export default App;
