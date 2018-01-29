const mongoose = require("mongoose");

const blogpostSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  created: { type: Date, default: Date.now }
});

blogpostSchema.index({
  title: "text",
  "author.username": "text"
});

module.exports = mongoose.model("Blogpost", blogpostSchema);
