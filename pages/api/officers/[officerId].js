import dbConnect from "utils/mongoose";
import { UserProfile } from "data/models";
import { forMethod } from "utils/apiHelpers";
import authorize from "utils/authorize";
import { canReadOfficers, canUpdateOfficers } from "utils/permissions";

async function getOfficerById(officerId) {
  await dbConnect();
  return await UserProfile.findById(officerId);
}

async function get(req, res) {
  try {
    const officer = await getOfficerById(req.query.officerId);
    const dto = {
      _id: officer._id,
      email: officer.email,
      role: officer.role,
      isActive: officer.isActive,
    };
    res.json(dto);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

async function put(req, res) {
  try {
    const officer = await getOfficerById(req.query.officerId);

    officer.email = req.body.email;
    officer.role = req.body.role;
    officer.isActive = req.body.isActive;

    await officer.save();

    res.status(200).end();
  } catch (error) {
    res.status(400).end();
  }
}

export default forMethod({
  getHandler: authorize(get, canReadOfficers),
  putHandler: authorize(put, canUpdateOfficers),
});
