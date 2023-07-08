import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import type { IUser, IUserMethods, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.isPasswordMatched = async function (
  enteredPassword,
  savedPassword
) {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  if (!this.needPasswordChange) {
    this.passwordChangedAt = new Date();
  }
});

const User = model<IUser, UserModel>("User", userSchema);
export default User;
