# Portfolio Dashboard

A responsive and dynamic portfolio dashboard built with Angular, TailwindCSS, and Flowbite. This project allows users to manage and showcase their skills, projects, services, experience and education.

## Features

- **Authentication** – Login and logout functionality.
- **Dynamic Dashboard** – Manage and display skills, projects, and education.
- **Search and Pagination** – Browse through content efficiently.
- **Responsive Design** – Optimized for all screen sizes using TailwindCSS and Flowbite.
- **Standalone Components** – Modular Angular components for reusability.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Angular CLI](https://angular.io/cli) (v17 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio-dashboard
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Update environment configuration:
   ```bash
   Open src/environments/environment.ts
   ```

# Running the Application

To start the development server:

```bash
npm start
```

The app will run at http://localhost:4200

# Building for Production

To create a production build:

```bash
npm run build
```

The output will be located in the dist/ folder.

# Testing

To execute unit tests:

```bash
npm test
```

# Project Structure

```bash
src/
├── app/
│   ├── core/          # Services, interfaces, guards
│   ├── layouts/       # Global layout components (header, footer)
│   ├── modules/       # Feature modules (skills, projects, education, experience, services)
│   ├── pages/         # Page-level components (home, login, dashboard)
│   ├── shared/        # Shared UI components (spinner, pagination, etc.)
├── assets/            # Images, fonts, and static assets
├── environments/      # Environment-specific configuration
```

# Dependencies

- Angular – Frontend framework.

- TailwindCSS – Utility-first CSS framework.

- Flowbite – Pre-built Tailwind UI components.

- Angular Notifier – Toast-style notifications.

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo

2. Create your feature branch (git checkout -b feature/YourFeature)

3. Commit your changes (git commit -m 'Add YourFeature')

4. Push to the branch (git push origin feature/YourFeature)

5. Open a pull request

# Acknowledgments
- [Angular](https://angular.dev)

- [TailwindCSS](https://tailwindcss.com/)

- [Flowbite](https://flowbite.com/)
