const JOBS_URL = "http://localhost:5000/api/jobs";

const request = async (url, options) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    }
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || `Request failed (${response.status})`);
  }
  return result;
};

export const getJobs = async () => {
  const result = await request(JOBS_URL);
  return result.jobs;
};

export const createJob = async (job) => {
  const result = await request(JOBS_URL, {
    method: "POST",
    body: JSON.stringify(job)
  });
  return result.job;
};

export const updateJob = async (id, updates) => {
  const result = await request(`${JOBS_URL}/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(updates)
  });
  return result.job;
};

export const deleteJob = async (id) => {
  await request(`${JOBS_URL}/${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
};
