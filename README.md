# MediQueue – Tutor Booking System

MediQueue is a website where medical students can easily find and book specialized tutors online. The system handles tutor schedules automatically and helps students track their booked classes.

## Project Links
  **Live Website:** []
  **Client Side Code:** [https://github.com/jannatulmaoya-JM/Mediquue-Client]
  **Server Side Code:** [https://github.com/jannatulmaoya-JM/Mediqueue-Server]

---

## Key Features
  **Live Slot Booking:** Every tutor has limited slots. When a user books a session, the slots go down by 1. Booking stops automatically when slots hit 0.
  **Date Validation:** Students cannot book a session before the tutor's actual session start date.
  **Search & Filters:** Users can easily search tutors by name and filter them using date ranges.
  **Private User Pages:** Logged-in users can add new tutors, manage their own listings, and see their booked sessions.
  **Dark & Light Mode:** Users can switch the website theme between dark and light modes from the navbar.
  **Friendly Toasts:** All success or error messages show up nicely using custom popups instead of boring browser alerts.

---

## Technologies Used
  **Frontend:** Next.js, React, Tailwind CSS, BetterAuth, React Hot Toast
  **Backend:** Node.js, Express.js
  **Database:** MongoDB

---

## How to Run This Project Locally

### 1. Server Setup
1. Go to the server folder: `cd mediqueue-server`
2. Install packages: `npm install`
3. Create a `.env` file and add your setup:
  .env
   PORT=5000
   DB_URI=your_mongodb_connection_string