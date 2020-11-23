import { Types } from "mongoose";
import dbConnect from "utils/mongoose";
import { UserProfile } from "data/models";
import { forMethod } from "utils/apiHelpers";
import authorize from "utils/authorize";
import { canReadOfficers, canUpdateOfficers } from "utils/permissions";
import { officerRoles } from "utils/roles";

async function get(req, res) {
  try {
    await dbConnect();
    const officers = await UserProfile.find(
      {
        role: { $in: officerRoles },
        isActive: true,
      },
      { isActive: false }
    );

    const dtos = officers.map((officer) => ({
      _id: officer._id,
      email: officer.email,
      role: officer.role,
    }));
    res.json(dtos);
  } catch (error) {
    //TODO: return the error message?
    console.log(error);
    res.status(400).end();
  }
}

async function post(req, res) {
  try {
    await dbConnect();
    await UserProfile.create({
      ...req.body,
      _id: Types.ObjectId().toHexString(),
    });
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

export default forMethod({
  getHandler: authorize(get, canReadOfficers),
  postHandler: authorize(post, canUpdateOfficers),
});
