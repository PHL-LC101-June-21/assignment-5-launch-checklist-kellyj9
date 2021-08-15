// Write your JavaScript code here!

window.addEventListener("load", function() {
    let result = [];
    let listedPlanets;
    
    // Set listedPlanetsResponse equal to the value returned by calling myFetch() 
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        //console.log("result=", result);
        listedPlanets = result;
        console.log(listedPlanets);


                //console.log("listedPlanets= ", listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        
       let planet = pickPlanet(listedPlanets);
    //    let planetName = listedPlanets[planet]["name"];
    //    let planetDiameter= listedPlanets[planet]["diameter"];
    //    let planetStar = listedPlanets[planet]["star"];
    //    let planetDistance = listedPlanets[planet]["distance"];
    //    let planetMoons = listedPlanets[planet]["moons"];
    //    let planetImageUrl = listedPlanets[planet]["image"];
        let planetName = planet["name"];
        let planetDiameter= planet["diameter"];
        let planetStar = planet["star"];
        let planetDistance = planet["distance"];
        let planetMoons = planet["moons"];
        let planetImageUrl = planet["image"];

        addDestinationInfo(document, planetName, planetDiameter, planetStar, planetDistance, planetMoons, planetImageUrl);

    }).then(function () {
        let form = document.querySelector("form");
        //form.reset(); // KJ added to clear the form when loading window
        document.getElementById("faultyItems").style.visibility = "hidden";
        //console.log(document.getElementById("faultyItems").style.visibility);

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