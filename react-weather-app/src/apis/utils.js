// Utility functions for the weather app

import jQuery from "jquery";
import Swal from "sweetalert2";
import { ERROR_MESSAGES } from "./config";
import { db } from "../backend/app_backend";

/**
 * Show a toast notification
 * @param {string} text - Message to display
 * @param {string} icon - Icon type (info, warning, error, success)
 * @param {number} timer - Time in milliseconds to show the toast
 * @returns {Promise} - Promise from SweetAlert
 */
export const showToast = (text, icon = "info", timer = 1000) => {
  return Swal.fire({
    toast: true,
    position: "top",
    text,
    icon,
    showConfirmButton: false,
    timer
  });
};

/**
 * Handle API errors in a standardized way
 * @param {string} error - Error message
 * @param {Function} callback - Optional callback function
 */
export const handleApiError = (error, callback) => {
  jQuery("#searchWeather").val(" ");
  closeUtilityComponent();

  const message = error === "" ? ERROR_MESSAGES.NETWORK_ERROR : error;
  
  showToast(message, error === "" ? "info" : "warning").then(() => {
    if (callback) callback();
  });
};

/**
 * Close the utility component
 */
export const closeUtilityComponent = () => {
  jQuery(($) => {
    $.noConflict();
    $(".cmp").addClass("d-none");
    $(".utility-component").removeClass("add-utility-component-height");
  });
};

/**
 * Scroll to a specific element by ID
 * @param {string} elementId - The ID of the element to scroll to
 */
export const scrollToElement = (elementId) => {
  document
    .getElementById(`${elementId}`)
    .scrollIntoView({ behaviour: "smooth" });
};

/**
 * Check weather unit settings and return the appropriate unit symbol
 * @returns {string} - Unit symbol (c, f, k)
 */
export const checkWeatherUnitDeg = () => {
  let result;
  if (db.get("WEATHER_UNIT")) {
    switch (db.get("WEATHER_UNIT")) {
      case "celsius":
        result = "c";
        break;
      case "farenheit":
        result = "f";
        break;
      case "kelvin":
        result = "k";
        break;
      default:
        result = "c";
    }
  } else {
    // Set default to celsius if not defined
    db.create("WEATHER_UNIT", "celsius");
    result = "c";
  }

  return result;
}; 