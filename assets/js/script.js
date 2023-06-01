/**
 * This welcome timer allows users to see the title, read the title and header Descrition
 */
function welcomeTimer() {
    setTimeout(welcomeAlert, 10);
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

/**
 * This function runs once the complete this sum btn is clicked
 * main part of this function is to change the form inputs into styled text remove the btns from div and create a new btn
 */
function questionChosen() {
    let chosenBigNumber = document.getElementById("big-number").value;
    let chosenLittleNumber = document.getElementById("little-number").value;
    let lockedIn = document.getElementById("input-to-locked-in");
    let newBtn = document.createElement("button");

    // add attributes and button text for the new refresh button
    newBtn.setAttribute("id", "refresh-answer-panel-btn");
    newBtn.innerHTML = "Refresh and start a new sum";

    // changes the form elements into p elements so user can see what they have chosen
    lockedIn.innerHTML = `<p class="padding-top-bottom"><span class="big-number text-shadow">` + chosenBigNumber + `</span><span class="little-number text-shadow">` + chosenLittleNumber + `</span></p>
    
    

    
    <p>The sum you have chosen is ` + chosenBigNumber + ` to the power of ` + chosenLittleNumber + `</p>`;

    // removes buttons that are no longer appropriate
    document.getElementById("question-tile-calculate-btn").remove();
    document.getElementById("question-tile-random-btn").remove();

    // Adds the new button to be able to refresh the sum/panel if user no longer wants to complete the current sum
    lockedIn.appendChild(newBtn);

    // calls the next functions to fill out the next 2 panels so the user can complete the sum
    fillAnswerPanel(chosenBigNumber, chosenLittleNumber);
    fillWorkingsOutPanel();
}

/**
 * This function will fill out the missing parts of the Answer panel
 */
function fillAnswerPanel(chosenBigNumber, chosenLittleNumber) {
    // the below fills in the worfing of the chosen sum
    let answerPanelBigP = document.getElementById("answer-panel-big-number-p").innerHTML = chosenBigNumber;
    let answerPanelLittleP = document.getElementById("answer-panel-little-number-p").innerHTML = chosenLittleNumber;

    // the below fills in the number representation of the sum
    let answerPanelSpanBig = document.getElementById("answer-panel-big-number-graphical").innerHTML = chosenBigNumber;
    let answerPanelSpanLittle = document.getElementById("answer-panel-little-number-graphical").innerHTML = chosenLittleNumber;
}

document.addEventListener("DOMContentLoaded", welcomeTimer);
document.getElementById("question-tile-calculate-btn").addEventListener("click", questionChosen);