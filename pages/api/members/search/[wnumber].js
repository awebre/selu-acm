import dbConnect from "utils/mongoose";
import { Member } from "data/models";
import { forMethod } from "utils/apiHelpers";
import authorize from "utils/authorize";
import { canReadMembers } from "utils/permissions";

async function get(req, res) {
  try {
    const wNumber = req.query.wnumber?.toUpperCase();
    const startsWith = new RegExp(`^${wNumber}`);

    await dbConnect();
    const members = await Member.find({ wNumber: startsWith });
    console.log(members);
    const dtos = members.map((member) => ({
      _id: member._id,
      firstName: member.firstName,
      lastName: member.lastName,
      wNumber: member.wNumber,
    }));
    res.json(dtos);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

export default forMethod({
  getHandler: authorize(get, canReadMembers),
});
