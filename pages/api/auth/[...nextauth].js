import { UserProfile } from "data/models";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import dbConnect from "utils/mongoose";
import { officerRoles } from "utils/roles";
const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    signIn: async (user, account, profiles) => {
      //For now we will only allow sign in if they have a user role already set in the database.
      //If this changes to allow people to sign in under a "member" or "prospect" role,
      //then we need to do a security sweep and change to roles based auth (especially in AdminLayout.js).
      await dbConnect();
      const userRoles = await UserProfile.findOne({
        email: user.email,
        role: { $in: officerRoles },
      });
      if (!userRoles) {
        return false;
      }

      return true;
    },
  },
  // A database is optional, but required to persist accounts in a database
  database: `${process.env.MONGODB_URI}/${process.env.MONGODB_DB}`,
};

export default (req, res) => NextAuth(req, res, options);
