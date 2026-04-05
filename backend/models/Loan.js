const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    personName: {
      type: String,
      required: true,
    },

    principalAmount: {
      type: Number,
      required: true,
    },

    interestPerMonth: {
      type: Number,
      required: true,
    },

    lendDate: {
      type: Date,
      required: true,
    },

    monthsPaid: {
      type: Number,
      default: 0,
    },

    type: {
      type: String,
      enum: ["lent", "borrowed"],
      default: "lent",
    },

    notes: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Loan", loanSchema);
