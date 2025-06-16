# EventMerch Frontend

EventMerch is a full-stack microservices-based application designed to manage events and merchandise. This document provides an overview of the frontend setup and usage.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **Axios**: A promise-based HTTP client for making API requests.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd EventMerch/frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server, run:
```
npm run dev
```
This will start the application on `http://localhost:3000` (or another port if 3000 is in use).

### Folder Structure

- **src**: Contains the main application code.
  - **components**: Reusable components like Navbar.
  - **pages**: Different pages of the application (Home, Events, Merch, Login).
  - **services**: API service for making requests to the backend.
  - **App.jsx**: Main application component.
  - **main.jsx**: Entry point for the React application.
  
- **public**: Contains static files like `index.html`.

### API Integration

The frontend communicates with the backend services through the API defined in `src/services/api.js`. Ensure that the backend services are running to interact with the frontend.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

### License

This project is licensed under the MIT License. See the LICENSE file for details.