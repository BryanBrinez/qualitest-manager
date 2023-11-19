import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, "Project is required"],
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "Assigned user is required"],
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
    // Otros campos según sea necesario
  },
  {
    timestamps: true,
  }
);

const Task = models.Task || model("Task", TaskSchema);
export default Task;
