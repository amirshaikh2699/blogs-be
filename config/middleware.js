const fileUpload = require("express-fileupload");
const logSymbols = require("log-symbols");
const express = require("express");
const logger = require("morgan");
const path = require("path");

const initMiddleware = (app) => {
  console.log("Initializing Middleware", logSymbols.info);
  app.use(express.static("public"));

  // Logs
  app.use(logger("dev"));

  // Parsing data
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // File upload parser
  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    })
  );

  // Setting up the static folder
  app.use(express.static(path.join(__dirname, "../public")));
};

module.exports = initMiddleware;
