async function logout() {
    const response = await fetch('/api/user/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

async function deleteAccount() {
    console.log("Not Implemented");
}


document.querySelector("#saveGoal").addEventListener('click', function(e) {
    e.preventDefault();
    let watergoal = document.querySelector('input[name="water-goal"]').value;
    console.log("water", watergoal);
})