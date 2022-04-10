const mongoose = require("mongoose");

const restrauntsSchema = new mongoose.Schema({
  "Restaurant ID": { type: String },
  "Restaurant Name": { type: String },
  "Country Code": { type: String },
  City: { type: String },
  Address: { type: String },
  Locality: { type: String },
  "Locality Verbose": { type: String },
  Longitude: { type: String },
  Latitude: { type: String },
  Cuisines: { type: String },
  "Average Cost for two": { type: String },
  Currency: { type: String },
  "Has Table booking": { type: String },
  "Has Online delivery": { type: String },
  "Is delivering now": { type: String },
  "Switch to order menu": { type: String },
  "Price range": { type: String },
  "Aggregate rating": { type: String },
  "Rating color": { type: String },
  "Rating text": { type: String },
  Votes: { type: String },
});

const Restraunts = mongoose.model("restraunts", restrauntsSchema);
module.exports = Restraunts;
