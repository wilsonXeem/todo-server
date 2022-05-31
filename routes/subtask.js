const express = require("express");
const router = express.Router();
const subtaskController = require("../controllers/subtask");

router.post("/subtask/:id", subtaskController.createSubTask);

router.get("/subtasks/:id", subtaskController.getAllSubtasks);

router.patch("/subtask/:id", subtaskController.doneSubtask);

router.patch("/edit/:id", subtaskController.updateSubtask);

module.exports = router;
