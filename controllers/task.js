const Task = require("../models/task");
const { userExist } = require("../util/finder");
const error = require("../util/error-handler");
const User = require("../models/user");

module.exports.createTask = async (req, res, next) => {
  const task = req.body.task,
    userId = req.params.id;

  try {
    const user = await userExist("id", userId);
    if (task === "") {
      error.errorHandler(res, "Task cannot be empty", "task");
    }

    const createTask = new Task({
      task: task,
      done: false,
      user: user._id.toString(),
    });

    user.tasks.push(createTask);
    await user.save();

    const createdTask = await createTask.save();

    res.status(200).json({ message: "task added", type: "task", createdTask });
  } catch (err) {
    error.error(err, next);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  const userId = req.params.id;

  try {
    await User.findById(userId)
      .populate({ path: "tasks", populate: { path: "subtasks" } })
      .then((result) => {
        const tasks = result.tasks;
        const subtasks = tasks.subtasks;
        res.status(200).json({ tasks, subtasks });
      });
  } catch (err) {
    error.error(err, next);
  }
};

module.exports.updateTask = async (req, res, next) => {
  const taskId = req.params.id,
    task = req.body.task;

  try {
    await Task.findByIdAndUpdate(taskId, { task: task }).then(() => {
      res.status(200).json({ message: "task updated!", type: "task" });
    });
  } catch (err) {
    error.error(err, next);
  }
};

module.exports.removeTask = async (req, res, next) => {
  const taskId = req.params.id;

  try {
    await Task.findByIdAndDelete(taskId).then(() => {
      res
        .status(200)
        .json({ message: "task deleted successfully", type: "task" });
    });
  } catch (err) {
    error.error(err, next);
  }
};
