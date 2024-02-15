# Song Management App

A Full Stack application for managing songs using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Backend](#backend)
- [Frontend](#frontend)
- [Bonus](#bonus)
- [Contributing](#contributing)
- [License](#license)

## Features
- Create, list, update, and remove songs.
- View overall statistics:
  - Total number of songs, artists, albums, genres.
  - Number of songs in every genre.
  - Number of songs and albums each artist has.
  - Songs in each album, and more.

## Technologies
### Backend
- Express.js: To handle HTTP requests.
- MongoDB: To store song data.
- Mongoose: To interact with MongoDB and create schema.
- Docker: To package the backend application.

### Frontend
- TypeScript: For writing typed code.
- React.js: To build the user interface.
- Redux Toolkit: For state management.
- Redux-Saga: To make calls to the backend.
- Emotion and Styled System: For styling.

## Setup
1. Clone the repository.
2. Navigate to the `backend` folder and run `npm install` to install backend dependencies.
3. Navigate to the `frontend` folder and run `npm install` to install frontend dependencies.
4. Set up MongoDB and update the connection details in the backend configuration.

## Backend
### Running the Backend
1. Navigate to the `backend` folder.
2. Run `npm start` to start the server.

### Docker
- To package the backend using Docker:
  1. Build the Docker image: `docker build -t song-management-app-backend .`
  2. Run the Docker container: `docker run -p 3000:3000 song-management-app-backend`

## Frontend
### Running the Frontend
1. Navigate to the `frontend` folder.
2. Run `npm start` to start the development server.

### Build for Production
- Run `npm run build` to create a production build.

## Bonus
- Add filtering functionality, such as filter by genre.
- Host the application on platforms like Netlify (frontend) and Render (backend).

## Contributing
Contributions are welcome! Please follow the [CONTRIBUTING.md](CONTRIBUTING.md) guidelines.

## License
This project is licensed under the [Addis Software License](LICENSE).


Link: https://songmanagementapp.netlify.app
