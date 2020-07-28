// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8000;
const server = app.listen(port, () => {
    console.log(`Server is running on localhost: ${port}`);
})


// post route
const data = []
app.post('/postData', (request, response) => {
    projectData['date'] = request.body.date;
    projectData['temp'] = request.body.temp;
    projectData['content'] = request.body.content;
    response.send(projectData);
    console.log(projectData);
})

// get route
app.get('/allData', (request, response) => {
    response.send(projectData);
})
