import { Schema, model, models } from "mongoose";

const TestCaseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Test case title is required"],
    },
    description: {
      type: String,
      required: [true, "Test case description is required"],
    },
    steps: {
      type: String,
      required: [true, "Test steps are required"],
    },
    
    expectedResult: {
      type: String,
      required: [true, "Expected result is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    result: {
      type: String,
      enum: ["Passed", "Failed", "Blocked"],
    },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },

    stage: {
      type: String,
      enum: ["Desarrollo", "Integración", "Pre-producción", "Producción"],
      required: [true, "Stage of development is required"],
    },
    priority: {
      type: String,
      enum: ["Baja", "Media", "Alta"],
      required: [true, "Priority is required"],
    },
    evidence: [{
        type: String, // URL o referencia al archivo
        description: String,
      }],
    deadline: {
      type: Date,
    },
    // Otros campos según sea necesario
  },
  {
    timestamps: true,
  }
);

const TestCase = models.TestCase || model("TestCase", TestCaseSchema);
export default TestCase;
