import roles from "./roles";

function canReadOfficers(user) {
  const role = user?.role;
  if (role) {
    return role === roles.admin || role === roles.officer;
  }

  return false;
}

function canUpdateOfficers(user) {
  const role = user?.role;
  if (role) {
    return role == roles.admin;
  }

  return false;
}

export { canReadOfficers, canUpdateOfficers };
