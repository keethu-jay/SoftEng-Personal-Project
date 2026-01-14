# Hospital Navigation & Service Management System

A full-stack web application designed to help patients and staff navigate hospital facilities and manage service requests. This project demonstrates proficiency in modern web development technologies and was developed as part of a Software Engineering course at Worcester Polytechnic Institute (WPI).

## Project Overview

This application provides a comprehensive solution for hospital navigation and service management, featuring:

- **Interactive Navigation System**: Step-by-step directions from external locations to specific hospital departments, including parking guidance and indoor floor-by-floor navigation
- **Department Directory**: Searchable directory of all hospital departments with contact information, hours, and locations
- **Service Request Management**: System for requesting equipment, translation services, security, and sanitation services
- **Admin Dashboard**: Administrative interface for managing departments, viewing service requests, and editing hospital floor maps
- **Community Forum**: Discussion forum for patients and staff to ask questions and share information

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive, modern UI design
- **React Router** for client-side routing
- **Google Maps JavaScript API** for interactive mapping and directions
- **Auth0** for authentication and authorization
- **Axios** for API communication
- **Radix UI** components for accessible UI primitives

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **Prisma ORM** for database management
- **PostgreSQL** for relational data storage
- **CORS** enabled for cross-origin requests

### Infrastructure & Tools
- **Monorepo** architecture using **Yarn Workspaces**
- **Turbo** for build optimization and caching
- **Docker** for containerization
- **ESLint** & **Prettier** for code quality
- **Git** with **Husky** for pre-commit hooks

## Key Features

### 1. Multi-Modal Navigation System
- External directions from any location to the hospital using Google Maps
- Automatic parking location detection and routing
- Indoor navigation with floor-by-floor pathfinding
- Step-by-step turn-by-turn directions with visual indicators
- Text-to-speech support for accessibility

### 2. Interactive Map Editor
- Drag-and-drop node editing for hospital floor plans
- Real-time position updates persisted to database
- Visual representation of hospital layouts with custom overlays

### 3. Service Request Hub
- Equipment requests with scheduling
- Translation service requests
- Security service requests
- Sanitation/cleaning requests
- Request tracking and status management

### 4. Department Directory
- Searchable database of all hospital departments
- Filter by building, floor, or department name
- Contact information and operating hours
- Accessible via voice/kiosk interfaces

### 5. Community Forum
- Post questions and share information
- Reply to posts and engage in discussions
- Search functionality
- Pagination for large discussion threads

### 6. Role-Based Access Control
- Patient view with limited access
- Admin view with full system access
- Demo mode for easy showcasing
- Protected routes and API endpoints

## UI/UX Highlights

- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Modern UI**: Clean, minimalist design with pill-shaped buttons and smooth transitions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **User Feedback**: Loading states, error messages, and success notifications
- **Intuitive Navigation**: Clear navigation structure with visual indicators

## Architecture

### Monorepo Structure
```
├── apps/
│   ├── frontend/     # React application
│   └── backend/      # Express API server
├── packages/
│   ├── common/       # Shared constants and utilities
│   └── database/     # Prisma schema and client
└── configs/          # Shared ESLint, Prettier, TypeScript configs
```

### API Design
- RESTful API architecture
- Consistent error handling
- Type-safe request/response handling
- Efficient database queries with Prisma

## Live Demo

**Frontend:** [Your Vercel URL]  
**Backend API:** [Your Render URL]

*Note: The backend may take ~30 seconds to wake up on the first request due to free tier limitations.*

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Yarn 4.7.0+ (via Corepack)
- Google Maps API key
- Auth0 account (for authentication)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd SoftEng-Personal-Project
```

2. Enable Corepack and install dependencies:
```bash
corepack enable
yarn install
```

3. Set up environment variables:
```bash
# Copy .env.example to .env and fill in your values
cp .env.example .env
```

4. Push database schema:
```bash
yarn workspace database push
```

5. Start development servers:
```bash
yarn dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

## Testing

Run the test suite:
```bash
yarn test
```

## Development Notes

- **Code Quality**: ESLint and Prettier are configured for consistent code style
- **Type Safety**: Full TypeScript coverage for both frontend and backend
- **Git Workflow**: Pre-commit hooks ensure code quality before commits
- **Hot Reload**: Fast development experience with Vite HMR

## Project Context

**Original Development:**
- Developed by a team of 9 developers over 7 weeks
- Part of Software Engineering course at WPI
- **My Role**: Lead Assistant Frontend Developer

**Portfolio Adaptation:**
- Codebase copied and adapted for portfolio showcase
- Minor UI/UX improvements and bug fixes
- Deployed to Render and Vercel for easy access
- Added portfolio disclaimer and documentation

## License

This project is part of a portfolio demonstration. The original codebase was created for educational purposes at WPI.

## Author

**Keerthana Jayamoorthy**  
Lead Assistant Frontend Developer | Software Engineering Student

---

*This project demonstrates proficiency in full-stack web development, modern JavaScript frameworks, database design, API development, and deployment practices.*
