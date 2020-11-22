const { getObjectId } = require("mongo-seeding");

const now = new Date();
const startDate = new Date(now);
startDate.setDate(startDate.getDate() - 1);

const endDate = new Date(now);
endDate.setDate(endDate.getDate() + 365);

module.exports = [
  {
    id: getObjectId("member1"),
    wNumber: "W0554061",
    firstName: "Austin",
    lastName: "Webre",
    memberships: [
      {
        id: getObjectId("membership1"),
        startDate: startDate,
        endDate: endDate,
      },
    ],
  },
];
