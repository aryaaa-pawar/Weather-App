const apiKey = '277e0c3a50ed6d7f70999a8b6b2654b2';    
const searchBtn = document.getElementById('searchBtn');
const inputBox = document.getElementById('locationInput');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');
const weatherImg = document.getElementById('weatherImg');

// Initialize UI to show default values
initializeUI();

// Add click event listener to the search button
searchBtn.addEventListener('click', () => {
    const location = inputBox.value.trim(); 
    if (location) {
        getWeather(location);  // Call function to get weather data for the specified location
    } else {
        alert("Please enter a location.");
    }
});

// Function to fetch weather data
async function getWeather(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            const errorData = await response.json(); // Get error data from response
            console.error('Error data:', errorData); 
            throw new Error('Location not found'); // Throw an error if not found 
        }
        const data = await response.json(); // Convert the JSON data from the response
        updateUI(data);  // Call function to update the UI with the fetched data
    } catch (error) {
        handleError();   // Handle errors
        alert(error.message);
    }
}

// Function to initialize UI
function initializeUI() {
    handleError();  // Set default values
    weatherImg.src = '/Weather-photo/clear.png'; // Set default image to clear
}

// Function to handle error
function handleError() {
    temperatureElement.innerHTML = `0<sup>°C</sup>`;
    descriptionElement.innerHTML = 'N/A';
    humidityElement.innerHTML = `0%`;
    windSpeedElement.innerHTML = `0 Km/H`;
}

// Function to update the UI
function updateUI(data) {
    const temp = Math.round(data.main.temp);
    const weatherDescription = data.weather[0].description.toLowerCase();
    const humidityValue = data.main.humidity;
    const windSpeedValue = Math.round(data.wind.speed);

    // Update the elements on UI
    temperatureElement.innerHTML = `${temp}<sup>°C</sup>`;
    descriptionElement.innerHTML = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
    humidityElement.innerHTML = `${humidityValue}%`;
    windSpeedElement.innerHTML = `${windSpeedValue} Km/H`;

    // Image based on weather 
    if (weatherDescription.includes('clear')) {
        weatherImg.src = '/Weather-photo/clear.png';
    } else if (weatherDescription.includes('cloud')) {
        weatherImg.src = '/Weather-photo/cloud.png';
    } else if (weatherDescription.includes('mist')) {
        weatherImg.src = '/Weather-photo/mist.png';
    } else if (weatherDescription.includes('rain')) {
        weatherImg.src = '/Weather-photo/rain.png';
    } else if (weatherDescription.includes('snow')) {
        weatherImg.src = '/Weather-photo/snow.png';
    } else if (weatherDescription.includes('haze')) {
        weatherImg.src = '/Weather-photo/haze.png';
    } else if (weatherDescription.includes('smoke')) {
        weatherImg.src = '/Weather-photo/smoke.png';
    } else {
        weatherImg.src = '/Weather-photo/404.png';
    }
}
