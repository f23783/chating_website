const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const signInBtn = document.getElementById("button_signin");
const signUpBtn = document.getElementById("button_signup");
const rememberMeBtn = document.getElementById("button_rememberclick");
const forgotPasswordBtn = document.getElementById("button_forgetclick");


signInBtn.addEventListener("click", async(event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!isInfoValid()) return;
    
    const result = await login(username, password);

    if (result.ok) {
        console.log("Login successful:", result.user);
    } else {
        alert(result.message);
    }
});


async function login(usernameInput, passwordInput) {
    try {
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user_name: usernameInput, password: passwordInput})
        });

        if (response.status === 200) {
            const data = await response.json();
            return { ok: true, user: data.user };
        }

        if (response.status === 401) {
            return {
                ok: false,
                message: "Incorrect username or password! "
            };
        }

        return {
            ok: false,
            message: "Something went wrong. Please try again."
        };

    } catch {
        return {
            ok: false,
            message: "Network error. Check your connection."
        };
    } 
}

