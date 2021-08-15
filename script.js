// Write your JavaScript code here!

window.addEventListener("load", function() {
    let form = document.querySelector("form");
    form.reset(); // added to clear the form
    document.getElementById("faultyItems").style.visibility = "hidden";

    let result = [];
    let listedPlanets;
    
    // Set listedPlanetsResponse equal to the value returned by calling myFetch() 
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);

    // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.

        let planet = pickPlanet(listedPlanets);

        let planetName = planet["name"];
        let planetDiameter= planet["diameter"];
        let planetStar = planet["star"];
        let planetDistance = planet["distance"];
        let planetMoons = planet["moons"];
        let planetImageUrl = planet["image"];

        addDestinationInfo(document, planetName, planetDiameter, planetStar, planetDistance, planetMoons, planetImageUrl);

        document.getElementById("faultyItems").style.visibility = "hidden";

        let form = document.querySelector("form");
        form.addEventListener("submit", function(event) {
            //let pilot = document.querySelector("input[name=pilotName]");
            let pilot = document.getElementsByName("pilotName")[0].value;
            let copilot = document.getElementsByName("copilotName")[0].value;
            let fuelLevel = document.getElementsByName("fuelLevel")[0].value;
            let cargoLevel = document.getElementsByName("cargoMass")[0].value;
            let list = document.getElementById("faultyItems");
         
            formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
            event.preventDefault();
        });
    });
});