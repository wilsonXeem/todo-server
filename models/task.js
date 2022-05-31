const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  task: { type: String, required: true },
  done: { type: Boolean, default: false },
  timeAdded: { type: String, default: new Date().toDateString() },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  subtasks: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Subtask",
    },
  ],
});

module.exports = mongoose.model("Task", taskSchema);
