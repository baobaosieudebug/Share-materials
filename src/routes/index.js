const homeRouter = require("./home");
const loginRouter = require("./login");
const logoutRouter = require("./logout");
const registerRouter = require("./register");
const buyItemRouter = require("./buyItem");
const createItemRouter = require("./createItem");

function route(app) {
  // app.use("/", indexRouter);
  app.use("/login", loginRouter);
  app.use("/logout", logoutRouter);
  app.use("/register", registerRouter);
  app.use("/home", homeRouter);
  app.use("/buyItem", buyItemRouter);
  app.use("/createItem", createItemRouter);
}

module.exports = route;
