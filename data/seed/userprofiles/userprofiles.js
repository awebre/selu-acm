const { getObjectId } = require("mongo-seeding");

const now = new Date();

module.exports = [
  {
    id: getObjectId("admin1"),
    email: "austin.webre@gmail.com",
    role: "Admin", //ideally we could use util/roles, but exports differ between this environment and next.js
    isActive: true,
  },
];
