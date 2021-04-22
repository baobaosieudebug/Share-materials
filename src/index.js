const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const route = require("./routes");
const db = require("./config/db");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//Connect DB
db.connect();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());
app.use(cookieParser());


app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "somesecret",
    cookie: { maxAge: 60000 },
  })
);

//Template engine(handlebars)
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
  })
);
//HTTP logger
app.use(morgan("combined"));

// Template engine (handlebars)
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource", "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));

app.use(methodOverride("_method"));
//Route
route(app);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
