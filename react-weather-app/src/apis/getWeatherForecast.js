import jQuery from "jquery";
import { db } from "./../backend/app_backend";
import { WEATHER_API_KEY, WEATHER_BASE_URL } from "./config";
import { handleApiError } from "./utils";

/**
 * Get weather forecast data
 * @param {string} location - Optional location (defaults to "Nigeria" if not provided)
 * @returns {Promise} - Promise that resolves with the forecast data
 */
export const getWeatherForecast = (location = "Nigeria") => {
  return new Promise((resolve, reject) => {
    jQuery(($) => {
      $.noConflict();
      
      $.ajax({
        url: `${WEATHER_BASE_URL}/forecast?q=${location}&appid=${WEATHER_API_KEY}`,
        success: (result, status, xhr) => {
          if (result.cod == 200) {
            // Store forecast data in local storage for offline use
            db.create("FORECAST_DATA", JSON.stringify(result));
            resolve(result);
          } else {
            reject(new Error("Invalid response from forecast API"));
          }
        },
        error: (xhr, status, error) => {
          console.log(error);
          handleApiError(error);
          reject(error);
        }
      });
    });
  });
};
