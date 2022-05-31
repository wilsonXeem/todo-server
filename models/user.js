const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Task",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
