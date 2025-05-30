import mongoose from "mongoose";
import Counter from "../models/Counter.js";

const ProductSchema = new mongoose.Schema({
  customId: {type: String, unique: true},
  name: {type: String, required: true},
  quantity: {type: Number, required: true},
  price: {type: Number, required: true}
});

ProductSchema.pre("save", async function (next) {
  console.log("middleware conectado.")
  try {
    if (this.isNew) {
      const counter = await Counter.findByIdAndUpdate(
        {_id: "products"},
        {$inc: {seq: 1}},
        {upsert: true, new: true}
      );

      console.log("Counter: ", counter);

      if (!counter) throw new Error("Falha ao gerar ID incremental.");

      const nextSeq = String(counter.seq);
      this.customId = nextSeq;

      console.log("Custom ID definido: ", this.customId);
    }
    next();
  } catch (error) {
    next(error);
  }
});

ProductSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default ProductSchema;