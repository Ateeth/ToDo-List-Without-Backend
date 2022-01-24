const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const  workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", function(req, res) {

  var day = date.getDate();
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
//checks which list the new item came from
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server on port 3000");
});
