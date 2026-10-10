const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    jobType: {
      type: String,
      trim: true
    },
    salary: {
      type: Number,
      min: 1
    },
    email: {
    type: String,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ["Saved", "Applied", "Interview", "Rejected", "Selected"],
      default: "Saved"
    }
  },
  {
    timestamps: true,
    collection: "jobs"
  }
);

module.exports = mongoose.model("Job", jobSchema);
