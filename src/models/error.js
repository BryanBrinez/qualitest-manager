import { Schema, model, models } from "mongoose";

const ErrorSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Error description is required"],
    },
    severity: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: [true, "Error severity is required"],
    },
    status: {
      type: String,
      enum: ['New', 'In Progress', 'Resolved'],
      default: 'New',
    },
    testCase: { type: Schema.Types.ObjectId, ref: 'TestCase' },
    reportedBy: { type: String },
    assignedTo: { type:String},
    comments: [{
      text: String,
      createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
    }],
    // Otros campos según sea necesario
  },
  {
    timestamps: true,
  }
);

const Error = models.Error || model("Error", ErrorSchema);
export default Error;
