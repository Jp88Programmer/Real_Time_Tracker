const express = require("express");
const app = express();
const path = require("path");
const socket = require("socket.io");
const http = require("http");
const port = 9090;
const server = http.createServer(app);

/**
 * Sets the view engine for the Express application to use EJS (Embedded JavaScript) templates.
 *
 * This configuration ensures that the application will use EJS as the templating engine for rendering views.
 * EJS allows for the embedding of JavaScript code within HTML templates, enabling dynamic rendering of pages.
 */
app.set("view engine", "ejs");

/**
 * Serves static files from the 'public' directory.
 *
 * This middleware function is used to serve static files, such as CSS, JavaScript, and images, from the 'public' directory.
 * It allows the Express application to serve these static assets to clients, enabling the web application to load
 * and display the necessary resources.
 */
app.use(express.static(__dirname + "/public"));

/**
 * Sets the directory where the application's views (templates) are located.
 *
 * This configuration ensures that the Express application will look for view files in the 'views' directory
 * relative to the current working directory (__dirname). This allows the application to properly render
 * the necessary templates for the web pages.
 */
app.set("views", path.join(__dirname, "views"));

/**
 * Initializes the Socket.IO server and associates it with the HTTP server.
 *
 * This line of code creates a Socket.IO server instance and associates it with the existing HTTP server.
 * The Socket.IO server is responsible for handling real-time, bidirectional communication between the
 * client-side and server-side components of the application.
 */
const io = socket(server);

/**
 * Handles WebSocket connections and events.
 *
 * When a client connects, it listens for the following events:
 * - 'send-location': Receives location data from the client and broadcasts it to all connected clients.
 * - 'disconnect': Emits an event to notify all connected clients that a user has disconnected.
 *
 * @param {object} socket - The WebSocket connection object.
 */
io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    console.log(data);
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
  console.log("connected..");
});

/**
 * Renders the 'index' view when the root URL is accessed.
 *
 * This route handler is responsible for rendering the main index view of the application when the user visits the root URL.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 */
app.get("/", function (req, res) {
  res.render("index");
});

/**
 * Starts the HTTP server and listens for incoming requests on the specified port.
 *
 * This code block starts the HTTP server and listens for incoming requests on the port specified by the `port` variable.
 * When the server starts listening, it logs a message to the console indicating the port it is listening on.
 *
 * @param {number} port - The port number on which the server should listen for incoming requests.
 */
server.listen(port, function () {
  console.log("listening on port", port);
});
