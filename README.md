# Real-Time Location Tracker

This real-time location tracking application is built with Node.js, Express, and Socket.IO. It allows users to share their location in real time and view the locations of other connected users.

## Features

- Real-time location sharing
- Multiple-user support
- Instant updates when users connect or disconnect
- Simple and intuitive user interface

## Preview

![image](https://github.com/user-attachments/assets/c1e8f4cf-2766-480d-9c9d-709d7b66342a)

## Technologies Used

- Node.js
- Express.js
- Socket.IO
- EJS (Embedded JavaScript templating)

## Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/real-time-tracker.git
```

2. Navigate to the project directory:

```
cd real-time-tracker
```
3. Install dependencies:

```
npm install
```

4. Start the server:

```
node app.js
```

5. Open your browser and visit `http://localhost:9090`

## How It Works

- The server is set up using Express and HTTP modules.
- Socket.IO is used for real-time, bidirectional communication between the server and clients.
- When users connect, they can share their location using the 'send-location' event.
- The server broadcasts the received location to all connected clients.
- When a user disconnects, all other users are notified.

## Project Structure

- `app.js`: Main server file
- `views/`: Contains EJS templates
- `public/`: Stores static files (CSS, client-side JS, images)

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/Jp88Programmer/Real_Time_Tracker/issues).

