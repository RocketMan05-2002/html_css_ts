import { AuthManager } from "./managers/AuthManager";

const auth = new AuthManager();

// Register elements
const registerButton = document.getElementById("register-button") as HTMLButtonElement;
const registerEmailInput = document.querySelector("#register-container input[type='email']") as HTMLInputElement;
const registerPasswordInput = document.querySelector("#register-container input[type='password']") as HTMLInputElement;

// Login elements
const loginButton = document.getElementById("login-button") as HTMLButtonElement;
const loginEmailInput = document.querySelector("#login-container input[type='email']") as HTMLInputElement;
const loginPasswordInput = document.querySelector("#login-container input[type='password']") as HTMLInputElement;


// Register handler
registerButton.addEventListener("click", async () => {

    const email = registerEmailInput.value.trim();
    const password = registerPasswordInput.value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {

        const user = await auth.register(email, password);

        console.log("User registered:", user);
        alert("Registration successful!");

        registerEmailInput.value = "";
        registerPasswordInput.value = "";

    } catch (error: any) {

        console.error(error);
        alert(error.message);

    }

});


// Login handler
loginButton.addEventListener("click", async () => {

    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    try {

        const token = await auth.login(email, password);

        console.log("Login result:", token);

        if (token.startsWith("token_")) {

            alert("Login successful!");

            // save token (optional)
            localStorage.setItem("sessionToken", token);

        } else {

            alert(token);

        }

        loginEmailInput.value = "";
        loginPasswordInput.value = "";

    } catch (error: any) {

        console.error(error);
        alert("Login failed");

    }

});