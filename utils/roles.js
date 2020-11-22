const roles = {
  admin: "Admin",
  officer: "Officer",
  member: "Member", //Not yet used, just placing here for later
};

const officerRoles = [roles.admin, roles.officer];
const allRoles = [roles.admin, roles.officer, roles.member];
export { roles as default, officerRoles, allRoles };
