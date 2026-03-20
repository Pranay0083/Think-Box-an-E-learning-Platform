# Think-Box — An E-Learning Platform

A full-featured e-learning platform built with React 19 where students can browse courses, enroll, watch video lessons, and manage their learning journey. Instructors can create and update courses with modular content.

## Features

- **Light & Dark Theme** — Follows OS preference by default with a manual toggle; powered by CSS variables
- **Course Catalog** — Browse, search, and filter courses by category
- **Course Details** — View modules, lessons, duration, ratings, and enroll with one click
- **Video Player** — Watch course lessons with a sidebar module navigator
- **Enrollments** — Track enrolled courses from a dedicated dashboard
- **Instructor Profiles** — Browse instructors and view their published courses
- **User Profiles** — Edit profile info, change password, or delete your account
- **Instructor Tools** — Create and update courses (available for teacher accounts)
- **Authentication** — Login/signup with remember-me support and protected routes
- **Toast Notifications** — Dependency-free toast system for success, error, and info feedback
- **Confirmation Dialogs** — Custom modal dialogs for destructive actions (delete course, remove enrollment)
- **Empty States** — Polished UI for errors, not-found, auth-required, and empty data
- **Responsive Design** — Mobile-friendly across all pages
- **Micro-interactions** — Hover effects, focus rings, card lifts, image zoom, and animated loaders
- **Testimonials** — Auto-scrolling infinite marquee of student reviews on the landing page

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Routing | React Router DOM 6 |
| HTTP Client | Axios |
| Icons | Lucide React |
| Styling | CSS Variables + CSS Modules |
| Build Tool | Create React App (react-scripts 5) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/Pranay0083/Think-Box-an-E-learning-Platform.git
cd Think-Box-an-E-learning-Platform
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
REACT_APP_API_URL=<your-backend-api-url>
```

### Development

```bash
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000). Hot-reloads on file changes.

### Production Build

```bash
npm run build
```

Outputs optimized static files to the `build/` folder.

## Project Structure

```
src/
├── components/
│   ├── Auth/              # PrivateRoute
│   ├── Home/              # Hero, Features, Courses, Testimonials, CTA
│   └── common/            # Header, Footer, CourseCard, Loader, Toast, Modal, EmptyState
├── pages/
│   ├── HomePage/          # Landing page
│   ├── Login/             # Login & signup
│   ├── CoursePage/        # Course catalog + creation modal
│   ├── CourseDetails/     # Single course view + enroll/delete
│   ├── CourseVideos/      # Video player + module sidebar
│   ├── EnrollmentPage/    # User's enrolled courses
│   ├── InstructorPage/    # Instructor listing
│   ├── InstructorDetails/ # Single instructor profile
│   ├── ProfilePage/       # User profile + edit modal
│   └── UpdateCoursePage/  # Edit course form
├── services/
│   └── api.js             # Axios API client
├── theme/
│   ├── theme.css          # CSS variables (light/dark)
│   └── ThemeProvider.jsx  # Theme context + toggle hook
├── utils/
│   └── getErrorMessage.js # Error message parser
├── App.js                 # Root layout + routes
├── index.js               # Entry point (providers)
└── index.css              # Global styles + login page styles
```

## Routes

| Path | Access | Page |
|------|--------|------|
| `/` | Public | Landing page |
| `/login` | Public | Login / Signup |
| `/courses` | Public | Course catalog |
| `/courses/:courseId` | Auth required | Course details |
| `/instructors` | Public | Instructor listing |
| `/instructor/:instructorId` | Public | Instructor profile |
| `/course/:courseId/video` | Auth required | Video player |
| `/enrollments` | Auth required | My enrollments |
| `/profile/:id` | Auth required | User profile |
| `/updatecourse/:courseId` | Auth required | Edit course (instructor) |

## License

This project is open source and available under the [MIT License](LICENSE).
