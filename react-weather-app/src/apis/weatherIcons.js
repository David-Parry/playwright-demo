// Weather icons handling module

import Thunder from "./../assets/static/thunder.svg";
import Day from "./../assets/static/day.svg";
import Drizzle from "./../assets/static/rainy-5.svg";
import Rainy from "./../assets/static/rainy-7.svg";
import Snowy from "./../assets/static/snowy-6.svg";
import FreezingRain from "./../assets/static/freezing-rain.svg";
import Misty from "./../assets/static/mist.svg";
import BrokenClouds from "./../assets/static/broken-clouds.svg";
import OvercastClouds from "./../assets/static/overcast-clouds.svg";
import ScatteredClouds from "./../assets/static/scattered-clouds.svg";
import FewClouds from "./../assets/static/few-clouds.svg";
import Haze from "./../assets/static/haze.svg";

// Icon mapping object for easy lookup
const WEATHER_ICONS = {
  // Thunderstorm
  '2xx': Thunder,
  // Drizzle
  '3xx': Drizzle,
  // Rain
  '5xx': Rainy,
  '511': FreezingRain,
  // Mist
  '701': Misty,
  '7xx': Haze,
  // Clear sky
  '800': Day,
  // Clouds
  '801': FewClouds,
  '802': ScatteredClouds,
  '803': BrokenClouds,
  '804': OvercastClouds
};

/**
 * Get the appropriate weather icon based on the weather code
 * @param {number} code - Weather condition code from the API
 * @returns {string} - Path to the SVG icon
 */
export const getWeatherIcon = (code) => {
  // Check exact matches first
  if (WEATHER_ICONS[code.toString()]) {
    return WEATHER_ICONS[code.toString()];
  }
  
  // Check ranges
  const codePrefix = Math.floor(code / 100) + 'xx';
  
  if (WEATHER_ICONS[codePrefix]) {
    return WEATHER_ICONS[codePrefix];
  }
  
  // Default case
  return Day;
}; 