# Job Listing Dashboard

## Overview

Job Listing Dashboard is a modern, responsive web application built with Next.js and React. It provides a platform for job seekers to browse and search for job listings, and for employers to manage job postings. The application features a sleek user interface with a dark/light mode toggle, authentication, and role-based access control. A project for IBCScorp for the fulfillment for the role of software developer.

- **Deployment Link**: [click here](https://job-listing-project-sigma.vercel.app/)

## Features

- User authentication and authorization
- Role-based access control (Job Seeker and HR/Employer roles)
- Job listing browsing and searching
- Filtering jobs by experience level, location, and salary
- Detailed job view pages
- Job management for HR/Employers (Create, Read, Update, Delete)
- Responsive design with mobile support
- Dark/Light mode toggle
- Protected routes for authenticated users

## Technologies Used

- **Next.js 14 (App Router)**: A React framework for server-rendered applications.
- **React 18**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **shadcn/ui components**: A set of reusable UI components.
- **Framer Motion**: A library for creating animations.
- **Lucide React**: A collection of icons for React.
- **Firebase**: A platform for building web and mobile applications.
- **Zustand**: A small, fast, and scalable state management solution.
- **Tanstack Query**: A powerful data-fetching library.
- **Vercel**: A platform for deploying web applications.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/job-listing-dashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd job-listing-dashboard
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. Create a `.env.local` file in the root directory and add any necessary environment variables.

5. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

6. Open your browser and visit `http://localhost:3000` to see the application running.

## Usage

### For Job Seekers

1. Browse job listings on the main dashboard.
2. Use filters to narrow down job searches by experience level, location, and salary.
3. Click on a job listing to view more details.
4. Sign in to access additional features (e.g., saving jobs, applying to positions).

### For Employers/HR

1. Sign in with an HR account.
2. Navigate to the "Manage Jobs" section.
3. Create new job listings, edit existing ones, or remove outdated postings.
4. View and manage applications (feature to be implemented).

## Project Structure

- `app/`: Contains the main application pages and layouts
- `components/`: Reusable React components
- `contexts/`: React context providers (e.g., AuthContext)
- `dto/`: Data Transferable Object
- `hooks/`: Hooks
- `lib/`: Utility functions and shared logic
- `mutations/`: Tanstack mutator functions
- `public/`: Static assets
- `store/`: State management slices
- `styles/`: Global styles and Tailwind CSS configuration
- `.env_sample`: Sample configuration template


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
