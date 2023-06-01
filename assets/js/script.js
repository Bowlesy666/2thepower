function welcomeAlert() {
    alert(
        `Welcome to our easy guide to work out how to multiply one number to the power of another number<br>
        We will take you through step by step so you know how to work it out`
    );
    document.getElementById("big-number").focus();
}

document.addEventListener("DOMContentLoaded", welcomeAlert);