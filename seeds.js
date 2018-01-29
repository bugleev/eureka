const mongoose = require("mongoose");
const Blogpost = require("./models/blogpost");
const Comment = require("./models/comment");

const data = [
 {
  title: "First post",
  image:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-4dOOu9ea8AmIPtQymZrIB_DQiliAXiZwBS9GEXmXqVFNVSvU",
  body:
   "Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur aliquet quam id dui posuere blandit. Proin eget tortor risus. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus."
 },
 {
  title: "Second post",
  image:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSim-iO20JIz0ezfhsKbcRt_PW5-IC6I3PF8ER3NyiCP_OKhMOA",
  body:
   "Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur aliquet quam id dui posuere blandit. Proin eget tortor risus. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus."
 },
 {
  title: "Third post",
  image:
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKhvM1JfcOQyVPBe2bKAPB5pfS9OGVl2JWDWeF59eI5H7fzIb3",
  body:
   "Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur aliquet quam id dui posuere blandit. Proin eget tortor risus. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus."
 }
];
function seedDB() {
 //Remove all posts
 Blogpost.remove({}, err => {
  // err
  //  ? console.log("Error removing posts!")
  //  : (console.log("Removed posts!"),
  //    //create new posts as a callback
  //    data.forEach(seed =>
  //     Blogpost.create(seed, (err, post) => {
  //      err
  //       ? console.log("Error creating posts!")
  //       : (console.log("Added a post!"),
  //         //create new comments as a callback of prev function
  //         Comment.create(
  //          {
  //           text: "This is a cool and funny comment!",
  //           author: "Homer"
  //          },
  //          (err, comment) => {
  //           err
  //            ? console.log("Error adding a  comment!")
  //            : (post.comments.nonAtomicPush(comment),
  //              post.save(),
  //              console.log("Added a comment!"));
  //          }
  //         ));
  //     })
  //    ));
 });
}
module.exports = seedDB;
