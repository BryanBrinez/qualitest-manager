import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      minLength: [3, "Project name must be at least 3 characters"],
      maxLength: [50, "Project name must be at most 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
    },
    teamMembers: [{
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, required: true }
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
      }],
    // Otros campos según sea necesario
  },
  {
    timestamps: true,
  }
);

const Project = models.Project || model("Project", ProjectSchema);
export default Project;
