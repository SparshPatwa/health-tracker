document.querySelector('#oz_intake').addEventListener('click', async function(e) {
    e.preventDefault();
    let oz_intake = document.querySelector('input[name="oz-intake"]').value;
    let oz_intake_date = document.querySelector('input[name="oz-intake-date"]').value;
    console.log("oz", oz_intake);
    console.log("oz_date", oz_intake_date)
    let response;
    let data;
    try {
        response = await fetch('/api/water', {
            method: 'POST',
            body: JSON.stringify({
                oz_intake: oz_intake,
                record_date: oz_intake_date,
                track_type: 1
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        console.log(err)
    }
    try {
        data = await response.json();
    } catch (err) {
        console.log(err)
    }

    console.log("Water tracked", data)
})
document.querySelector('#calorie_intake').addEventListener('click', async function(e) {
    e.preventDefault();
    let calorie_intake = document.querySelector('input[name="calorie-intake"]').value;
    let calorie_intake_date = document.querySelector('input[name="calorie-intake-date"]').value;
    let response;
    let data;
    try {
        response = await fetch('/api/calorie', {
            method: 'POST',
            body: JSON.stringify({
                calorie_intake: calorie_intake,
                record_date: calorie_intake_date,
                track_type: 1
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        console.log(err)
    }
    try {
        data = await response.json();
    } catch (err) {
        console.log(err)
    }

    console.log("Calorie-intake tracked", data)
})
document.querySelector('#calorie_outake').addEventListener('click', async function(e) {
    e.preventDefault();
    let calorie_outake = document.querySelector('input[name="calorie-outake"]').value;
    let calorie_outake_date = document.querySelector('input[name="calorie-outake-date"]').value;
    let response;
    let data;
    try {
        response = await fetch('/api/exercise', {
            method: 'POST',
            body: JSON.stringify({
                calorie_outake: calorie_outake,
                record_date: calorie_outake_date,
                track_type: 1
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        console.log(err)
    }
    try {
        data = await response.json();
    } catch (err) {
        console.log(err)
    }

    console.log("Calorie-outake tracked", data)
})

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
document.querySelector("#displayActivities").addEventListener('click', function(e) {});
// getGoals
async function getGoals() {
    let response;
    let data;
    let w;
    let json = {
        "oz_intake": [],
        "calorie_intake": [],
        "calorie_outake": []
    }

    // call for water
    try {
        response = await fetch(`/api/water?track_type=0`);
    } catch (err) {
        console.log(err)
    }

    try {
        data = await response.json()
    } catch (err) {
        console.log(err)
    }

    for (let i = 0; i < data.length; i++) {
        let w = data[i];
        json['oz_intake'].push(w.calorie_outake);
    }

    console.log("goals water data", data)

    // call for calorie
    try {
        response = await fetch(`/api/calorie?track_type=0`);
    } catch (err) {
        console.log(err)
    }

    try {
        data = await response.json()
    } catch (err) {
        console.log(err)
    }

    for (let i = 0; i < data.length; i++) {
        let w = data[i];
        json['calorie_intake'].push(w.calorie_intake);
    }

    console.log("goals calorie intake data", data)



    // call for exzervcise
    try {
        response = await fetch(`/api/exercise?track_type=0`);
    } catch (err) {
        console.log(err)
    }

    try {
        data = await response.json()
    } catch (err) {
        console.log(err)
    }

    for (let i = 0; i < data.length; i++) {
        let w = data[i];
        json['calorie_outake'].push(w.calorie_outake);
    }

    console.log("calorie_outake goals data", data)
    console.log("constructed json goals", json)
    return json;
}



async function getActivities() {
    let response;
    let data;
    let date = new Date()
    let calendar = document.querySelector('input[name="activity-date"]');
    let json = {
        "oz_intake": [],
        "calorie_intake": [],
        "calorie_outake": []
    }
    console.log(formatDate(date));
    calendar.value = formatDate(date);
    // call for water
    try {
        response = await fetch(`/api/water?track_type=1&record_date=${date}`);
    } catch (err) {
        console.log(err)
    }

    try {
        data = await response.json()
    } catch (err) {
        console.log(err)
    }
    for (let i = 0; i < data.length; i++) {
        let w = data[i];
        json['oz_intake'].push(w.oz_intake);
    }
    console.log("water data", data)

    // call for calorie
    try {
        response = await fetch(`/api/calorie?track_type=1&record_date=${date}`);
    } catch (err) {
        console.log(err)
    }

    try {
        data = await response.json()
    } catch (err) {
        console.log(err)
    }
    for (let i = 0; i < data.length; i++) {
        let w = data[i];
        json['calorie_intake'].push(w.calorie_intake);
    }
    console.log("calorie data", data)



    // call for exzervcise
    try {
        response = await fetch(`/api/exercise?track_type=1&record_date=${date}`);
    } catch (err) {
        console.log(err)
    }

    try {
        data = await response.json()
    } catch (err) {
        console.log(err)
    }
    for (let i = 0; i < data.length; i++) {
        let w = data[i];
        json['calorie_outake'].push(w.calorie_outake);
    }

    let g = await getGoals();
    console.log(g)
    console.log("calorie_outake data", data)
    console.log("constructed json", json)
    return {
        goals: g,
        activities: json
    }
}

getActivities().then(data => {
    console.log("data points", data)

    createHighChartScatter({ goals: data.goals.calorie_intake, activities: data.activities.calorie_intake });
});

function createHighChartScatter({ goals, activities }) {
    Highcharts.chart('chartContainer', {

        title: {
            text: 'Goal Trends'
        },

        subtitle: {
            text: 'Two lines: Calorie In-Take Goal Compared with Calorie In-Take Activity'
        },

        yAxis: {
            title: {
                text: 'Calorie'
            }
        },

        xAxis: {
            title: {
                text: 'Todays Date'
            },
            accessibility: {
                rangeDescription: 'Range: 1-31'
            }
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 1
            }
        },

        series: [{
            name: 'Goals Intake',
            data: goals //[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
        }, {
            name: 'Activities Calorie Intake ',
            data: activities //[24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
}