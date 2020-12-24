import { TreasuryLog } from "data/models";
import { withDb } from "utils/mongoose";
import { forMethod } from "utils/apiHelpers";
import authorize from "utils/authorize";
import { canViewTreasuryLog } from "utils/permissions";

async function getLogByYear(year) {
  return await TreasuryLog.findOne({ year: year });
}

async function get(req, res) {
  try {
    const log = await getLogByYear(req.query.year);
    const transactions = log.transactions.map((t) => ({
      _id: t._id,
      date: t.date,
      amount: t.amount.toString(),
      description: t.description,
    }));
    const dto = {
      _id: log._id,
      balance: log.getBalance(),
      transactions: transactions,
    };
    res.json(dto);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

export default withDb(
  forMethod({ getHandler: authorize(get, canViewTreasuryLog) })
);
