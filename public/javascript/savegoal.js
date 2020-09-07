const debugON = 0;
document.querySelector("#saveGoal").addEventListener('click', function(e) {
    e.preventDefault();
    let goaldate = document.querySelector('input[name="goal-date"]').value;
    let watergoal = document.querySelector('input[name="water-goal"]').value;
    let calgoal = document.querySelector('input[name="calorie-goal"]').value;
    let exercisegoal = document.querySelector('input[name="exercise-goal"]').value;
    if(debugON)
        console.log("water", watergoal, calgoal, exercisegoal);
    if(goaldate && watergoal && calgoal && exercisegoal) {
        fetch('/api/water/goalcreate/' + goaldate + '/' + watergoal)
            .then(response => {
                return response.json();
            })
            .then(d => {
                if(debugON)
                    console.log(d);
                // call to calori
                fetch('/api/calorie/goalcreate/' + goaldate + '/' + calgoal)
                    .then(responseCal => {
                        return responseCal.json();
                    })
                    .then(dCal => {
                        if(debugON)
                            console.log("Calorie", dCal);
                        fetch('/api/exercise/goalcreate/' + goaldate + '/' + exercisegoal)
                            .then(respExercise => {
                                return respExercise.json();
                            })
                            .then(dExercise => {
                                if(debugON)
                                    console.log("dExer", dExercise);
                                window.location.reload();
                            })
                    })
            })
            .catch(err => {
                console.log(err);
            })
    } else {
        alert("Please enter the Date and Goals you'd like to set");
    }
})
async function getGoals() {
    let response;
    let data;
    let goals = {
        'oz_intake': [],
        'calorie_intake': [],
        'calorie_outake': [],
    };
    try {

        response = await fetch('/api/water');
    } catch (err) {
        console.log("err", err)
    }

    try {
        data = await response.json();
        for (let i = 0; i < data.length; i++) {
            goals['oz_intake'].push(data[i].oz_intake);
        }
    } catch (err) {
        console.log("err", err);
    }
    // use data from water
    if(debugON)
        console.log("wataer data", data)
        // get data for calorie
    try {
        response = await fetch('/api/calorie');
    } catch (err) {
        console.log("err", err)
    }

    try {
        data = await response.json();
        for (let i = 0; i < data.length; i++) {
            goals['calorie_intake'].push(data[i].calorie_intake);
        }
    } catch (err) {
        console.log("err", err);
    }
    if(debugON)
        console.log("calor", data)
        // get data for exercise
    try {

        response = await fetch('/api/exercise');
    } catch (err) {
        console.log("err", err)
    }
    try {
        data = await response.json();
        for (let i = 0; i < data.length; i++) {
            goals['calorie_outake'].push(data[i].calorie_outake);
        }
    } catch (err) {
        console.log("err", err);
    }
    if(debugON)
        console.log("exercise data", data)
    return goals;

}
getGoals().then(g => {
    if(debugON)
        console.log("g", g)
})