import mongoose from "mongoose";
import CounterSchema from "./CounterSchema.js";

const Counter = mongoose.model("Counter", CounterSchema);

export default Counter;