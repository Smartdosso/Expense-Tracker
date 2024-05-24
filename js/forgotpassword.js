function back(event){
    event.preventDefault()
    window.location.href="login-page.html";
};

function verifyEmail() {
    const emailInput = document.getElementById('email').value;
    
    let userFound = localStorage.getItem("users");


   
    if (userFound) {

        let userExist = JSON.parse(userFound);

        if(userExist.email === emailInput);
        alert('Email verified.');
        return;
        
    } 
    else {
        alert('Email not found. Please check the email entered.');
    }
    
    location.href="set-password.html";
}

function back(event) {
    event.preventDefault();
    window.history.back();
}
