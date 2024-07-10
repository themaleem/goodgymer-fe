Here is the complete README for your frontend application:

````markdown
# GoodGymer Frontend

## Overview

The GoodGymer Frontend is a React application built with Next.js that consumes the GoodGymer Session Management API. It allows users to view and register for sessions, manage their profiles, and more. The application uses Redux for state management, React Final Form for form handling, and SWR for data fetching. It also includes custom input fields and an Axios interceptor for API requests.

## Included

- **User Authentication:** Login and signup functionality integrated with the GoodGymer Session Management API.
- **Session Management:** View, register, and unregister for sessions.
- **Profile Management:** View and update user profiles.
- **State Management:** Uses Redux to manage the logged-in user state.
- **Form Handling:** Uses React Final Form with custom input fields for robust form management.
- **Data Fetching:** Uses SWR for efficient data fetching and caching.
- **API Requests:** Custom Axios interceptor for handling API requests and responses.

## Running the Project

### Prerequisites

- Node.js => v18.19.0
- npm => 10.2.3

### Setup Instructions

1. **Clone the Repository**

   ```sh
   git clone https://github.com/themaleem/goodgymer-fe.git
   cd goodgymer-fe
   ```
````

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Run the Development Server**

   ```sh
   npm run dev
   ```

4. **Setup and run the backend development server**
   -- As documented in https://github.com/themaleem/goodgymer-be?tab=readme-ov-file#goodgymer-session-management-api

5 **Visit on browser**
-- entry `localhost:2000/auth/sign-up`

## Project Structure

- `components/`: Contains all the React components including:
  -- reusable custom input compontent
  -- Notification toaster component
  -- reusable custom input compontent
  etc
- `pages/`: Contains all the Next.js entry pages for routing.
- `actions/`: Contains actions files for API calls.
- `config/`: Contains app level configuration methods.
- `containers/`: Contains HOCs and custom hooks components
- `reducers/`: Contains authentication state reducers and slices
- `lib/`: Contains reusable methods and helper.
- `swr/`: Contains SWR configuration for data fetching.

## Key Libraries and Tools

- **Next.js:** Framework for server-side rendering and static site generation.
- **Redux:** State management library.
- **React Final Form:** Form handling library.
- **SWR:** React Hooks library for data fetching.
- **Axios:** Promise-based HTTP client for making API requests.
