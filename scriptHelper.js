// Write your helper functions here!
require('isomorphic-fetch');

// displays the planet data for the mission target
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = 
    // Here is the HTML formatting for our mission target div.
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
    //testInput = testInput.trim(); // (autograder does not like this line)
    if (testInput === '') {
        return 'Empty';
    } 
    // Note: parseFloat will return NaN when the first non-whitespace character cannot be converted to a number.
    // note: input also must be > 0
    else if ((!isNaN(parseFloat(testInput)) && isFinite(testInput)) && (parseFloat(testInput) >= 0)) {
        return 'Is a Number';
    }
    else if (isNaN(testInput)) {
        return 'Not a Number';
    }
}

// 
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    // reset the style and innerHtml of the launch status
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

    // if all field data was valid, check fuel level and cargo level
    if (isValidData) {
        // display the pilot and copilot status
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
        document.getElementById("copilotStatus").innerHTML= `Co-pilot ${copilot} is ready for launch`;

        // check fuel level and display message if too low
        if (fuelLevel < 10000) {
            list.style.visibility = "visible";
            document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;
            document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready for Launch`;
            document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)";  // red
            isValidData = false;
        }
        //check cargo level and display message if too heavy
        if (cargoLevel > 10000) {
            list.style.visibility = "visible";
            document.getElementById("cargoStatus").innerHTML = `Cargo mass too heavy for launch`;
            document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready for Launch`;
            document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)"; // red
            isValidData = false;
        }

        // if all data was valid and fuel level and cargo level were within range, display launch ready message
        if (isValidData) {
            list.style.visibility = "visible";
            document.getElementById("launchStatus").style.color ="rgb(65, 159, 106)" // green
            document.getElementById("launchStatus").innerHTML = `Shuttle is Ready for Launch`;
        }
    }
}

// fetches the JSON from the URL, stores it in planetsReturned, and returns the Promise 
async function myFetch(myURL) {
    planetsReturned = await fetch(myURL).then( function(response) {
        let result = response.json();
        return result;
    });
    return planetsReturned;
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
