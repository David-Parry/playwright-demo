import { db } from "../backend/app_backend";
import Swal from "sweetalert2";
import * as weatherAPI from "./getCurrentWeather";

// Configuration constants
const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: Infinity
};

/**
 * Shows a notification toast and scrolls to the weather container
 * @param {string} message - Message to display
 * @param {string} icon - SweetAlert icon type ('warning', 'error', 'info', etc.)
 * @param {number} timer - Time in ms before auto-closing
 */
const showNotification = (message, icon = "warning", timer = 2000) => {
  Swal.fire({
    toast: true,
    text: message,
    icon,
    timer,
    position: "top",
    showConfirmButton: false
  }).then(() => {
    weatherAPI.scrollToElement("weatherContainer");
  });
};

/**
 * Fetches weather data based on coordinates
 * @param {Object} coords - Contains latitude and longitude
 */
const fetchWeatherData = (coords) => {
  const longitude = coords.longitude || db.get("USER_LONGITUDE");
  const latitude = coords.latitude || db.get("USER_LATITUDE");
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPI.API_KEY}&units=${weatherAPI.WEATHER_UNIT}`;
  
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      return response.json();
    })
    .then(data => {
      if (data.cod === 200) {
        weatherAPI.updateReactDom(data);
        weatherAPI.scrollToElement("weatherContainer");
      }
    })
    .catch(error => {
      showNotification(error.message, "info", 3000);
    });
};

/**
 * Handles successful geolocation retrieval
 * @param {GeolocationPosition} position - Browser's geolocation position object
 */
const handlePositionSuccess = (position) => {
  const coords = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  };
  
  // If user coordinates aren't saved yet, save them
  if (!db.get("USER_LONGITUDE") && !db.get("USER_LATITUDE")) {
    db.create("USER_LONGITUDE", coords.longitude);
    db.create("USER_LATITUDE", coords.latitude);
  }
  
  // Fetch weather data using coordinates
  fetchWeatherData(coords);
};

/**
 * Handles geolocation errors
 * @param {GeolocationPositionError} error - Browser's geolocation error object
 */
const handlePositionError = (error) => {
  showNotification(error.message);
};

/**
 * Gets user's geolocation and fetches weather data
 */
const getGeolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      handlePositionSuccess,
      handlePositionError,
      GEOLOCATION_OPTIONS
    );
  } else {
    showNotification("Geolocation not supported!", "error", 3000);
  }
};

export default getGeolocation;
