/**
 * Establishes a WebSocket connection with the server using the Socket.IO library.
 * This connection is used to send and receive location data between the client and server.
 */
const socket = io();

/**
 * Watches the user's geolocation and emits the latitude and longitude coordinates to the server via a WebSocket connection.
 * This function uses the browser's built-in `navigator.geolocation.watchPosition()` API to continuously track the user's location.
 * If the user's location is successfully retrieved, the latitude and longitude coordinates are emitted to the server using the `send-location` event.
 * If there is an error retrieving the user's location, the error message is logged to the console.
 * The function is configured to use high accuracy, a 5-second timeout, and no maximum age for the location data.
 */
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      /**
       * Extracts the latitude and longitude coordinates from the `position.coords` object.
       * This is used to retrieve the user's current location from the browser's geolocation API.
       * The extracted latitude and longitude values are then emitted to the server via a WebSocket connection.
       *
       */
      const { latitude, longitude } = position.coords;
      /**
       * Emits the user's current latitude and longitude coordinates to the server via a WebSocket connection.
       * This function is called within the `navigator.geolocation.watchPosition()` callback when the user's location is successfully retrieved.
       * The latitude and longitude values are sent to the server using the `send-location` event.
       *
       */
      socket.emit("send-location", {
        latitude: latitude,
        longitude: longitude,
      });
    },
    (error) => {
      console.log("Error: " + error.message);
    },
    /**
     * Configuration options for the `navigator.geolocation.watchPosition()` function.
     * These options specify that the location data should be retrieved with high accuracy,
     * a timeout of 5 seconds, and no maximum age for the location data.
     */
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
}

/**
 * Initializes a new Leaflet map and sets its initial view to the coordinates (0, 0) with a zoom level of 16.
 * This map will be used to display the locations of connected users.
 */
const map = L.map("map").setView([0, 0], 16);
const markers = {};

/**
 * Adds a tile layer from OpenStreetMap to the map.
 * This tile layer provides the base map tiles that are displayed in the Leaflet map.
 * The tile layer is configured to use the OpenStreetMap tile server, and the attribution is set to "OpenStreetMap".
 * The tile layer is then added to the map using the `addTo()` method.
 */
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "OpenStreetMap",
}).addTo(map);

/**
 * Handles the "receive-location" event emitted from the server, which contains the latitude and longitude coordinates of a connected user.
 * This function updates the position of the user's marker on the map, or creates a new marker if one doesn't already exist.
 */
socket.on("receive-location", (data) => {
  const { id, latitude, longitude } = data;
  map.setView([latitude, longitude]);

  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    markers[id] = L.marker([latitude, longitude]).addTo(map);
  }
});

/**
 * Handles the "user-disconnected" event emitted from the server, which indicates that a connected user has disconnected.
 * This function removes the marker for the disconnected user from the map, and deletes the marker from the `markers` object.
 * @param {string} id - The ID of the disconnected user.
 */
socket.on("user-disconnected", function (id) {
  if (markers[id]) {
    map.removeLayer(markers[id]);
    delete markers[id];
  }
});
