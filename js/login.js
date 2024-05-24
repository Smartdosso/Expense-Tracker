function saveData(event){
    event.preventDefault()
    email=document.getElementById('email').value;
    password=document.getElementById('password').value;

    let userString = localStorage.getItem("users");

    if (userString) {
        let user = JSON.parse(userString);
        
        if (user.password === password) {       
            alert('Login successful');

            window.location.href = 'index.html'; 

        } else {
            alert('Invalid email or password');
        }
    }
    }


  