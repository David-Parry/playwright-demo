// Configuration file for API settings and constants

import { db } from "../backend/app_backend";

// API Keys
export const WEATHER_API_KEY = "cd34f692e856e493bd936095b256b337";
export const NINJA_API_KEY = "lNhOELJHDMrwCwm40hFvwA==teZv2EboEGJfonOC";

// Weather API base URLs
export const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";
export const CITY_API_URL = "https://api.api-ninjas.com/v1/city";

// Weather settings
export const getWeatherUnit = () => db.get("WEATHER_UNIT") || "metric";

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network Error!",
  GENERAL_ERROR: "Something went wrong!",
  LOCATION_TRACKING: "Changes settings to track default location"
};

// Icon mapping
export const WEATHER_ICON_MAPPING = {
  // Ranges
  THUNDER: { min: 200, max: 299 },
  DRIZZLE: { min: 300, max: 399 },
  RAIN: { min: 500, max: 599 },
  SNOW: { min: 600, max: 699 },
  ATMOSPHERE: { min: 700, max: 799 },
  CLEAR: { code: 800 },
  CLOUDS: { min: 801, max: 899 }
}; 