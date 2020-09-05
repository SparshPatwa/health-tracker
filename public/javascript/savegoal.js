document.querySelector("#saveGoal").addEventListener('click', function(e) {
    e.preventDefault();
    let watergoal = document.querySelector('input[name="water-goal"]').value;
    let calgoal = document.querySelector('input[name="calorie-goal"]').value;
    let exercisegoal = document.querySelector('input[name="exercise-goal"]').value;
    console.log("water", watergoal, calgoal, exercisegoal);

    fetch('/api/water/', {
            method: 'POST',
            body: JSON.stringify({
                oz_intake: watergoal
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        .then(response => {
            return response.json();
        })
        .then(d => {
            console.log(d);
            // call to calori
            fetch('/api/calorie', {
                    method: 'POST',
                    body: JSON.stringify({
                        calorie_intake: calgoal
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(responseCal => {
                    return responseCal.json();
                })
                .then(dCal => {
                    console.log("Calorie", dCal);
                    fetch('/api/exercise', {
                            method: "POST",
                            body: JSON.stringify({
                                calorie_outake: exercisegoal
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(respExercise => {
                            return respExercise.json();
                        })
                        .then(dExercise => {
                            console.log("dExer", dExercise);
                            window.location.reload();
                        })
                })
        })
        .catch(err => {
            console.log(err);
        })
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

    console.log("exercise data", data)
    return goals;

}
getGoals().then(g => {
    console.log("g", g)




})