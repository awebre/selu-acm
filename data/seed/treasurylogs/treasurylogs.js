const { getObjectId } = require("mongo-seeding");

const now = new Date();

module.exports = [
  {
    id: getObjectId("2020-Log"),
    year: 2020,
    transactions: [
      {
        _id: getObjectId("2019-balance"),
        date: new Date(2019, 13, 30),
        amount: 215.01,
        description: "Initial balance",
      },
    ],
  },
];
