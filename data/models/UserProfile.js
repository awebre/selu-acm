import mongoose, { Schema } from "mongoose";

const UserProfileSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  role: String,
  isActive: Boolean,
});

const UserProfile =
  mongoose.models.UserProfile ||
  mongoose.model("UserProfile", UserProfileSchema);

//TODO: add conversion functions to easily get simple objects?

export { UserProfile as default };
