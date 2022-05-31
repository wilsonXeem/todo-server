const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

router.post("/task/:id", taskController.createTask);

router.get("/task/:id", taskController.getAllTasks);

router.patch("/task/:id", taskController.updateTask);

router.delete("/task/:id", taskController.removeTask);

module.exports = router;
