const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

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
app.post("/listings", async (req, res) =>{
  const newListing = new Listing (req.body.listing);
  await newListing.save();
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

app.listen(8080, () =>{
  console.log("Server is runnig");
})
