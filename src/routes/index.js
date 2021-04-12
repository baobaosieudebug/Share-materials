const homeRouter = require("./home");
const loginRouter = require("./login");
const logoutRouter = require("./logout");
const registerRouter = require("./register");
const buyItemRouter = require("./buyItem");
const createItemRouter = require("./createItem");
const categoryRouter = require("./category");
const indexRouter = require("./introduce");

function route(app) {
  app.use("/", indexRouter);
  app.use("/login", loginRouter);
  app.use("/logout", logoutRouter);
  app.use("/register", registerRouter);
  app.use("/home", homeRouter);
  app.use("/buyItem", buyItemRouter);
  app.use("/createItem", createItemRouter);
  app.use("/category", categoryRouter);
}

module.exports = route;
