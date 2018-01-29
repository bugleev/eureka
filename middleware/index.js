const Comment = require("../models/comment");
const Blogpost = require("../models/blogpost");

const middlewareObj = {
	isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		req.flash("error", "Please log in first!");
		res.redirect("/login");
	},
	checkOwnership(req, res, next) {
		req.isAuthenticated()
			? Blogpost.findById(req.params.id, (err, foundBlog) => {
					err
						? (req.flash("error", "Blogpost not found!"), res.redirect("back"))
						: foundBlog.author.id.equals(req.user._id)
							? next()
							: (req.flash("error", "Permission error!"), res.redirect("back"));
				})
			: (req.flash("error", "Please log in first!"), res.redirect("back"));
	},
	checkCommentOwnership(req, res, next) {
		req.isAuthenticated()
			? Comment.findById(req.params.comment_id, (err, foundComment) => {
					err
						? (req.flash("error", "Comment not found!"), res.redirect("back"))
						: foundComment.author.id.equals(req.user._id)
							? next()
							: (req.flash("error", "Permission error!"), res.redirect("back"));
				})
			: (req.flash("error", "Please log in first!"), res.redirect("back"));
	}
};

module.exports = middlewareObj;
