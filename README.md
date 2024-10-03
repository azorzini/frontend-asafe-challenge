# Table of Contents
- [Introduction](#introduction)
- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
    - [Development](#development)
    - [Production Build](#production-build)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Additional Information](#additional-information)
  - [Code Quality](#code-quality)
  - [Google Lighthouse performance score](#google-lighthouse-performance-score)

## Introduction
This small project is a solution to the A-Safe Frontend Challenge (description in react-front-test.pdf). 
I've tried to make it as simple as possible with the required features.
The person who sent this challenge to me mentioned that is tipically there's a 2h time limit for the challenge which seems a bit short. I've made it in 10-12 hours.

The application is built with Next.js and TypeScript, utilizing features like server-side rendering, dynamic routing, and API routes.

## Demo
A live demo of the application is available at: [https://a-safe-frontend-challenge.netlify.app/](https://a-safe-frontend-challenge.netlify.app/)
Any user can login with any credentials.

## Features
- **User Authentication**: Secure login and logout functionality using NextAuth.js.
- **Protected Routes**: Certain pages are accessible only to authenticated users.
- **User Management**: Display and manage a list of users fetched from an API.
- **Responsive Design**: Mobile-friendly layout with a responsive header and navigation.
- **Dark Mode Support**: Toggle between light and dark themes.
- **Unit Testing**: Comprehensive tests using Jest and React Testing Library.

## Technologies Used
- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **NextAuth.js**
- **Jest**
- **React Testing Library**.
- **Netlify**
- **ESLint & Prettier**
- **@headlessui/react**
- **@heroicons/react**
- **@tanstack/react-table**
- **Chart.js**
- **clsx**
- **use-debounce**
- **Next-themes**

## Getting Started

### Prerequisites
- **Node.js**: Version 20.x
- **Yarn**: Recommended package manager.

### Installation

#### Install Dependencies
```bash
yarn install
```

### Environment Variables
Create a `.env.local` file in the root directory and add the following environment variables:
```dotenv
NEXTAUTH_SECRET=your-secure-secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
- **NEXTAUTH_SECRET**: A secure random string for NextAuth.js.
- **NEXTAUTH_URL**: The base URL of your application.
- **NEXT_PUBLIC_APP_URL**: Public URL accessible in the browser.

### Running the Application

#### Development
To start the development server with hot reloading:
```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

#### Production Build
To build and start the application in production mode:
```bash
yarn build
yarn start
```

## Testing
The project includes unit tests for components and hooks using Jest and React Testing Library.

### Running Tests
```bash
yarn test
```

## Project Structure
```plaintext
frontend-asafe-challenge
├── __tests__
│   └── components
│       ├── Header.test.tsx
│       └── UserTableClient.test.tsx
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth]
│   │   │   │       └── route.ts
│   │   │   └── users
│   │   │       └── route.ts
│   │   ├── fonts
│   │   │   ├── GeistMonoVF.woff
│   │   │   └── GeistVF.woff
│   │   ├── hooks
│   │   │   └── useUsers.ts
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── protected
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   └── components
│       ├── DashboardContent.tsx
│       ├── Header.tsx
│       ├── Providers.tsx
│       ├── ThemeToggle.tsx
│       ├── UserTableClient.tsx
│       ├── UserTableServer.tsx
├── utils
│   ├── chartjs.ts
│   └── middleware.ts
├── .env
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── jest.config.ts
├── jest.setup.ts
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── react-front-test.pdf
└── yarn.lock
```

## Additional Information

### Code Quality
- **ESLint**: Linting configured with recommended settings.
- **Prettier**: Code formatting enforced on save.

### Google Lighthouse performance score

- **/** 100
- **/login** 100
- **/protected** 100
- **/protected/dashboard** 89
- **/protected/users** 97

