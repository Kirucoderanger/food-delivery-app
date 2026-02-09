import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  deliveryTime: String
});

export default mongoose.model("Restaurant", restaurantSchema);


