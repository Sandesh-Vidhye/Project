const mongoose = require ("mongoose");
const data = require("./data.js");
const Listing = require ("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then( () => {
  console.log("Connection Success");
  
}).catch( (err) =>{
  console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async() =>{
  await Listing.deleteMany({});
  await Listing.insertMany(data.data);
  console.log("data was initalized");
  console.log(data.data.map((item, index) => ({ index, title: item.title })));

}


initDB();