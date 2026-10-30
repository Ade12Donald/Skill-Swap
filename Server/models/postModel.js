import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    post: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
    versionKey: true,
  },
);

export default mongoose.model("post", postSchema);
