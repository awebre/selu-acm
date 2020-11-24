const { getObjectId } = require("mongo-seeding");

const now = new Date();

const startDate = new Date(now);
startDate.setDate(startDate.getDate() - 1);
const endDate = new Date(now);
endDate.setDate(endDate.getDate() + 365);

const startDate2 = new Date(startDate);
startDate2.setDate(startDate2.getDate() - 365);
const endDate2 = new Date(now);
endDate2.setDate(endDate2.getDate() - 2);

module.exports = [
  {
    id: getObjectId("member1"),
    wNumber: "W0554061",
    firstName: "Austin",
    lastName: "Webre",
    memberships: [
      {
        _id: getObjectId("membership1"),
        startDate: startDate2,
        endDate: endDate2,
      },
      {
        _id: getObjectId("membership2"),
        startDate: startDate,
        endDate: endDate,
      },
    ],
  },
  {
    id: getObjectId("expiredMember"),
    wNumber: "W0400001",
    firstName: "Joe",
    lasName: "Expired",
    memberships: [
      {
        _id: getObjectId("expiredMembership"),
        startDate: startDate2,
        endDate: endDate2,
      },
    ],
  },
];
