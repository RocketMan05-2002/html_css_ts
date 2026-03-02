import {AuthManager} from "./managers/AuthManager";

const auth = new AuthManager();

// Register elements
const registerButton = document.getElementById("register-button") as HTMLButtonElement;
const registerEmailInput = document.querySelector("#register-container input[type='email']") as HTMLInputElement;
const registerPasswordInput = document.querySelector("#register-container input[type='password']") as HTMLInputElement;

// Login elements
const loginButton = document.getElementById("login-button") as HTMLButtonElement;
const loginEmailInput = document.querySelector("#login-container input[type='email']") as HTMLInputElement;
const loginPasswordInput = document.querySelector("#login-container input[type='password']") as HTMLInputElement;

// register handler
registerButton.addEventListener("click", async ()=>{
    const email = registerEmailInput.value.trim();
    const password = registerPasswordInput.value.trim();

    if(!email || !password){
        alert("Please enter both email and password values.");
        return;
    }

    try{
        const user = await auth.register(email,password);
        console.log("User registered successfully : ", user);
        alert("registration successful!");
        registerEmailInput.value = "";
        registerPasswordInput.value = "";
    }catch(Err:any){
        alert(Err.message);
        console.log(Err);
    }
});

// login handler
loginButton.addEventListener("click", async ()=>{
    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value.trim();

    if(!email || !password){
        alert("we need both login and password values!");
        return;
    }

    try{
        const token = await auth.login(email,password);
        
        if(token.startsWith("token_")){
            alert("Login Successful!");
            localStorage.setItem("sessionToken", token);
        }else{
            alert(token);
        }

        loginEmailInput.value = "";
        loginPasswordInput.value = "";
    }catch(Err:any){
        console.log(Err);
        alert(Err.message);
    }
})