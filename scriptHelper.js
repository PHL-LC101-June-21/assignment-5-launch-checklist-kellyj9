// Write your helper functions here!
require('isomorphic-fetch');

// displays the planet data for the mission target
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = 
    // Here is the HTML formatting for our mission target div
        `<h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">`
}

// takes in a string as a parameter and returns "Empty", "Not a Number", or "Is a Number" as appropriate
function validateInput(testInput) {
    if (testInput === '') {
        return 'Empty';
    } 
    // note: parseFloat will return NaN when the first non-whitespace character cannot be converted to a number.
    // note: added validation that input also must be > 0
    else if ((!isNaN(parseFloat(testInput)) && isFinite(testInput)) && (parseFloat(testInput) >= 0)) {
        return 'Is a Number';
    }
    else if (isNaN(testInput)) {
        return 'Not a Number';
    }
}

// validates the form data, alerts for any invalid input, checks the data for out of range numbers, 
// and displays launch status messages 
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    // reset the style and innerHtml of the launch status messages section each time the form is submitted
    list.style.visibility = "hidden"; 
    document.getElementById("pilotStatus").innerHTML = `Pilot Ready`;
    document.getElementById("copilotStatus").innerHTML = `Co-pilot Ready`;
    document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
    document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;
    document.getElementById("launchStatus").innerHTML = `Awaiting Information Before Launch`;
    document.getElementById("launchStatus").style.color = "black";

    // start data validation
    let pilotType = validateInput(pilot);
    let copilotType = validateInput(copilot);
    let fuelLevelType = validateInput(fuelLevel);
    let cargoLevelType = validateInput(cargoLevel);

    // this object defines the allowable types of data for the form fields
    let validTypes = {
        "validPilotType": "Not a Number", 
        "validCopilotType": "Not a Number",
        "validFuelLevelType": "Is a Number",
        "validCargoLevelType": "Is a Number"
    }

    let isValidData = true; // flag changes to false when field data is invalid or out of range

    // validate data in form fields
    if ((pilotType === "Empty") || (copilotType === "Empty") || (fuelLevelType === "Empty") || (cargoLevelType === "Empty")) {
        alert('All fields are required!');
       isValidData = false;
    }
    else if ((pilotType !== validTypes["validPilotType"]) || (copilotType !== validTypes["validCopilotType"]) || 
        (fuelLevelType !== validTypes["validFuelLevelType"]) || (cargoLevelType != validTypes["validCargoLevelType"])) {
        alert("Make sure to enter valid information for each field!");
        isValidData = false;
    }

    // if all field data contained proper data types:
    //  - set messages to be displayed for the pilot and copilot statuses
    //  - check fuel level and cargo level.  set messages to be displayed if fuel level and cargo level are out of range
    //  - if cargo level or fuel level are in range, set message stating launch ready  
    //  - make the container for the launch status messages visibile
    if (isValidData) {
        // set messages regarding the pilot and copilot status
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;

        // check fuel level.  if too low, set messages
        if (fuelLevel < 10000) {
            document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;
            document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready for Launch`;
            document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)";  // red
            isValidData = false;
        }
        //check cargo level.  if too heavy, set messages
        if (cargoLevel > 10000) {
            document.getElementById("cargoStatus").innerHTML = `Cargo mass too heavy for launch`;
            document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready for Launch`;
            document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)"; // red
            isValidData = false;
        }

        // if all data was valid and fuel level and cargo level were within range, set launch ready message
        if (isValidData) {
            document.getElementById("launchStatus").style.color = "rgb(65, 159, 106)" // green
            document.getElementById("launchStatus").innerHTML = `Shuttle is Ready for Launch`;
        }

        // proper data types were entered, show the list of launch status list whether shuttle is ready for launch or not
        list.style.visibility = "visible";
    }
}

//  fetch a resource containing JSON and return the Response
/* Notes: The simplest use of fetch() takes one argument — the path to the resource you want to fetch — 
and does not directly return the JSON response body but instead returns a promise that resolves with a Response object.
The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation 
of the entire HTTP response. So, to extract the JSON body content from the Response object, we use the json() method, 
which returns a second promise that resolves with the result of parsing the response body text as JSON

Another Note: Despite the method being named json(), the result is not JSON but is instead the result of 
taking JSON as input and parsing it to produce a JavaScript object.
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
https://developer.mozilla.org/en-US/docs/Web/API/Response/json
*/

async function myFetch() {
    let myURL = "https://handlers.education.launchcode.org/static/planets.json";
    planetsReturned = await fetch(myURL).then( function(response) {
        return response.json();  // return JSON array
    });
    return planetsReturned; // When fetch completes, return the Response object
}

// returns a random planet object from the planets array
function pickPlanet(planets) {
    return planets[Math.floor(Math.random()*planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
