const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	blog_name: {
		type: String,
		created: { type: Date, default: Date.now },
		default: ""
	},
	blog_slug: String,
	blog_description: String,
	blog_image: String,
	registration: { type: Date, default: Date.now }
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
