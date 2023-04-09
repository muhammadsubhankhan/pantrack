const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "subAdmin", "user"],
    },
    name: {
      type: Schema.Types.ObjectId,
      ref: "Member",
    },
    admin_roles: [
      {
        type: String,
        required: true,
      },
    ],
    access_description: {
      type: String,
    },
    dateCreated: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
