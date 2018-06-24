// Use .env
require('dotenv').config();

"use strict";

// Basic express setup:

const PORT                                          = 5000;
const express                         = require("express");
const bodyParser                  = require("body-parser");
const app                                      = express();
const nodeSassMiddleware = require('node-sass-middleware');
const path =                               require('path');

app.use(bodyParser.urlencoded({ extended: true }));


// Setting node sass middleware
app.use(nodeSassMiddleware({
  src: path.join(__dirname, '../styles'),
  dest: path.join(__dirname, '../public'),
  debug: true,
  outputStyle: 'compressed',
}));

app.use(express.static(path.join(__dirname, '../public')));


// Use MongoDB
const {MongoClient} = require("mongodb");
const MONGODB_URI = process.env.MONGODB_URI;


// Connect to database
MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);
  app.listen((process.env.PORT || 5000), () => {
    console.log("Example app listening on port " + PORT);
  });


});