const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then( () => {
  console.log("Connection Success");
  
  
}).catch( (err) =>{
  console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")))

app.get("/", (req, res) => {
  res.send("Hi, I'm root");
})


app.get("/listings",async (req, res) =>{
  const allListings = await Listing.find({});
  res.render("listings/index", {allListings});
});

// new route
app.get("/listings/new", (req , res)=>{
  res.render("listings/new");
});

// show route
app.get("/listings/:id",async (req, res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", {listing});
});

// create route
app.post("/listings", wrapAsync( async (req, res, next) =>{
    const newListing = new Listing (req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  
}))

// edit route
app.get("/listings/:id/edit", async (req, res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", {listing});

});


// update route 
app.put("/listings/:id", async (req, res) =>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
})

// Delete ROute
app.delete("/listings/:id", async (req, res) =>{
  let {id} = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  res.redirect("/listings");
  
})


// app.get("/testListing",async (req, res) =>{
//   let samplListing = new Listing ({
//     title:" My new Vilaa",
//     description:"By the beach",
//     price: 1200,
//     lacation : "Mumbai",
//     country : "India",
//   });

//   await samplListing.save();
//   console.log("Sample was saved");
//   res.send("Successful testing");
  
// });

app.use((err, req ,res, next) =>{
  res.send("Something went wrong!");
})

app.listen(8080, () =>{
  console.log("Server is runnig");
})
