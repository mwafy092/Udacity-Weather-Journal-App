
// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const api = '5667a9881799123df15222c58542c78b';

// getting data from user input
document.getElementById('generate').addEventListener('click', () => {
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    const date = new Date();
    newDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    getWeather(baseURL, zip, api)
        .then(data => {
            let temp = Math.round(data.main.temp * 9 / 5 - 459.67);
            postData('/postData', { date: newDate, temp: temp, content: feeling });
        })
        .then(data => {
            updateUI();
        })
})

// get weather fetch function
let getWeather = async (url, zip, api) => {
    const newURL = `${url}${zip}&appid=${api}`
    const response = await fetch(newURL);
    try {
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log('Error:', error);
    }
}

// get route to fetch data from server
const updateUI = async () => {
    const request = await fetch('/allData');
    try {
        const allData = await request.json()
        console.log(allData)
        // update new entry values
        document.getElementById('date').innerHTML = '<span>Date</span><br>' + allData.date;
        document.getElementById('temp').innerHTML = '<span>Temperature</span><br>' + allData.temp + ' F';
        document.getElementById('content').innerHTML = '<span>User Entry</span><br>' + allData.content;
    }
    catch (error) {
        console.log("error", error);
    }
};

// post route to post data to server
const postData = async (url = '', data = {}) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    try {
        const data = request.json();
        return data;
    }
    catch (error) {
        console.log('Error:', error);
    }
}