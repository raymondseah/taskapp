const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    user_id:{
        type: String,
        required: true,
    },
    task: {
      type: String,
      required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tasks", taskSchema);
