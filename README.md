# PropTrack MERN Assessment

A full-stack MERN real estate dashboard to manage properties, clients, and viewing appointments.

## Project Structure


/frontend → React + Vite frontend
/backend → Express + MongoDB backend

##  Features

- Property management (CRUD)
- Client (lead) management with status updates (new, contacted, follow-up, closed)
- Viewing appointments with scheduling and status tracking
- Responsive dashboard
- REST API
- Redux Toolkit for state management
- Mongoose ODM
- Authentication-ready (structure prepared)
  
##  Technologies

- **Frontend:** React, React Router, Redux Toolkit, Bootstrap
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Dev Tools:** ESLint, Prettier, GitHub Actions (optional)

##  How to run locally

1. **Clone the repo:**

```bash
git clone https://github.com/ahmedgd/proptrack-mern-assessment.git
cd proptrack-mern-assessment

Install server dependencies:
cd server
npm install

Install client dependencies:
cd ../frontend
npm install


Configure environment variables:

Create a file named .env inside the server folder with this content:
MONGO_URI=your_mongodb_uri
PORT=5000

Run backend:

cd ../server
npm run dev

Run frontend:

cd ../frontend
npm run dev


 API Routes
GET /api/properties → list properties

GET /api/clients → list leads

PATCH /api/clients/:id/status → update lead status

GET /api/viewings → list viewings

POST /api/viewings → create viewing

(more endpoints can be added later)