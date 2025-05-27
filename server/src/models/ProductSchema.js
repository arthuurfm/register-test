import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {type: String, required: true},
  quantity: {type: Number, required: true},
  price: {type: Number, required: true}
});

ProductSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default ProductSchema;