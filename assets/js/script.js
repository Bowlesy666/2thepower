/**
 * This welcome timer allows users to see the title, read the title and header Descrition
 */
function welcomeTimer() {
    setTimeout(welcomeAlert, 1000);
}

/**
 * This function runs after the welcomeTimer completes
 * this is the first part of the step by step guide how to use the website
 */
function welcomeAlert() {
    alert(`Welcome!
        We will take you through step by step so you know how to work it out
        We will start by entering a number, between 2 and 15, into the larger input field
        Then inputting a number, between 2 and 15, into the smaller input field, 
        Notice how the smaller input field is raised up towards the top of the other number? this is how we show "to the power"`
    );
    document.getElementById("big-number").focus();
}

document.addEventListener("DOMContentLoaded", welcomeTimer);