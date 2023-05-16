const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const trackerRoutes = require("./routes/tracker")
const calRoutes = require("./routes/cal")
const feedRoutes = require("./routes/feed")
const seqRoutes = require("./routes/seq")


//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
//"post" needs to come before every route in post routes
app.use('/', mainRoutes);
app.use('/post', postRoutes);
app.use('/tracker', trackerRoutes)
app.use('/cal', calRoutes)
app.use('/feed', feedRoutes)
app.use('/category', feedRoutes)
app.use('/seq', seqRoutes)

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});

//Use chatGPT
const openai = require('openai')
const chatGPT = new openai.OpenAIApi(
  new openai.Configuration({ apiKey: process.env.CHATGPT_KEY })
);

