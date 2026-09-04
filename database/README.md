# Toor Database

MongoDB seed data for the Toor project.

The actual MongoDB server is not stored in this repository. The backend connects to MongoDB using `MONGODB_URI`.

To seed the database, run the seed script from this repository after installing the backend dependencies and setting the environment variable.

Example:
`MONGODB_URI=mongodb://localhost:27017/toor node scripts/seed.js`
