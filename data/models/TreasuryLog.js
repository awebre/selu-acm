import mongoose, { Schema } from "mongoose";
import Big from "big.js";

const TransactionSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  date: { type: Date, required: true },
  amount: { type: Schema.Types.Decimal128, required: true },
  description: { type: String, required: true },
});

const TreasuryLogSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  year: { type: Number, required: true },
  transactions: [TransactionSchema],
});

TreasuryLogSchema.methods.getBalance = function () {
  const now = new Date();
  return this.transactions.reduce(
    (sum, t) => sum.plus(new Big(t.amount)),
    new Big(0)
  );
};

const TreasuryLog =
  mongoose.models.TreasuryLog ||
  mongoose.model("TreasuryLog", TreasuryLogSchema);
export default TreasuryLog;
