const User = require("../models/user");
const Task = require("../models/task");

const error = require("./error-handler");

module.exports = {
  userExist: async (type, value) => {
    let user;

    switch (type) {
      case "id":
        user = await User.findById(value).populate({
          path: "tasks",
          populate: { path: "subtasks" },
        });
        return user;

      case "email":
        if (value === "")
          error.errorHandler(res, "Email input is empty", "email");
        user = await User.findOne({ email: value }).populate({
          path: "tasks",
          populate: {path: "subtasks"}
        });
        return user;
    }
  },
  taskExist: async (value) => {
    let task = await Task.findById(value);
    return task;
  },
};
