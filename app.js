//jshint esversion:6

const express = require("Express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs"); //! must be after the express initialization

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
});

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Eat food",
});
const item2 = new Item({
  name: "cook food",
});
const item3 = new Item({
  name: "i love food",
});

const defaultItems = [item1, item2, item3];

// Item.insertMany(defualtItems, function(err, items) {
//   if (err){
//     console.log(err);
//   } else {
//     console.log("Successfully added" + items);
//   }
// });

app.get("/", function (req, res) {
  Item.find({}, (err, itemsList) => {
    if (err) {
      console.log("Problem finding the DB: " + err);
    }
    if (itemsList.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        err
          ? console.log(err)
          : console.log("Succesfully saved defaults items to DB.");
      });
      res.redirect('/');
    }
    res.render('list', { listTitle: "Today", newListItems: itemsList });
  });
});

//{ listTitle: "Today", newListItems: itemsList }

app.post("/", function (req, res) {
  /**
   * creating a new document for our todoList Collection 
  */

  const newItem = new Item({
    name: req.body.newItem
  });
  newItem.save();
  
  
  
  /**
   * checks to see if the value of the submit button is for the work page or regular todo
   * list page
  */

  // if (req.body.list === "work") {
  //   workItems.push(req.body.newItem);
  //   res.redirect("/work");
  // } else {
  //   items.push(req.body.newItem);
  //   res.redirect("/");
  // }

  res.redirect("/"); // redirect sends the page back to another page
});


/**
 * ! the render function renders an EJS view and we must pass in necessary variables
 * ! to send the data to the page
 */

//* Work Page requests handler
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work list", newListItems: workItems });
});

//* about page request handler
app.get("/about", function (req, res) {
  res.render("about");
});


app.listen(3000, function () {
  console.log("Server running on port 3000");
});
 