# JobPortal API Documentation

Base URL: http://localhost:5000/api/jobs

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/jobs | Create a new job |
| GET | /api/jobs | Retrieve all jobs |
| GET | /api/jobs/:id | Retrieve a job by ID |
| PUT | /api/jobs/:id | Update an existing job |
| DELETE | /api/jobs/:id | Delete a job |

## HTTP Status Codes

- 200: Request successful
- 201: Job created successfully
- 400: Invalid request or job ID
- 404: Job not found
- 500: Unexpected server error
