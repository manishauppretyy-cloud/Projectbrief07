
const express = require("express");

const {
  getApplicants,
  getApplicantById,
  createApplicant,
  updateApplicant,
  deleteApplicant
} = require("../controllers/applicantController");

const router = express.Router();

router.get("/", getApplicants);
router.get("/:id", getApplicantById);
router.post("/", createApplicant);
router.put("/:id", updateApplicant);
router.delete("/:id", deleteApplicant);

module.exports = router;
