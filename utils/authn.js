import { getSession } from "next-auth/client";
import { UserProfile } from "data/models";
import dbConnect from "utils/mongoose";

async function getSessionUser(opt) {
  const { user } = (await getSession(opt)) || {};
  if (!user?.role && !!user?.email) {
    await dbConnect();
    const profile = await UserProfile.findOne({ email: user.email });
    user.role = profile.role;
  }

  return user;
}

export { getSessionUser };
