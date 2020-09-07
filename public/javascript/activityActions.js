const debugON = 0;
document.querySelector('#oz_intake').addEventListener('click', async function(e) {
    e.preventDefault();
    let oz_intake = document.querySelector('input[name="oz-intake"]').value;
    let oz_intake_date = document.querySelector('input[name="oz-intake-date"]').value;
    if(debugON)
        console.log("oz", oz_intake);
    if(debugON)
        console.log("oz_date", oz_intake_date)
    let response;
    let data;

    if (oz_intake_date && oz_intake) {
        try {
            response = await fetch('/api/water/trackcreate/'+oz_intake_date+'/'+oz_intake)
        } catch (err) {
            console.log(err)
        }
        try {
            data = await response.json();
        } catch (err) {
            console.log(err)
        }
        let tr = document.querySelector('#tracksuccess');
        tr.classList.remove('d-none')
        tr.classList.add('d-flex')
        setTimeout(function() {
            document.querySelector('input[name="oz-intake"]').value = ""
            document.querySelector('input[name="oz-intake-date"]').value = "";
            tr.classList.remove('d-flex')
            tr.classList.add('d-none');
        }, 1000)
        if(debugON)
            console.log("Water tracked", data)
    } else {
        alert("Please enter the Date and Water intake that you'd like to track");
    }
})
document.querySelector('#calorie_intake').addEventListener('click', async function(e) {
    e.preventDefault();
    let calorie_intake = document.querySelector('input[name="calorie-intake"]').value;
    let calorie_intake_date = document.querySelector('input[name="calorie-intake-date"]').value;
    if(debugON)
        console.log("calorie", calorie_intake);
    if(debugON)
        console.log("calorie_date", calorie_intake_date)
    let response;
    let data;
    if (calorie_intake && calorie_intake_date) {
        try {
            response = await fetch('/api/calorie/trackcreate/' + calorie_intake_date + '/' + calorie_intake)
        } catch (err) {
            console.log(err)
        }
        try {
            data = await response.json();
        } catch (err) {
            console.log(err)
        }
        if(debugON)
            console.log("Calorie-intake tracked", data)
        let tr = document.querySelector('#tracksuccess');
        tr.classList.remove('d-none')
        tr.classList.add('d-flex')
        setTimeout(function() {
            document.querySelector('input[name="calorie-intake"]').value = "";
            document.querySelector('input[name="calorie-intake-date"]').value = "";
            tr.classList.remove('d-flex')
            tr.classList.add('d-none');
        }, 1000)
    } else {
        alert("Please enter the Date and Food Calories consumed that you'd like to track");
    }
})
document.querySelector('#calorie_outake').addEventListener('click', async function(e) {
    e.preventDefault();
    let calorie_outake = document.querySelector('input[name="calorie-outake"]').value;
    let calorie_outake_date = document.querySelector('input[name="calorie-outake-date"]').value;
    if(debugON) 
        console.log("calorie",  calorie_outake); 
    if(debugON)   
        console.log("calorie_date",  calorie_outake_date)
    let response;
    let data;
    if (calorie_outake && calorie_outake_date) {
        try {
            response = await fetch('/api/exercise/trackcreate/' +  calorie_outake_date + '/' +  calorie_outake)
        } catch (err) {
            console.log(err)
        }
        try {
            data = await response.json();
        } catch (err) {
            console.log(err)
        }
        if(debugON)
            console.log("Calorie-outake tracked", data)
        let tr = document.querySelector('#tracksuccess');
        tr.classList.remove('d-none')
        tr.classList.add('d-flex')
        setTimeout(function() {
            document.querySelector('input[name="calorie-outake"]').value = ""
            document.querySelector('input[name="calorie-outake-date"]').value = "";
            tr.classList.remove('d-flex')
            tr.classList.add('d-none');
        }, 1000)
    } else {
        alert("Please enter the Date and Exercise calories Burnt that you'd like to track");
    }
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
async function getGoals() {
    let response;
    let data;
    let w;
    let json = {
        "oz_intake": [],
        "calorie_intake": [],
        "calorie_outake": []
    }
    // Backend call for Water goal data
    try {
        response = await fetch(`/api/water/goal`);
    } catch (err) {
        console.log(err)
    }
    try {
        data = await response.json()
    } catch (err) {
        console.log(err)
    }
    if(data === null) {
        json['oz_intake'].push(0);
    } else {
        json['oz_intake'].push(data.oz_intake);
    }
    if(debugON)
        console.log("goals water data", data)
    // Backend call for Calorie goal data
    try {
        response = await fetch(`/api/calorie/goal`);
    } catch (err) {
        console.log(err)
    }
    try {
        data = await response.json()
    } catch (err) {
        console.log(err)
    }
    if(data === null) {
        json['calorie_intake'].push(0);
    } else {
        json['calorie_intake'].push(data.calorie_intake);
    }
    if(debugON)
        console.log("goals calorie intake data", data)
    // Backend call for Exercise goal data
    try {
        response = await fetch(`/api/exercise/goal`);
    } catch (err) {
        console.log(err)
    }
    try {
        data = await response.json()
    } catch (err) {
        console.log(err)
    }
    if(data === null) {
        json['calorie_outake'].push(0)
    } else {
        json['calorie_outake'].push(data.calorie_outake)
    }
    return json;
}
async function getActivities(date = new Date(), initial = true) {
    let response;
    let data;
    let calendar = document.querySelector('input[name="activity-date"]');
    let json = {
        "oz_intake": [],
        "calorie_intake": [],
        "calorie_outake": []
    }
    if(debugON)
        console.log(formatDate(date));
    if (initial) {
        calendar.value = formatDate(date);
    }
    // Backend call for Water achievements data
    try {
        response = await fetch("/api/water/achievement/"+date);
    } catch (err) {
        console.log(err)
    }
    try {
        data = await response.json()
    } catch (err) {
        console.log(err)
    }
    if(data === null) {
        json['oz_intake'].push(0);
    } else if(data.length === undefined) {
        json['oz_intake'].push(data.oz_intake);
    } else {
        for (let i = 0; i < data.length; i++) {
            let w = data[i];
            json['oz_intake'].push(w.oz_intake);
        }
    }
    if(debugON)
        console.log("water data", data.oz_intake);
    // Backend call for Calorie achievemtns data
    try {
        response = await fetch(`/api/calorie/achievement/${date}`);
    } catch (err) {
        console.log(err)
    }
    try {
        data = await response.json()
    } catch (err) {
        console.log(err)
    }
    if(data === null) {
        json['calorie_intake'].push(0);
    } else if(data.length === undefined) {
        json['calorie_intake'].push(data.calorie_intake);
    } else {
        for (let i = 0; i < data.length; i++) {
            let w = data[i];
            json['calorie_intake'].push(w.calorie_intake);
        }
    }
    if(debugON)
        console.log("calorie data", json['calorie_intake']);
    // Backend call for Exercise achievement data
    try {
        response = await fetch(`/api/exercise/achievement/${date}`);
    } catch (err) {
        console.log(err)
    }
    try {
        data = await response.json()
    } catch (err) {
        console.log(err)
    }
    if(data === null) {
        json['calorie_outake'].push(0);
    } else if(data.length === undefined) {
        json['calorie_outake'].push(data.calorie_outake);
    } else {    
        for (let i = 0; i < data.length; i++) {
            let w = data[i];
            json['calorie_outake'].push(w.calorie_outake);
        }
    }
    if(debugON)
        console.log("exercise data", json['calorie_outake'])
    let g = await getGoals();
    // Return goals and achievment data to be plotted
    return {
        goals: g,
        activities: json
    }
}
getActivities().then(data => {
    if(debugON)
        console.log("the data", data)
    let keys = Object.keys(data.goals);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        createHighChartScatter({ goals: data.goals[key], activities: data.activities[key], title: key });
    }

});
function createHighChartScatter({ goals, activities, title }) {
    if(debugON)
        console.log("goals", goals)
    if(debugON)
        console.log("activities", activities)
    let titleMap = {
        'oz_intake': 'Water',
        'calorie_intake': 'Food',
        'calorie_outake': 'Exercise'
    }
    Highcharts.chart(`${title}_chart`, {
        chart: {
            type: 'bar'
        },
        title: {
            text: titleMap[title]
        },
        subtitle: {
            text: 'Achieved vs Goal</a>'
        },
        xAxis: {
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: `Goals (${title})`,
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Goal',
            data: [goals.reduce((a, b) => a + b, 0)]
        }, {
            name: 'Activity',
            data: [activities.reduce((a, b) => a + b, 0)]
        }]
    });
}
document.querySelector('#displayActivities').addEventListener('click', async function(e) {
    e.preventDefault();
    let date = document.querySelector('input[name="activity-date"]').value;
    getActivities(date, false).then(data => {
        if(debugON)
            console.log("the data", data)
        let keys = Object.keys(data.goals);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            createHighChartScatter({ goals: data.goals[key], activities: data.activities[key], title: key });
        }

    });
    if(debugON)
        console.log("getctivites complete")
})