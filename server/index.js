const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Type 1: In-memory only datastore (no need to load the database)
var Datastore = require("nedb"),
  db = new Datastore();

// Type 2: Persistent datastore with manual loading
var Datastore = require("nedb"),
  db = new Datastore({ filename: path.join("/db", "card.json") });
db.loadDatabase(function(err) {
});

// Type 3: Persistent datastore with automatic loading
var Datastore = require("nedb");
  var card = new Datastore({
    filename: path.join("db/", "card.json")
  });

card.loadDatabase();

app.get("/fetchCards", (req, res) => {
  card.find({},function (err, docs) {
    res.status(200).json({ data: docs });
    
  });
});

app.post("/addCard", (req, res) => {
  var doc = req.body;
  card.insert(doc, function(err, newDoc) {
    res.status(200).json({ data: newDoc });
  });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(8080, () => {
  console.log("port is listning to 8080 port...");
});

module.exports = app;
