// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
}

//validateInput() should take in a string as a parameter and return "Empty", "Not a Number", or "Is a Number" as appropriate
function validateInput(testInput) {
    testInput = trim(testInput);
    if (typeof testInput !== 'string') {
        return 'Failed: input not a String';
    }
    else if (testInput === ''){
        return 'Empty';
    }
    else if (isNaN(testInput)){
        return 'Not a Number';
    }
    else if (isNumeric(testInput)) {
        return 'Is a Number';
    }
    else return 'Failed: Unexpected type of input';
}


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    console.log(validateInput("test"));
    
    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
       //let usernameInput = document.querySelector("input[name=username]");
       //let teamName = document.querySelector("input[name=team]");
       //if (usernameInput.value === "" || teamName.value === "") {
       //   alert("All fields are required!");
       //   // stop the form submission
          event.preventDefault();
       //}
    })

}

async function myFetch() {
//KJ ADDED: URL
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
            result = response.json();
            return result;
        });
    return planetsReturned;
}

function pickPlanet(planets) {
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
