import { getSessionUser } from "utils/authn";

const authorize = (handler, hasPermission) => async (req, res) => {
  const user = await getSessionUser({ req });
  if (!user) {
    res.status(401).end();
  }

  if (!hasPermission(user)) {
    res.status(403).end();
  }

  return handler(req, res);
};

export default authorize;
