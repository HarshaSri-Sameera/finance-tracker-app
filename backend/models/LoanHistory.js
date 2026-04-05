const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  personName: String,
  principalAmount: Number,
  interestPaidTotal: Number,
  interestUnpaidTotal: Number,
  lendDate: Date,
  closingDate: Date,
  notes: String,
  type: String,
});

module.exports = mongoose.model("LoanHistory", historySchema);
