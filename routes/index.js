const blogRouter = require("./blogRouter");

const initRoutes = (app) => {
  app.use("/blog", blogRouter);
};

module.exports = initRoutes;
