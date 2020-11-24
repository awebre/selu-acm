import roles from "./roles";

function isAdminOrOfficer(user) {
  const role = user?.role;
  if (role) {
    return role === roles.admin || role === roles.officer;
  }

  return false;
}

function isAdmin(user) {
  const role = user?.role;
  if (role) {
    return role == roles.admin;
  }

  return false;
}

function canReadOfficers(user) {
  return isAdminOrOfficer(user);
}

function canUpdateOfficers(user) {
  return isAdmin(user);
}

function canReadMembers(user) {
  return isAdminOrOfficer(user);
}

function canUpdateMembers(user) {
  return isAdminOrOfficer(user);
}

export { canReadOfficers, canUpdateOfficers, canReadMembers, canUpdateMembers };
