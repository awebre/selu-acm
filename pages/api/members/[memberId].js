import { Types } from "mongoose";
import dayjs from "dayjs";
import { withDb } from "utils/mongoose";
import { Member } from "data/models";
import { forMethod } from "utils/apiHelpers";
import authorize from "utils/authorize";
import { canReadMembers, canUpdateMembers } from "utils/permissions";

async function get(req, res) {
  try {
    const memberId = req.query.memberId;
    const member = await Member.findById(memberId);

    const now = new Date();
    const dto = {
      _id: member._id,
      firstName: member.firstName,
      lastName: member.lastName,
      wNumber: member.wNumber,
      nationalAcmNumber: member.nationalAcmNumber,
      memberships: member.memberships.map((m) => ({
        _id: m._id,
        startDate: m.startDate,
        endDate: m.endDate,
        isActive: m.startDate <= now && now <= m.endDate,
      })),
      hasActiveMembership: member.hasActiveMembership(),
    };
    res.json(dto);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

async function put(req, res) {
  try {
    //TODO: serverside validation to ensure that two members with the same wnumber can't exist
    const memberId = req.query.memberId;
    const member = await Member.findById(memberId);

    member.wNumber = req.body.wNumber;
    member.firstName = req.body.firstName;
    member.lastName = req.body.lastName;
    member.nationalAcmNumber = req.body.nationalAcmNumber;

    if (req.body.licenseAgreement && !member.hasActiveMembership()) {
      const { startDate } = req.body;
      const endDate = dayjs(startDate).add(1, "year");
      member.memberships.push({
        _id: Types.ObjectId().toHexString(),
        startDate: dayjs(startDate).format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      });
    }

    //TODO: update/add membership
    await member.save();

    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

export default withDb(
  forMethod({
    getHandler: authorize(get, canReadMembers),
    putHandler: authorize(put, canUpdateMembers),
  })
);
