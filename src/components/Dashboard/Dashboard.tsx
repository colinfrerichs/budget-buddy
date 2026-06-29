import IncomeSummaryCard from "../IncomeSummaryCard/IncomeSummarCard";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="summary-container">
        <div>
          <IncomeSummaryCard />
        </div>
      </div>
      <div className="transactions-container"></div>
    </div>
  );
};

export default Dashboard;
