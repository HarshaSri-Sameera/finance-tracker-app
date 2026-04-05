import API from "../services/api";

function LoanList({ loans, refresh }) {
  const deleteLoan = async (id) => {
    await API.delete(`/loans/${id}`);
    refresh();
  };

  const closeLoan = async (id) => {
    await API.post(`/loans/close/${id}`);
    refresh();
  };

  const updateLoan = async (id) => {
    const monthsPaid = prompt("Enter months paid: ");

    if (monthsPaid === null) return;
    await API.put(`/loans/update/${id}`, { monthsPaid });
    refresh();
  };

  return (
    <div className="p-4 pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loans.map((loan) => (
          <div
            key={loan._id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold border-b pb-2 mb-4">
                👤 {loan.personName}
              </h3>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold text-gray-900">
                    Principal:
                  </span>{" "}
                  ₹{loan.principalAmount.toLocaleString("en-IN")}
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Interest:</span>{" "}
                  {loan.interestPerMonth}%
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Unpaid:</span>{" "}
                  {loan.monthsUnpaid} months
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Date:</span>{" "}
                  {new Date(loan.lendDate).toLocaleDateString()}
                </p>
                <p className="font-medium">
                  <span className="font-semibold text-gray-900">Due:</span> ₹
                  {loan.unpaidInterest.toLocaleString("en-IN")}
                </p>
                <p className="italic text-gray-500">📋 Notes: {loan.notes}</p>
              </div>
            </div>

            {/* Buttons at the bottom */}
            <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t">
              <button
                onClick={() => updateLoan(loan._id)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs py-2 rounded font-semibold transition"
              >
                Update
              </button>
              <button
                onClick={() => closeLoan(loan._id)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs py-2 rounded font-semibold transition"
              >
                Close
              </button>
              <button
                onClick={() => deleteLoan(loan._id)}
                className="px-3 bg-red-50 text-red-600 hover:bg-red-100 text-xs py-2 rounded font-semibold transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoanList;
