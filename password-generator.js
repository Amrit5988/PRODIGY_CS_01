 // Function to generate a random password
        function generatePassword() {
            const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
            const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const numberChars = "0123456789";
            const symbolChars = "!@#$%^&*()_+";
            const includeLowercase = document.getElementById("include-lowercase").checked;
            const includeUppercase = document.getElementById("include-uppercase").checked;
            const includeNumbers = document.getElementById("include-numbers").checked;
            const includeSymbols = document.getElementById("include-symbols").checked;

            let charset = "";

            if (includeLowercase) {
                charset += lowercaseChars;
            }
            if (includeUppercase) {
                charset += uppercaseChars;
            }
            if (includeNumbers) {
                charset += numberChars;
            }
            if (includeSymbols) {
                charset += symbolChars;
            }

            const passwordLength = parseInt(document.getElementById("password-length").value);
            if (isNaN(passwordLength) || passwordLength <= 0) {
                alert("Please enter a valid positive integer for the password length.");
                return "";
            }

            let password = "";

            for (let i = 0; i < passwordLength; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset.charAt(randomIndex);
            }

            return password;
        }

        // Function to check password strength
        function checkPasswordStrength(password) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+])[A-Za-z\d@#$%^&*()_+]{8,}$/;
            if (regex.test(password)) {
                return "Strong";
            } else if (password.length >= 8) {
                return "Intermediate";
            } else {
                return "Weak";
            }
        }

        // Function to check if a password has been compromised in data breaches
        async function checkPasswordLeaks(password) {
            // (Existing checkPasswordLeaks function)

            return 0;
        }

        // (Existing sha1 function)

        const generateBtn = document.getElementById("generate-btn");
        const passwordInput = document.getElementById("password");
        const passwordStrengthLabel = document.getElementById("password-strength");
        const passwordStatusLabel = document.getElementById("password-status");
        const userPasswordInput = document.getElementById("user-password");
        const checkBtn = document.getElementById("check-btn");
        const userStrengthLabel = document.getElementById("user-strength");
        const userStatusLabel = document.getElementById("user-status");

        generateBtn.addEventListener("click", async function () {
            const newPassword = generatePassword();
            if (newPassword !== "") {
                const strength = checkPasswordStrength(newPassword);
                passwordInput.value = newPassword;
                passwordStrengthLabel.textContent = `Password Strength: ${strength}`;

                const leakCount = await checkPasswordLeaks(newPassword);
                if (leakCount > 0) {
                    passwordStatusLabel.textContent = `This password has been leaked ${leakCount} times!`;
                } else {
                    passwordStatusLabel.textContent = "This password has not been leaked.";
                }
            }
        });

        checkBtn.addEventListener("click", async function () {
            const userPassword = userPasswordInput.value;
            const strength = checkPasswordStrength(userPassword);
            userStrengthLabel.textContent = `Password Strength: ${strength}`;

            const leakCount = await checkPasswordLeaks(userPassword);
            if (leakCount > 0) {
                userStatusLabel.textContent = `This password has been leaked ${leakCount} times!`;
            } else {
                userStatusLabel.textContent = "This password has not been leaked.";
            }
        });
