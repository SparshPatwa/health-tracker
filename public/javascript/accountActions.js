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

async function deleteAccount(){
  /*
  const response = await fetch('/api/user/', {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
  */
}