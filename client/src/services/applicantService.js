
const API_URL = "http://localhost:5000/api/applicants";

// Get all applicants
export const getApplicants = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch applicants");
  }

  return data.applicants;
};

// Get applicant by ID
export const getApplicantById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch applicant");
  }

  return data.applicant;
};

// Create applicant
export const createApplicant = async (applicant) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(applicant)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create applicant");
  }

  return data.applicant;
};

// Update applicant
export const updateApplicant = async (id, updates) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updates)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update applicant");
  }

  return data.applicant;
};

// Delete applicant
export const deleteApplicant = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete applicant");
  }

  return data;
};
