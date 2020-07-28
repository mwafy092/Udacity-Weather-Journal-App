// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const api = '5667a9881799123df15222c58542c78b';

// getting data from user input
document.getElementById('generate-btn').addEventListener('click', () => {
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feeling').value;
    getWeather(baseURL, zip, code, api);
})

// get weather fetch function
let getWeather = async (url, zip, code, api) => {
    const newURL = `${url}${zip}&appid=${api}`
    const response = await fetch(newURL);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log('Error:', error);
    }
}