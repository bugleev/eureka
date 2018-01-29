import { log } from "util";

const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	session = require("express-session"),
	MongoBlogs = require('connect-mongo')(session),
	mongoose = require("mongoose"),
	flash = require("connect-flash"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	Blogpost = require("./models/blogpost"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	moment = require("moment"),
	casual = require("casual");

require("dotenv").config({ path: "variables.env" });


var promise = mongoose.connect(process.env.DATABASE, {
	useMongoClient: true
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", err => {
	console.error(`${err.message}`);
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(express.static("public"));
app.use(express.static("semantic"));
app.use(methodOverride("_method"));
app.use(flash());


/*****************PASSPORT CONFIGURATION********************/
app.use(session({
	secret: process.env.SECRET,
	key: process.env.KEY,
	resave: false,
	saveUninitialized: false,
	store: new MongoBlogs({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.pageTitle = "";
	res.locals.error = req.flash("error");
	res.locals.moment = moment;
	res.locals.casual = casual;
	res.locals.success = req.flash("success");
	next();
});

const routes = require("./routes/index");
app.use("/", routes);
/**************************************************************/

app.set("port", process.env.PORT || 3000);
const server = app.listen(app.get("port"), () => {
	console.log(`Express running → PORT ${server.address().port}`);
});

