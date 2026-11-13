
const mongoose = require("mongoose");
const Applicant = require("../models/Applicant");

// Get all applicants
const getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      applicants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get applicant by ID
const getApplicantById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid applicant ID"
      });
    }

    const applicant = await Applicant.findById(req.params.id);

    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: "Applicant not found"
      });
    }

    res.status(200).json({
      success: true,
      applicant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create applicant
const createApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.create(req.body);

    res.status(201).json({
      success: true,
      message: "Applicant created successfully",
      applicant
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update applicant
const updateApplicant = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid applicant ID"
      });
    }

    const allowedFields = [
      "name",
      "email",
      "phone",
      "jobTitle",
      "resume",
      "status"
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided"
      });
    }

    const applicant = await Applicant.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: "Applicant not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Applicant updated successfully",
      applicant
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete applicant
const deleteApplicant = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid applicant ID"
      });
    }

    const applicant = await Applicant.findByIdAndDelete(req.params.id);

    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: "Applicant not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Applicant deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getApplicants,
  getApplicantById,
  createApplicant,
  updateApplicant,
  deleteApplicant
};
