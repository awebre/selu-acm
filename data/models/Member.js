import mongoose, { Schema } from "mongoose";

const MembershipSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  startDate: Date,
  endDate: {
    type: Date,
    required: {
      function() {
        return !!this.startDate;
      },
    },
  },
});

const MemberSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  wNumber: {
    type: String,
    required: true,
    match: [/[W][0-9]+$/, "Please enter a valid W Number."],
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  memberships: [MembershipSchema],
  nationalAcmNumber: { type: String },
});

const Member = mongoose.models.Member || mongoose.model("Member", MemberSchema);
export default Member;
