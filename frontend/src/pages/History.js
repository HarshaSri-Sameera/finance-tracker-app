import { useEffect, useState } from "react";
import API from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await API.get(
        `/loans/history?search=${debouncedSearch}&type=${type}`,
      );
      setHistory(res.data);
    };

    fetchHistory();
  }, [debouncedSearch, type]);

  return (
    <div className="p-6 pt-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Closed Loans</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              🔍
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all bg-white shadow-sm"
              placeholder="Search by name..."
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-black outline-none text-gray-600 font-medium"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="lent">Given</option>
            <option value="borrowed">Taken</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-bold text-gray-900">
                👤 {item.personName}
              </h4>
              <span
                className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full ${
                  item.type === "lent"
                    ? "bg-green-50 text-green-600"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                {item.type === "lent" ? "Given" : "Taken"}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Principal:</span>
                <span className="font-semibold text-gray-900">
                  ₹{item.principalAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Interest Paid:</span>
                <span className="font-medium">
                  ₹{item.interestPaidTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-gray-400 line-through">
                <span>Unpaid Interest:</span>
                <span>₹{item.interestUnpaidTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50 text-[11px] text-gray-400 space-y-1">
              <p>📅 Start: {new Date(item.lendDate).toDateString()}</p>
              <p className="text-gray-600 font-medium">
                ✅ Closed: {new Date(item.closingDate).toDateString()}
              </p>
            </div>

            {item.notes && (
              <div className="mt-3 p-2 bg-gray-50 rounded-lg text-xs text-gray-500 italic">
                📋 {item.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
