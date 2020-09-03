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
        })
        .catch(err => {
            console.log(err);
        })
})