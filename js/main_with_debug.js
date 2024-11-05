// Initialize function called when the script loads
function initialize() {
    cities();
}

// Define an array of objects for cities and population
function cities() {    
    var cityPop = [
        { 
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    ];

    // Create a table element
    var table = document.createElement("table");

    // Create a header row
    var headerRow = document.createElement("tr");

    // Add the "City" and "Population" columns to the header row
    headerRow.insertAdjacentHTML("beforeend", "<th>City</th><th>Population</th>");

    // Add the header row
    table.appendChild(headerRow);

    // Loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++) {
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        table.insertAdjacentHTML('beforeend', rowHtml);
    }

    document.querySelector("#mydiv").appendChild(table);

    // Call addColumns and addEvents functions
    addColumns(cityPop);
    addEvents();
}

document.addEventListener('DOMContentLoaded', initialize);

// Add an if-else statement to add a new column
function addColumns(cityPop) {
    document.querySelectorAll("tr").forEach(function(row, i) {
        if (i === 0) {
            row.insertAdjacentHTML("beforeend", "<th>City Size</th>");
        } else {
            var citySize;
            if (cityPop[i - 1].population < 100000) {
                citySize = 'Small';
            } else if (cityPop[i - 1].population < 500000) {
                citySize = 'Medium';
            } else {
                citySize = 'Large';
            }
            row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
        }
    });
}

function addEvents() {
    document.querySelector("table").addEventListener("mouseover", function() {
        var color = "rgb(";
        for (var i = 0; i < 3; i++) {
            var random = Math.round(Math.random() * 255);
            color += random;
            if (i < 2) {
                color += ",";
            } else {
                color += ")";
            }
        }
        document.querySelector("table").style.color = color;
    });

    document.querySelector("table").addEventListener("click", function() {
        alert('Hey, you clicked me!');
    });
}

// Basic fetch function with callback to handle data
function jsAjax() {
    fetch('data/MegaCities.geojson')
        .then(function(response) {
            return response.json();
        }) 
        .then(function(myData) {
            console.log(myData); // Log the fetched data
            callback(myData); // Pass data to the callback
        })
        .catch(function(error) {
            console.log("Error fetching the GeoJSON data:", error);
        });
}

// Define callback function
function callback(myData) {
    document.querySelector("#mydiv").insertAdjacentHTML('beforeend', '<br>GeoJSON data:<br>' + JSON.stringify(myData));
}

// Load the AJAX request when the window has loaded
window.onload = jsAjax;


// Key Fixes:
// Moved console.log(myData) inside the .then() block of jsAjax() so it logs the data correctly after it’s fetched.
// Passed myData to the callback() function to handle the data properly and insert it into the DOM.
// Removed duplicate insertAdjacentHTML() in callback().
// Added a .catch() block to handle potential errors with the fetch() request.