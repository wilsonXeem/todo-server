const Subtasks = require("../models/subtask");
const { taskExist } = require("../util/finder");
const error = require("../util/error-handler");
const Task = require("../models/task");

module.exports.createSubTask = async (req, res, next) => {
  const subtask = req.body.subtask,
    taskId = req.params.id;

  try {
    const mainTask = await taskExist(taskId);
    if (subtask === "") {
      error.errorHandler(res, "subtask should not be empty");
    }
    const createSubTask = new Subtasks({
      maintask: mainTask._id,
      subtask: subtask,
      done: false,
    });

    const title = mainTask.task;

    mainTask.subtasks.push(createSubTask);
    await mainTask.save();

    const createdSubTask = await createSubTask.save();

    res.status(200).json({
      message: "subtask added",
      type: "subtask",
      createdSubTask,
      title,
    });
  } catch (err) {
    error.error(err, next);
  }
};

module.exports.getAllSubtasks = async (req, res, next) => {
  const taskId = req.params.id;

  try {
    await Task.findById(taskId)
      .populate("subtasks")
      .then((result) => {
        const subtasks = result.subtasks;
        const title = result.task;
        res.status(200).json({ subtasks, title });
      });
  } catch (err) {
    error.error(err, next);
  }
};

module.exports.doneSubtask = async (req, res, next) => {
  const taskId = req.params.id;

  try {
    const subtask = await Subtasks.findById(taskId);

    subtask.done = !subtask.done;
    subtask.save();
    res.status(200).json({ message: "Task is done", type: "subtask", subtask });
  } catch (err) {
    error.error(err, next);
  }
};

module.exports.updateSubtask = async (req, res, next) => {
  const taskId = req.params.id,
    task = req.body.task;

  try {
    await Subtasks.findByIdAndUpdate(taskId, { subtask: task }).then(() => {
      res.status(200).json({ message: "task updated!", type: "task" });
    });
  } catch (err) {
    error.error(err, next);
  }
};