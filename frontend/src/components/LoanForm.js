import { useState } from "react";
import API from "../services/api";

const initialState = {
  personName: "",
  principalAmount: "",
  interestPerMonth: "",
  lendDate: "",
  type: "lent",
  notes: "",
};

function LoanForm({ refresh, option }) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await API.post("/loans/add", form);
      setForm(initialState);

      refresh();
    } catch (error) {
      setError("Failed to add loan. Please add all the inputs and try again!");
    }
  };

  option(form.type); // Pass the selected option to the parent component

  return (
    <div className="pt-20">
      <div className="flex bg-gray-100 p-1 rounded-xl mb-6 w-full max-w-xs mx-auto">
        <button
          type="button"
          onClick={() => setForm({ ...form, type: "lent" })}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            form.type === "lent"
              ? "bg-white text-black shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Given
        </button>

        <button
          type="button"
          onClick={() => setForm({ ...form, type: "borrowed" })}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            form.type === "borrowed"
              ? "bg-white text-black shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Taken
        </button>
      </div>
      <div className=" p-3 border rounded-xl">
        <input
          value={form.personName}
          style={{ padding: "10px", margin: "5px", width: "90%" }}
          placeholder="Name"
          type="text"
          onChange={(e) => setForm({ ...form, personName: e.target.value })}
        />

        <input
          value={form.principalAmount}
          style={{ padding: "10px", margin: "5px", width: "90%" }}
          placeholder="Principal Amount"
          type="number"
          onChange={(e) =>
            setForm({ ...form, principalAmount: e.target.value })
          }
        />

        <input
          value={form.interestPerMonth}
          style={{ padding: "10px", margin: "5px", width: "90%" }}
          placeholder="Monthly Interest %"
          type="number"
          onChange={(e) =>
            setForm({ ...form, interestPerMonth: e.target.value })
          }
        />

        <input
          value={form.lendDate}
          style={{
            padding: "10px",
            margin: "5px",
            width: "90%",
            color: form.lendDate ? "black" : "gray",
          }}
          placeholder="Lend date"
          type="date"
          onChange={(e) => setForm({ ...form, lendDate: e.target.value })}
        />

        <input
          value={form.notes}
          style={{ padding: "10px", margin: "5px", width: "90%" }}
          placeholder="Any note..."
          type="text"
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <br />

        <button
          style={{ padding: "10px", margin: "5px" }}
          onClick={handleSubmit}
          className="text-xs font-semibold rounded-md transition-all shadow-sm bg-black text-white hover:!bg-white hover:!text-black justify-center flex items-center w-40 max-w-xs mx-auto"
        >
          Add
        </button>
        {error && <p className="text-red-500 mb-2">{error}</p>}
      </div>
    </div>
  );
}

export default LoanForm;
