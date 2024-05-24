function saveData(event){
    event.preventDefault()
    let name, email, password;
    name=document.getElementById('name').value;
    email=document.getElementById('email').value;
    password=document.getElementById('password').value;

    // localStorage.setItem("name",name);
    // localStorage.setItem("email",email);
    // localStorage.setItem("password",password);

    // let user_records=new Object();

       let user_records ={
            "name":name,
            "email":email,
            "password":password
        }
        localStorage.setItem("users",JSON.stringify(user_records));
        user_records.push(user);

        window.location.href = 'home.html';
    }
