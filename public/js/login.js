const loginForm = document.querySelector("#login");

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  alert("Click!");

  const userObj = {
    email: document.querySelector("#loginEmail").value,
    password: document.querySelector("#loginPassword").value,
  };

  fetch("api/users/login", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if(res.ok){
      alert("login success!")
      return res.json();
    } else {
      alert("trumpet sound.")
    };
  }).then(data => {
    location.href = '/dashboard'
  });
});