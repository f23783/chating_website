
//console.log("register.js yüklendi");

const firstNameInput = document.getElementById("first_name");
const lastNameInput = document.getElementById("last_name");
const phoneNumberInput = document.getElementById("phone_number");
const userNameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const signUpBtn = document.getElementById("button_signup");
const passwordWarning = document.getElementById("password_warning");

/*
    signUpBtn.addEventListener("click", () => {
        alert("Clicked to SignUp Button ✅");
    });
*/

passwordInput.addEventListener("input", () => {
    const passwordValue = passwordInput.value.trim();

    if (passwordValue.length < 8) {
        passwordWarning.textContent =
            "Password must be at least 8 characters long";
        return;
    }

    if (!/\d/.test(passwordValue)) {
        passwordWarning.textContent =
            "Password must contain at least one number";
        return;
    }

    if (!/[a-zA-Z]/.test(passwordValue)) {
        passwordWarning.textContent =
            "Password must contain at least one letter";
        return;
    }

    passwordWarning.textContent = "";
});


signUpBtn.addEventListener("click", async(event) => {
    event.preventDefault();

    const firstname = firstNameInput.value.trim();
    const lastname = lastNameInput.value.trim();
    const phonenumber = phoneNumberInput.value.trim();
    const username = userNameInput.value.trim();
    const password = passwordInput.value.trim();
   
    /*
    console.log("FirstName:", firstname);
    console.log("LastName:", lastname);
    console.log("PhoneNumber:", phonenumber);
    console.log("Username:", username);
    console.log("Password:", password);
    */
   
    const isValid = validateRegisterForm(
    firstname,
    lastname,
    phonenumber,
    username,
    password
);

if (!isValid) return;

     
function validateRegisterForm(firstname, lastname, phonenumber, username, password) {
    if (!firstname || !lastname || !phonenumber || !username || !password) {
        alert("All fields are required.");
        return false;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return false;
    }

    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        alert("Password must contain at least one letter and one number.");
        return false;
    }

    return true;
}

async function registerUser(userData) {
    try {
        const response = await fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        if (response.status === 409) {
            return { ok: false, message: "Username is already taken." };
        }

        if (response.status === 201) {
            return { ok: true };
        }

        return { ok: false, message: "Something went wrong." };

    } catch {
        return { ok: false, message: "Network error. Check your connection." };
    }
}

})
