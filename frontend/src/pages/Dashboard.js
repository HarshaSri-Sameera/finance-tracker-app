import { useEffect, useState } from "react";
import API from "../services/api";
import LoanForm from "../components/LoanForm";
import LoanList from "../components/LoanList";

function Dashboard() {
  const [type, setType] = useState("lent");
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    const res = await API.get(`/loans?type=${type}`);
    setLoans(res.data);
    console.log("Fetching type:", type);
  };

  useEffect(() => {
    fetchLoans();
  }, [type]);

  const totalPrincipal = loans.reduce(
    (sum, loan) => sum + loan.principalAmount,
    0,
  );

  const totalInterest = loans.reduce(
    (sum, loan) => sum + loan.unpaidInterest,
    0,
  );

  const handleOption = (e) => {
    if (e === "lent") {
      setType("lent");
      console.log("Option set to lent");
    } else {
      setType("borrowed");
      console.log("Option set to borrowed");
    }
  };

  return (
    <div>
      <LoanForm refresh={fetchLoans} option={handleOption} />
      <LoanList loans={loans} refresh={fetchLoans} />
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Summary
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-medium text-gray-500 mb-1">
              Total {type === "lent" ? "Given" : "Taken"}
            </p>
            <p className="text-2xl font-bold text-gray-900">
              ₹{totalPrincipal.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-black text-white rounded-2xl p-5 shadow-lg">
            <p className="text-xs font-medium text-gray-400 mb-1">
              Total Interest Due
            </p>
            <p className="text-2xl font-bold">
              ₹{totalInterest.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
      {/* <button onClick={() => setType("lent")}>Given</button>
      <button onClick={() => setType("borrowed")}>Taken</button> */}
    </div>
  );
}

export default Dashboard;
