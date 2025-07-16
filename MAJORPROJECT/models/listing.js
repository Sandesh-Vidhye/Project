const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema ({
  title :{
    type: String,
    required : true,
  },
  description : String,
  image : {
    filename  :String,
   url : {
    type :String,
    default : "https://unsplash.com/photos/the-sun-sets-over-a-sea-of-clouds-XOi7-8Q0qPs link",
    set : (v) => v === "" ? "https://unsplash.com/photos/the-sun-sets-over-a-sea-of-clouds-XOi7-8Q0qPs link" : v,
   }
  },
  price : Number,
  location : String,
  country :String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;







