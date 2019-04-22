var express = require("express");
var app = express();
var logger = require("morgan");
var bodyParser = require("body-parser");
var path = require("path");

var MainRouter = require("./routes/app.route");

//connection
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/testdata", { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
//handle mongo error
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("db connected");
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: "false"
  })
);
app.use(express.static(path.join(__dirname, "/../app")));

app.use("/dpt/", MainRouter);
//app.use("/demodb", DBRouter);

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || "3000";
app.set("port", port);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
