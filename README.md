# Course Management System 🎓

## 📖 About The Project

**Course Management System** is a comprehensive web application designed to streamline the process of creating, managing, and delivering online courses. Built with modern technologies, it offers a seamless experience for instructors to manage their educational content and for students to access quality learning materials.

### Key Highlights

- **Instructor Dashboard** - Complete course lifecycle management
- **Student Portal** - Browse and enroll in courses
- **Responsive Design** - Works flawlessly on all devices
- **Secure Authentication** - Firebase-powered user management

---

## Features

### For Instructors

#### Course Management

- **Create Courses** - Rich course builder with syllabus, prerequisites, and learning outcomes
- **Edit Courses** - Update course details through intuitive modal interface
- **Delete Courses** - Remove courses with confirmation dialogs

#### Dashboard Features

- **Real-time Statistics**
- Total courses count
- Total enrolled students
- Average course ratings

- **Advanced Filtering**
- Search by title/description
- Filter by category
- Grid and list view options

- **Course Information Display**
- Course thumbnail
- Title and description
- Category and level
- Price and duration
- Student enrollment count
- Ratings and reviews
- Last updated timestamp

### For Students

- **Course Discovery** - Browse extensive course catalog
- **Category Filtering** - Find courses by subject area
- **Enrollment** - Easy course registration process
- **My Courses** - Access enrolled courses anytime

### Authentication & Security

- **Firebase Authentication** - Secure user login/signup

### User Interface

- **Modern Design** - Gradient-based beautiful UI
- **Fully Responsive** - Mobile, tablet, and desktop optimized
- **Premium Components** - DaisyUI + Tailwind CSS
- **Interactive Modals** - SweetAlert2 for confirmations

### Route summary

- **/** - Home page
- **/about** - About page
- **/courses** - See all Courses
- **/course[id]** - Find selected course details
- **/logiin** - Login page
- **/regester** - Register page
- **/dashboard** - Procted Dashboard route
- **/dashboard/addCourse** - Create a course
- **/dashboard/myCourses** - Can see own created Course and delete or ubdate course
- **/dashboard/myEnrolled** - Can see own Enrolled course
- **/dashboard/settings** - Can ubdate or delete profile

---

## 🛠️ Tech Stack

### Frontend

| Technology   | Version | Purpose                        |
| ------------ | ------- | ------------------------------ |
| Next.js      | 16.x    | React framework for production |
| React        | 19.x    | UI library                     |
| Tailwind CSS | 3.x     | Utility-first CSS framework    |
| DaisyUI      | Latest  | Tailwind component library     |
| Lucide React | Latest  | Icon library                   |
| SweetAlert2  | Latest  | Beautiful alert modals         |
| Firebase     | Latest  | Authentication                 |

### Backend

| Technology     | Version | Purpose                       |
| -------------- | ------- | ----------------------------- |
| Node.js        | 18.x    | JavaScript runtime            |
| Express.js     | 4.x     | Web framework                 |
| MongoDB        | Latest  | NoSQL database                |
| Firebase Admin | Latest  | Server-side Firebase SDK      |
| CORS           | Latest  | Cross-origin resource sharing |
| dotenv         | Latest  | Environment variables         |

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

````bash
Node.js >= 18.0.0
npm >= 9.0.0 or yarn >= 1.22.0
Git >= 2.0.0
MongoDB (local or Atlas account)
Firebase account


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
