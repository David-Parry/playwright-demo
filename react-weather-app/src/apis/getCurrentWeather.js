import jQuery from "jquery";
import { db } from "../backend/app_backend";
import { getCurrentDate } from "../inc/scripts/utilities";
import Swal from "sweetalert2";
import { getWeatherIcon } from "./weatherIcons";
import { 
	WEATHER_API_KEY, 
	WEATHER_BASE_URL, 
	CITY_API_URL, 
	NINJA_API_KEY, 
	ERROR_MESSAGES 
} from "./config";
import { 
	closeUtilityComponent, 
	scrollToElement, 
	checkWeatherUnitDeg, 
	showToast, 
	handleApiError 
} from "./utils";
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

// Use weather unit from DB or default to metric
export const WEATHER_UNIT = db.get("WEATHER_UNIT") || "metric";

/**
 * Handle weather search form submission
 * @param {Event} e - The form event
 * @param {string} search - Optional search term
 */
export const handleWeatherForm = (e, search) => {
	e.preventDefault();

	if (db.get("TRACK_SAVED_LOCATION_WEATHER") == "false") {
		showToast(ERROR_MESSAGES.LOCATION_TRACKING).then(() => {
			scrollToElement("weatherContainer");
		});
	}

	let userSearch = jQuery("#searchWeather").val() || search;
	getCurrentWeather(userSearch.trim());
	scrollToElement("weatherContainer");
	
	jQuery("#searchWeather").val("");
};

/**
 * Find city by search term
 * @param {string} searchTerm - The city to search for
 * @param {Function} updateDataArray - Callback to update data
 */
export const findCity = (searchTerm, updateDataArray) => {
	if (db.get("TRACK_SAVED_LOCATION_WEATHER") == "false") {
		showToast(ERROR_MESSAGES.LOCATION_TRACKING).then(() => {
			scrollToElement("weatherContainer");
		});
	}
	
	jQuery(($) => {
		console.log("Ajax sent");
		$.ajax({
			url: `${CITY_API_URL}?name=${searchTerm}&limit=4`,
			processData: false,
			headers: {
				'X-Api-Key': NINJA_API_KEY
			},
			success: (result, status, xhr) => {
				if (xhr.status != 200) {
					showToast(ERROR_MESSAGES.GENERAL_ERROR);
				} else {
					console.log(result);
					updateDataArray(result);
				}
			},
			error: (xhr, status, error) => {
				handleApiError(error, () => {
					scrollToElement("weatherContainer");
				});
			},
		});
	});
};

/**
 * Update the DOM with weather data
 * @param {Object} result - Weather data from API
 */
export const updateReactDom = (result) => {
	jQuery(($) => {
		$.noConflict();
		$("#searchWeather").val(" ");
		closeUtilityComponent();
		scrollToElement("weatherContainer");
		
		// Update UI elements
		$("#weatherLocation").html(`${result.name} ${result.sys.country}`);
		$("#currentDeg").html(Math.ceil(result.main.temp));
		$("#weatherDes").html(result.weather[0].description);
		$("#currentDate").html(getCurrentDate());
		
		// Get the correct weather icon
		const weatherIcon = getWeatherIcon(result.weather[0].id);
		$("#main-weather-icon-container").html(
			`<img src=${weatherIcon} alt="main-weather-icon" width="64" height="64"/>`
		);
		
		// Update sub weather components
		$("#wind-value").html(`${result.wind.speed} m/s`);
		$("#humidity-value").html(`${result.main.humidity} %`);
		$("#pressure-value").html(`${result.main.pressure} hPa`);
		
		// Store data for offline caching
		db.create("WEATHER_LOCATION", `${result.name} ${result.sys.country}`);
		db.create("WEATHER_DEG", result.main.temp);
		db.create("WEATHER_DESCRIPTION", result.weather[0].description);
		db.create("WEATHER_CODE", result.weather[0].id);
		db.create("SUB_WEATHER_WIND_VALUE", `${result.wind.speed} m/s`);
		db.create("SUB_WEATHER_HUMIDITY_VALUE", `${result.main.humidity} %`);
		db.create("SUB_WEATHER_PRESSURE_VALUE", `${result.main.pressure} hPa`);
	});
};

/**
 * Get current weather for a location
 * @param {string} location - Location to get weather for
 */
export const getCurrentWeather = (location) => {
	jQuery(($) => {
		const SEARCH_URL = `${WEATHER_BASE_URL}/weather?q=${location}&appid=${WEATHER_API_KEY}&units=${WEATHER_UNIT}`;

		$.ajax({
			url: SEARCH_URL,
			processData: false,
			success: (result, status, xhr) => {
				if (xhr.status != 200) {
					showToast(ERROR_MESSAGES.GENERAL_ERROR);
				} else if (result.cod === 200) {
					updateReactDom(result);
				}
			},
			error: (xhr, status, error) => {
				handleApiError(error, () => {
					scrollToElement("weatherContainer");
				});
			},
		});
	});
};

//function to determine custom icon packs to use
export let weatherSvg;
export const checkWeatherCode = (code) => {
	//check the result code states and allocate different icon svg depending on the weather code
	if (code >= 200 && !(code >= 300)) {
		//Thunder weather status
		weatherSvg = Thunder;
	} else if (code >= 300 && !(code != 400)) {
		//Drizzle weather status
		weatherSvg = Drizzle;
	} else if (code >= 500 && code != 511 && !(code >= 600)) {
		//Rainy weather status
		weatherSvg = Rainy;
	} else if (code >= 700 && code != 701 && !(code >= 800)) {
		//Mist weather status
		weatherSvg = Haze;
	} else if (code == 701) {
		weatherSvg = Misty;
	} else if (code == 511) {
		//Freezing rain weather status
		weatherSvg = FreezingRain;
	} else if (code == 800) {
		weatherSvg = Day;
	} else if (code == 803) {
		//Broken clouds
		weatherSvg = BrokenClouds;
	} else if (code == 804) {
		//overcast clouds
		weatherSvg = OvercastClouds;
	} else if (code == 801) {
		//few clouds
		weatherSvg = FewClouds;
	} else if (code == 802) {
		//few clouds
		weatherSvg = ScatteredClouds;
	} else {
		//weather code doesn't exist
		weatherSvg = "";
	}

	return weatherSvg;
};
