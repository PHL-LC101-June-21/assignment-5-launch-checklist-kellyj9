// Write your JavaScript code here!

window.addEventListener("load", function() {

    let form = document.querySelector("form");
    form.reset(); // needed to clear the form when the window is reloaded
    document.getElementById("faultyItems").style.visibility = "hidden"; // reset visibility of the form element

    let listedPlanets; // will hold array of objects
    
    // Set listedPlanetsResponse equal to the returned value of myFetch() 
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
 
    }).then(function () {
        console.log(listedPlanets);
    // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.

        // select a random planet object from the planets array
        let planet = pickPlanet(listedPlanets);

        // get the planet key values
        let planetName = planet["name"];
        let planetDiameter= planet["diameter"];
        let planetStar = planet["star"];
        let planetDistance = planet["distance"];
        let planetMoons = planet["moons"];
        let planetImageUrl = planet["image"];

        // display the planet data for the mission target
        addDestinationInfo(document, planetName, planetDiameter, planetStar, planetDistance, planetMoons, planetImageUrl);

        // get the form data...
        //let form = document.querySelector("form");
        form.addEventListener("submit", function(event) {
            let pilotValue = document.querySelector("input[name=pilotName]").value;
            let copilotValue = document.querySelector("input[name=copilotName").value;
            let fuelLevelValue = document.querySelector("input[name=fuelLevel").value;
            let cargoLevelValue = document.querySelector("input[name=cargoMass").value;
            let list = document.getElementById("faultyItems");
            
            // reset the style and innerHtml of the launch status messages section each time the form is submitted
            list.style.visibility = "hidden"; 
            document.getElementById("pilotStatus").innerHTML = `Pilot Ready`;
            document.getElementById("copilotStatus").innerHTML = `Co-pilot Ready`;
            document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
            document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;
            document.getElementById("launchStatus").innerHTML = `Awaiting Information Before Launch`;
            document.getElementById("launchStatus").style.color = "black";

            // ...validate the form and update the launch status / list area of the page
            formSubmission(document, list, pilotValue, copilotValue, fuelLevelValue, cargoLevelValue);
            // but don't submit
            event.preventDefault();
        });
    });
});