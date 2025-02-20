const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://todolist:x3VUeCvMvbQS786m@cluster0.ev8hu9f.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true} );

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Add /customname in url to get your personal todolist"
});

const item2 = new Item({
    name: "Add /delete to delete your personal list" 
});

const item3 = new Item({
    name: "<-- check here to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {   
    
    Item.find({}).then((foundItems) => {
        if(foundItems.length === 0){
            Item.insertMany(defaultItems).then(() => {
                console.log("Successfully saved default items to DB.");
            }).catch((err) => {
                console.log(err);
            });
            res.redirect("/");
        }
        else{
            res.render("lists", {listTitle: "Today", newListItems: foundItems});
        }
    });

}); 

app.get("/:customListName", function(req, res){
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}).then((foundList) => {
        if(!foundList){
            const list = new List({
                name : customListName,
                items: defaultItems 
            });
            list.save();  
            res.redirect("/" + customListName);
        } else{
            res.render("lists", {listTitle: foundList.name, newListItems: foundList.items});
        }
    });
      
});

app.get("/:customListName/delete", function(req, res){
    const toDeleteList = _.capitalize(req.params.customListName);

    if(toDeleteList != '') {
        List.findOneAndDelete({name: toDeleteList}).then((foundList) => {
            if(!foundList) {
                
            } else {
                res.redirect('/')
            }
        })
    }
})

app.post("/", function(req, res){
    
    const itemName = req.body.newItem;    
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if(listName === "Today"){
        item.save();
        res.redirect("/");      
    } else {
        List.findOne({name: listName}).then((foundList) => {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);       
        });
    } 
});

app.post("/delete", function(req, res){
    const checkedItemId =  req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today"){
        Item.findByIdAndRemove(checkedItemId).then(() => {
            console.log("Successfully deleted checked item.");
            res.redirect("/");
        });
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}).then((foundList) => {
            res.redirect("/" + listName);
        })
    }
})


app.listen('3000', function () {
    console.log("Server is running on port 3000");
});