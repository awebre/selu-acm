import { Types } from "mongoose";
import { withDb } from "utils/mongoose";
import { Member } from "data/models";
import { forMethod } from "utils/apiHelpers";
import authorize from "utils/authorize";
import { canUpdateMembers } from "utils/permissions";

async function post(req, res) {
  try {
    //TODO: serverside validation to ensure that two members with the same wnumber can't exist
    await Member.create({
      ...req.body,
      _id: Types.ObjectId().toHexString(),
    });
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

export default withDb(
  forMethod({ postHandler: authorize(post, canUpdateMembers) })
);
