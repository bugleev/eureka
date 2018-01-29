const mongoose = require("mongoose");
const Blogpost = mongoose.model("Blogpost");
const Comment = mongoose.model("Comment");
const User = mongoose.model("User");
const passport = require("passport");
const slug = require("slugs");
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);


exports.homePage = (req, res) => {
  res.render("landing");
};

/*****************AUTH ROUTES*************/
exports.showRegister = (req, res) => {
  res.render("register");
};

exports.signUp = (req, res) => {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    err
      ? (req.flash("error", err.message), res.render("register"))
      : passport.authenticate("local")(
        req,
        res,
        () => (
          req.flash("success", `Welcome to BWM Blogs, ${user.username}!`),
          res.redirect("/")
        )
      );
  });
};
exports.showLogin = (req, res) => {
  res.render("login");
};
exports.logIn = passport.authenticate("local", {
  successRedirect: "/posts",
  failureRedirect: "/login",
  failureFlash: true,
});

exports.logOut = (req, res) => {
  req.logout();
  req.flash("success", "You logged out!");
  res.redirect("back");
};
/*****************BLOGS ROUTES*************/
exports.viewBlogs = async (req, res) => {
  const users = await User.find({})
    .$where("this.blog_name")
    .exec();
  res.render("blogs", { users });
};
exports.showBlogForm = (req, res) => {
  res.render("blogs/create", {
    user: req.user,
  });
};
exports.showBlog = (req, res) => {
  User.findOne({ blog_slug: req.params.blog_slug }, (err, foundUser) => {
    err
      ? res.redirect("/blogs")
      : Blogpost.find({ "author.id": foundUser._id }, (err, foundBlogPost) => {
        err
          ? res.redirect("/blogs")
          : res.render("blogs/blog", {
            blogs: foundBlogPost,
            author: foundUser,
            user: req.user || "",
          });
      });
  });
};
exports.addBlog = async (req, res) => {
  const blogName = req.body.user.blog_name;
  const blogImage = req.body.user.blog_image;
  const blogSlug = slug(req.body.user.blog_name);
  const description = DOMPurify.sanitize(req.body.user.blog_description);
  const newBlog = {
    blog_name: blogName,
    blog_image: blogImage,
    blog_slug: blogSlug,
    blog_description: description,
  };
  const blog = await User.findOneAndUpdate({ _id: req.user._id }, newBlog, {
    new: true,
    runValidators: true,
  }).exec();
  res.redirect(`/blog/${blogSlug}`);
};

/*****************BLOGPOSTS ROUTES*************/
// async function asyncForEach(array, callback) {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array)
//   }
// }
exports.showBlogposts = async (req, res) => {
  const blogs = await Blogpost.find({});
  const userIds = await Promise.all(blogs.map(async (blog) => blog.author.id));
  const blogNames = await Promise.all(userIds.map(async (userId) => {
    let foundUser = await User.findById(userId) || { blog_name: "default" };
    return foundUser.blog_name;
  }));
  res.render("blogs/posts", { blogs: blogs, blogNames });
};

exports.showPostform = (req, res) => {
  res.render("blogs/new");
};
exports.addBlogpost = (req, res) => {
  const title = req.body.blog.title;
  const image = req.body.blog.image;
  const body = DOMPurify.sanitize(req.body.blog.body);
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  const newBlogpost = { title, image, body, author };
  Blogpost.create(newBlogpost, (err, blogs) => {
    err ? res.render("blogs/new") : res.redirect("/posts");
  });
};
exports.showPost = async (req, res) => {
  const post = await Blogpost.findById(req.params.id).populate("comments").exec();
  const user = await User.findById(post.author.id);

  res.render("blogs/show", { blog: post, user });

};
exports.editPost = (req, res) => {
  Blogpost.findById(req.params.id, (err, foundBlog) => {
    err
      ? (req.flash("error", "Blogpost not found!"), res.redirect("/blogs"))
      : res.render("blogs/edit", { blog: foundBlog });
  });
};
exports.updatePost = (req, res) => {
  req.body.blog.body = DOMPurify.sanitize(req.body.blog.body);
  Blogpost.findByIdAndUpdate(
    req.params.id,
    req.body.blog,
    (err, updatedBlog) => {
      err ? res.redirect("/blogs") : res.redirect("/posts/" + req.params.id);
    }
  );
};
exports.deletePost = (req, res) => {
  Blogpost.findByIdAndRemove(req.params.id, (err, updatedBlog) => {
    err ? res.redirect("/blogs") : res.redirect("/posts");
  });
};
exports.searchPosts = async (req, res) => {
  const posts = await Blogpost
    // find Stores
    .find({
      $text: {
        $search: req.query.q
      }
    }, {
      score: { $meta: "textScore" }
    })
    // sort results
    .sort({
      score: { $meta: "textScore" }
    })
    // set a limit
    .limit(10);
  res.json(posts);
}

/*****************COMMENTS ROUTES*************/
exports.showCommentForm = (req, res) => {
  Blogpost.findById(req.params.id, (err, blogpost) => {
    err
      ? res.redirect("/blogs")
      : res.render("comments/new", { blog: blogpost });
  });
};
exports.addComment = (req, res) => {
  Blogpost.findById(req.params.id, (err, blogpost) => {
    err
      ? res.redirect("/blogs")
      : Comment.create(req.body.comment, (err, comment) => {
        err
          ? (req.flash("error", "Something went wrong! Please try again"),
            console.log(err))
          : ((comment.author.id = req.user._id),
            (comment.author.username = req.user.username),
            comment.save(),
            blogpost.comments.nonAtomicPush(comment),
            blogpost.save(),
            req.flash("succcess", "Comment added!"),
            res.redirect(`/posts/${blogpost._id}`));
      });
  });
};
exports.editComment = (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    err
      ? res.redirect("back")
      : res.render("comments/edit", {
        blog_id: req.params.id,
        comment: foundComment,
      });
  });
};
exports.updateComment = (req, res) => {
  req.body.comment.text = req.sanitize(req.body.comment.text);
  Comment.findByIdAndUpdate(
    req.params.comment_id,
    req.body.comment,
    (err, updatedComment) => {
      err ? res.redirect("back") : res.redirect(`/posts/${req.params.id}`);
    }
  );
};
exports.deleteComment = (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err, deleteComment) => {
    err ? res.redirect("back") : res.redirect(`/posts/${req.params.id}`);
  });
};
