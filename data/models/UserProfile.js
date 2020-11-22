import mongoose, { Schema } from "mongoose";
import { allRoles } from "utils/roles";

const UserProfileSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: allRoles, required: true },
  isActive: Boolean,
});

const UserProfile =
  mongoose.models.UserProfile ||
  mongoose.model("UserProfile", UserProfileSchema);

//TODO: Consider adding conversion functions to easily get simple objects?
//Right now this is being handled on an adhoc basis in the api handlers

export { UserProfile as default };
