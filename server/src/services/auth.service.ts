import bcrypt from "bcryptjs";
import User from "../models/User";

export const findUserByEmail = (email: string) => {
  return User.findOne({ email }).select("+password");
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
