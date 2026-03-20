import mongoose from "mongoose";



const profile_imgs_collections_list = [
  "adventurer",
  "avataaars",
  "bottts",
  "personas",
];

const profile_imgs_name_list = [
  "john",
  "alex",
  "sam",
  "max",
  "leo",
];

const UserSchema = new mongoose.Schema(
  {
        profile_img: {
      type: String,
      default: () => {
        return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`
      }
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const UserModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default UserModel;
