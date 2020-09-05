async function goalFormHandler(event) {
    event.preventDefault();
    // Query goal form inputs
    const goaldate = document.querySelector('#goalDate').value.trim();
    const watergoal = document.querySelector('#waterGoal').value.trim();
    const caloriegoal = document.querySelector('#calorieGoal').value.trim();
    const exercisegoal = document.querySelector('#exerciseGoal').value.trim();
    if (watergoal && goaldate) {
        fetch('/api/water/goalcreate/' + goaldate + '/' + watergoal)
            .then(response => response.json())
    } else {
        alert("No updates to your Water goals");
    }
    if (caloriegoal && goaldate) {
        fetch('/api/calorie/goalcreate/' + goaldate + '/' + caloriegoal)
            .then(response => response.json())
    } else {
        alert("No updates to your Food goals");
    }
    if (exercisegoal && goaldate) {
        fetch('/api/exercise/goalcreate/' + goaldate + '/' + exercisegoal)
            .then(response => response.json())
    } else {
        alert("No updates to your Exercise goals");
    }
}
var goalform = document.querySelector('.goalForm')
if (goalform) goalform.addEventListener('submit', goalFormHandler);

async function activityFormHandler(event) {
    event.preventDefault();
    // Query goal form inputs
    const activitydate = document.querySelector('#activityDate').value.trim();
    const waterintake = document.querySelector('#waterIntake').value.trim();
    const calorieintake = document.querySelector('#calorieIntake').value.trim();
    const exerciseintake = document.querySelector('#exerciseIntake').value.trim();
    if (waterintake && activitydate) {
        /*
        const response = await fetch('/api/water/trackcreate/2020-01-11/99', {
            method: 'POST',
            body: JSON.stringify({ }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
        */
        fetch('/api/water/trackcreate/' + activitydate + '/' + waterintake)
            .then(response => response.json())
    } else {
        alert("Please enter the Date and Water intake that you'd like to track");
    }
    if (calorieintake && activitydate) {
        fetch('/api/calorie/trackcreate/' + activitydate + '/' + calorieintake)
            .then(response => response.json())
    } else {
        alert("Please enter the Date and Food Calories consumed that you'd like to track");
    }
    if (exerciseintake && activitydate) {
        fetch('/api/exercise/trackcreate/' + activitydate + '/' + exerciseintake)
            .then(response => response.json())
    } else {
        alert("Please enter the Date and Exercise calories Burnt that you'd like to track");
    }
}
var activityform = document.querySelector('.activityForm')
if (activityform) activityform.addEventListener('submit', activityFormHandler);

async function dashboardFormHandler(event) {
    event.preventDefault();
    const dashboarddate = document.querySelector('#dashboardDate').value;
    console.log = document.querySelector("#dashBoardDate")
    var date = document.getElementById("date");
    var water = document.getElementById("water");
    var exercise = document.getElementById("exercise");
    var calorie = document.getElementById("calorie");
    var watergoal = document.getElementById("watergoal");
    var exercisegoal = document.getElementById("exercisegoal");
    var caloriegoal = document.getElementById("caloriegoal");
    if (dashboarddate) {
        date.innerHTML = "Dispalying Your Activity for " + dashboarddate;
        // Call controller for Water table
        fetch('/api/water/achievement/' + dashboarddate)
            .then(response => response.json())
            .then(function(data) {
                if (data != null) {
                    water.innerHTML = "Water: Consumed = " + data.oz_intake + "oz";
                } else {
                    alert("Water activity not tracked for: " + dashboarddate);
                    water.innerHTML = "";
                }
            });

        fetch('/api/water/goal')
            .then(response => response.json())
            .then(function(data) {
                if (data != null) {
                    watergoal.innerHTML += "Water: Goal = " + data.oz_intake + "oz";
                } else {
                    alert("Water goal not set");
                    watergoal.innerHTML = "";
                }
            });

        // Call controller for Calorie table
        fetch('/api/calorie/achievement/' + dashboarddate)
            .then(response => response.json())
            .then(function(data) {
                if (data != null) {
                    calorie.innerHTML = "Food: Consumed = " + data.calorie_intake + "cal";
                } else {
                    alert("Calorie activity not tracked for: " + dashboarddate);
                    calorie.innerHTML = "";
                }
            });

        fetch('/api/calorie/goal')
            .then(response => response.json())
            .then(function(data) {
                if (data != null) {
                    caloriegoal.innerHTML = "Food: Goal = " + data.calorie_intake + "cal";
                } else {
                    alert("Calorie goal not set");
                    caloriegoal.innerHTML = "";
                }
            });

        // Call controller for Exercise table
        fetch('/api/exercise/achievement/' + dashboarddate)
            .then(response => response.json())
            .then(function(data) {
                if (data != null) {
                    exercise.innerHTML = "Exercise: Burnt = " + data.calorie_outake + "cal";
                } else {
                    alert("Exercise activity not tracked for: " + dashboarddate);
                    exercise.innerHTML = "";

                }
            });

        fetch('/api/exercise/goal')
            .then(response => response.json())
            .then(function(data) {
                if (data != null) {
                    exercisegoal.innerHTML = "Exercise: Goal = " + data.calorie_outake + "cal";
                } else {
                    alert("Exercise goal not set");
                    exercisegoal.innerHTML = "";
                }
            });

    } else {
        alert("Please enter a Date to view your Activity");
    }
}
var dashboardform = document.querySelector('.dashboardForm')
if (dashboardform) dashboardform.addEventListener('submit', dashboardFormHandler);