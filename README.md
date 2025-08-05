# info-submitter

## Overview

The `info-submitter` project is a web application that allows users to submit, display, and delete data. It features a React-based frontend styled with Material-UI and a Flask backend that uses SQLite for data storage. The app also includes dynamic table columns, reset functionality, and toast notifications for user feedback.

## Features

- **Submit Data**: Users can submit JSON-formatted data through the frontend.
- **Display Data**: Submitted data is displayed in a dynamic table with columns generated based on the data structure.
- **Delete Data**: Users can delete individual entries from the table.
- **Reset Data**: Users can reset all data in the database.
- **Toast Notifications**: Provides feedback for actions like submission, deletion, and errors.

## Prerequisites

- Node.js (for running the frontend)
- Python 3.x (for running the backend)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YuvalOS/info-submitter.git
   cd info-submitter
   ```

2. Install dependencies for the frontend:
   ```bash
   cd src/web
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd ../../src/server
   pip install -r requirements.txt
   ```

## Running the Application

### Backend

1. Navigate to the backend directory:
   ```bash
   cd src/server
   ```

2. Start the Flask server:
   ```bash
   python server.py
   ```

   The backend will be available at `http://localhost:8080`.

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd src/web
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`.

## API Endpoints

### `/submit` (POST)
- **Description**: Submits new data to the database.
- **Request Body**: JSON object with a `data` field.
- **Response**: Success or error message.

### `/` (GET)
- **Description**: Retrieves all data from the database.
- **Response**: List of data entries.

### `/entry/<int:item_id>` (DELETE)
- **Description**: Deletes a specific data entry by ID.
- **Response**: Success or error message.

### `/reset` (POST)
- **Description**: Resets the database by deleting all data.
- **Response**: Success message.

## Folder Structure

```
info-submitter/
├── src/
│   ├── server/          # Backend code
│   │   ├── server.py    # Flask app
│   │   ├── database.db  # SQLite database
│   │   ├── requirements.txt     # Backend dependencies
│   │   ├── tests/       # Test files
│   │   │   ├── test_server.py  # Unit tests for the backend
│   │   └── ...
│   └── web/             # Frontend code
│       ├── src/
│       │   ├── App.tsx  # Main React component
│       │   └── ...
└── README.md            # Project documentation
```

## Testing

1. Navigate to the `tests` directory:
   ```bash
   cd tests
   ```

2. Run the tests:
   ```bash
   python -m unittest
   ```

## License

This project is licensed under the MIT License.