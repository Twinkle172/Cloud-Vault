import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  googleId?: string;
  authProvider: "local" | "google";

  googleDriveConnected: boolean;
  googleDriveRefreshToken?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minlength: 6,
      select: true,
      required: false,
    },

    avatar: {
      type: String,
      default: "",
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleDriveConnected: {
      type: Boolean,
      default: false,
    },

    googleDriveRefreshToken: {
      type: String,
      select: false,
      required: false,
    },
  },
  {
    timestamps: true,

    toJSON: {
      transform: (_doc, ret) => {
        const {
          password: _password,
          googleDriveRefreshToken: _googleDriveRefreshToken,
          ...user
        } = ret;

        return user;
      },
    },
  }
);

export default mongoose.model<IUser>("User", UserSchema);