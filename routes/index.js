const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const middleware = require("../middleware");

router.get("/", blogController.homePage);

/************************AUTH ROUTES******************************/
router.get("/register", blogController.showRegister);
router.post("/register", blogController.signUp);
router.get("/login", blogController.showLogin);
router.post("/login", blogController.logIn);
router.get("/logout", blogController.logOut);

/************************Blogposts ROUTES******************************/
router.get("/posts", blogController.showBlogposts);
router.get("/posts/new", middleware.isLoggedIn, blogController.showPostform);
router.post("/posts", middleware.isLoggedIn, blogController.addBlogpost);
router.get("/posts/:id", blogController.showPost);
router.get(
  "/posts/:id/edit",
  middleware.checkOwnership,
  blogController.editPost
);
router.put("/posts/:id", middleware.checkOwnership, blogController.updatePost);
router.delete(
  "/posts/:id",
  middleware.checkOwnership,
  blogController.deletePost
);
router.get("/api/search", blogController.searchPosts);
/************************BLOGS ROUTES******************************/

router.get("/blogs", blogController.viewBlogs);
router.get("/create", middleware.isLoggedIn, blogController.showBlogForm);
router.post("/create", middleware.isLoggedIn, blogController.addBlog);

router.get("/blog/:blog_slug", blogController.showBlog);

/************************COMMENTS ROUTES******************************/
router.get(
  "/posts/:id/comments/new",
  middleware.isLoggedIn,
  blogController.showCommentForm
);
router.post(
  "/posts/:id/comments",
  middleware.isLoggedIn,
  blogController.addComment
);
router.get(
  "/posts/:id/comments/:comment_id/edit",
  middleware.checkCommentOwnership,
  blogController.editComment
);
router.put(
  "/posts/:id/comments/:comment_id",
  middleware.checkCommentOwnership,
  blogController.updateComment
);
router.delete(
  "/posts/:id/comments/:comment_id",
  middleware.checkCommentOwnership,
  blogController.deleteComment
);

module.exports = router;
