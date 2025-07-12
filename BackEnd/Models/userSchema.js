import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  playlists: [
    {
      name: {
        type: String,
        required: true,
      },
      list: [{ type: mongoose.Schema.Types.ObjectId, ref: "Music" }],
    },
  ],
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
export default User;
