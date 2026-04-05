const express = require("express");
const router = express.Router();

const Loan = require("../models/Loan");
const LoanHistory = require("../models/LoanHistory");

const protect = require("../middleware/authMiddleware");

// calculation
function calculateLoanDetails(loan) {
  const today = new Date();
  const lendDate = new Date(loan.lendDate);

  const monthsPassed =
    (today.getFullYear() - lendDate.getFullYear()) * 12 +
    (today.getMonth() - lendDate.getMonth());

  const monthsUnpaid = Math.max(0, monthsPassed - loan.monthsPaid);

  const monthlyInterest = (loan.principalAmount * loan.interestPerMonth) / 100;

  const unpaidInterest = monthlyInterest * monthsUnpaid;

  return {
    monthsPassed,
    monthsUnpaid,
    unpaidInterest,
  };
}

// routes
// add loan
router.post("/add", protect, async (req, res) => {
  try {
    const loan = new Loan({
      ...req.body,
      userId: req.user.id,
    });

    await loan.save();
    res.json(loan);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get loans
router.get("/", protect, async (req, res) => {
  const { type } = req.query;
  const loans = await Loan.find({
    status: "active",
    type: type || "lent",
    userId: req.user.id,
  });

  const result = loans.map((loan) => {
    const calc = calculateLoanDetails(loan);

    return {
      ...loan._doc,
      monthsUnpaid: calc.monthsUnpaid,
      unpaidInterest: calc.unpaidInterest,
    };
  });

  res.json(result);
});

// Delete loan
router.delete("/:id", protect, async (req, res) => {
  await Loan.findByIdAndDelete(req.params.id);

  res.json({ message: "Loan deleted" });
});

// Close loan
router.post("/close/:id", protect, async (req, res) => {
  const loan = await Loan.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!loan) {
    return res.status(404).json({ message: "Loan not found" });
  }

  const calc = calculateLoanDetails(loan);

  const monthlyInterest = (loan.principalAmount * loan.interestPerMonth) / 100;

  const interestPaidTotal = monthlyInterest * loan.monthsPaid;

  const history = new LoanHistory({
    userId: loan.userId,
    personName: loan.personName,
    principalAmount: loan.principalAmount,
    interestPaidTotal,
    interestUnpaidTotal: calc.unpaidInterest,
    lendDate: loan.lendDate,
    closingDate: new Date(),
    notes: loan.notes,
    type: loan.type,
  });

  await history.save();

  await Loan.findByIdAndDelete(req.params.id);

  res.json({ message: "Loan closed" });
});

// History
router.get("/history", protect, async (req, res) => {
  try {
    const { search, type } = req.query;

    let query = {};
    // only search if valid
    if (search && search.trim() !== "") {
      query.personName = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    if (type && type !== "all") {
      query.type = type;
    }

    const history = await LoanHistory.find({
      ...query,
      userId: req.user.id,
    }).sort({ closingDate: -1 });

    res.json(history);
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update/:id", protect, async (req, res) => {
  const { monthsPaid } = req.body;

  const loan = await Loan.findById(req.params.id);
  loan.monthsPaid = monthsPaid;
  await loan.save();
  res.json(loan);
});

// router.get("/test", (req, res) => {
//   res.send("Test route working");
// });

module.exports = router;
