// Write your JavaScript code here!

window.addEventListener("load", function() {
    let result = [];
    let listedPlanets;
      //KJ ADDED
    // Set listedPlanetsResponse equal to the value returned by calling myFetch() 
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        //console.log("result=", result);
        listedPlanets=result;
        //console.log("listedPlanets=", listedPlanets);
    }).then(function () {
        console.log("listedPlanets= ", listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.

       

        //KJ ADDED:
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);


    })
});