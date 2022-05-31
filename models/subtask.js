const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subtasksSchema = new Schema({
  maintask: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Task",
  },
  subtask: { type: String, required: true },
  timeAdded: { type: String, default: new Date().toDateString() },
  done: { type: Boolean, required: true },
});

module.exports = mongoose.model("Subtask", subtasksSchema);
