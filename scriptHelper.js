// Write your helper functions here!
require('isomorphic-fetch');

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

//validateInput() should take in a string as a parameter and return "Empty", "Not a Number", or "Is a Number" as appropriate
function validateInput(testInput) {
    //testInput = testInput.trim();
    //if (typeof testInput !== 'string') {
    //    return 'Failed: input not a String';
    //}
    if (testInput === '') {
        return 'Empty';
    }
    else if (isNaN(testInput)) {
        return 'Not a Number';
    }
    else if (!isNaN(parseFloat(testInput)) && isFinite(testInput)) {
        return 'Is a Number';
    }
}


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    // pilot.textContent = "Pilot Ready";
    // copilotStatus.textContent = "Co-pilot Ready";
    // fuelStatus.textContent = "Fuel level high enough for launch";
    // cargoStatus.textContent = "Cargo mass low enough for launch";
    list.style.visibility = "hidden"; // reset
    document.getElementById("pilotStatus").innerHTML = "Pilot Ready";
    document.getElementById("copilotStatus").innerHTML = "Co-pilot Ready";
    document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
    document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;


    let pilotType = validateInput(pilot);
    let copilotType = validateInput(copilot);
    let fuelLevelType = validateInput(fuelLevel);
    let cargoLevelType = validateInput(cargoLevel);

    let isValidData = true;

    if ((pilotType === "Empty") || (copilotType === "Empty") || (fuelLevelType === "Empty") || (cargoLevelType === "Empty")) {
        alert('All fields are required!');
        isValidData = false;
    }
    else if ((pilotType === "Is a Number") || (copilotType === "Is a Number")){
        alert("Make sure to enter valid information for each field!");
        isValidData = false;
    }
    else if ((fuelLevelType === "Not a Number") || (cargoLevelType === "Not a Number")) {
        alert("Make sure to enter valid information for each field!");
        isValidData = false;
    }

    //console.log("list=", list);
    //console.log(document.getElementById("pilotStatus").innerHTML);
    if (isValidData) {
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
        document.getElementById("copilotStatus").innerHTML= `Co-pilot ${copilot} is ready for launch`;

        if (fuelLevel < 10000) {
            list.style.visibility = "visible";
            document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;
            document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready for Launch`;
            document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)";  // red
            isValidData = false;
        }
        if (cargoLevel > 10000) {
            list.style.visibility = "visible";
            document.getElementById("cargoStatus").innerHTML = `Cargo mass too heavy for launch`;
            document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready for Launch`;
            document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)"; // red
            isValidData = false;
        }

        if (isValidData) {
            list.style.visibility = "visible";
            document.getElementById("launchStatus").style.color ="rgb(65, 159, 106)" // green
            document.getElementById("launchStatus").innerHTML = `Shuttle is Ready for Launch`;

        }
    }
    //return isValidData;
}

async function myFetch() {

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        result = response.json();
        return result;
    });
    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random()*planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
