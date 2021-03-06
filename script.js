// Write your JavaScript code here!

window.addEventListener("load", function() {

    let form = document.querySelector("form");
    form.reset(); // needed to clear the form when the window is reloaded
    document.getElementById("faultyItems").style.visibility = "hidden"; // reset visibility of the launch status / list area

    // get the form data...
    form.addEventListener("submit", function(event) {
        let pilotValue = document.querySelector("input[name=pilotName]").value;
        let copilotValue = document.querySelector("input[name=copilotName").value;
        let fuelLevelValue = document.querySelector("input[name=fuelLevel").value;
        let cargoLevelValue = document.querySelector("input[name=cargoMass").value;
        let list = document.getElementById("faultyItems");

        // ...validate the form and update the launch status / list area of the page
        formSubmission(document, list, pilotValue, copilotValue, fuelLevelValue, cargoLevelValue);
        // ...but don't submit
        event.preventDefault();
    });

    let listedPlanets; // will hold JSON
    
    // set listedPlanetsResponse equal to a Response object when the fetch is complete
    let listedPlanetsResponse = myFetch();
    // when the fetch is complete, set listed planets equal to the JSON
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);

    // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.

        // select a random planet object from the planets array
        let planet = pickPlanet(listedPlanets);

        // get the planet data
        let planetName = planet["name"];
        let planetDiameter= planet["diameter"];
        let planetStar = planet["star"];
        let planetDistance = planet["distance"];
        let planetMoons = planet["moons"];
        let planetImageUrl = planet["image"];

        // display the planet data for the mission target
        addDestinationInfo(document, planetName, planetDiameter, planetStar, planetDistance, planetMoons, planetImageUrl);
   });
});