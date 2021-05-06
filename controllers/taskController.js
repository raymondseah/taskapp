const TaskModel = require("./../models/taskModel");

const taskControllers = {
  createTask: async (req, res) => {
    TaskModel.create({
      user_id: req.body.userid,
      task: req.body.task,
    })
      .then((createProductResult) => {
        console.log("created");
        res.status(200);
        res.json({
          msg: "task created successfully",
        });
      })
      .catch((err) => {
        res.statueCode = 409;
        res.json({
          msg: "unable to create due to unexpected error",
        });
      });
  },
  getAllTasks: async (req, res) => {
    let id = res.locals.jwtData.id;
    TaskModel.find({
      user_id: id,
    })
      .then((result) => {
        res.statusCode = 200;
        res.json({
          results: result,
          success: true,
          msg: "Found all current logged in user task",
        });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({
          success: false,
          msg: "Unable to login due to unexpected error",
        });
      });
  },
  deleteTaskById: async (req, res) => {
    try {
      await TaskModel.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Task" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateTaskById: async (req, res) => {
    TaskModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        task: req.body.task,
      }
    )
      .then((result) => {
        res.json({ msg: "edit successful" });
      })
      .catch((err) => {
        res.json(err);
      });
  },
  updateCompletionById: async (req, res) => {
    TaskModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        completed: req.body.task.completed,
      }
    )
      .then((result) => {
        res.json({ msg: "edit successful" });
      })
      .catch((err) => {
        res.json(err);
      });
  },
};

module.exports = taskControllers;
