// Global Variables are because of issues in reading the changed input as it was reading as null after HTML changed by questionChosen function
let globalBig;
let globalLittle;

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

    globalBig = chosenBigNumber;
    globalLittle = chosenLittleNumber;

    // add attributes and button text for the new refresh button
    newBtn.setAttribute("id", "refresh-answer-panel-btn");
    newBtn.innerHTML = "Refresh and start a new sum";

    // changes the form elements into p elements so user can see what they have chosen
    lockedIn.innerHTML = `<p class="padding-top-bottom"><span id="big-number" class="big-number text-shadow">` + chosenBigNumber + `</span><span id="little-number" class="little-number text-shadow">` + chosenLittleNumber + `</span></p>
    <br>
    <p>The sum you have chosen is ` + chosenBigNumber + ` to the power of ` + chosenLittleNumber + `</p>`;

    // Adds the new button to be able to refresh the sum/panel if user no longer wants to complete the current sum
    lockedIn.appendChild(newBtn);

    // calls the next functions to fill out the next 2 panels so the user can complete the sum
    fillAnswerPanel(chosenBigNumber, chosenLittleNumber);
    fillWorkingsOutPanel(chosenBigNumber, chosenLittleNumber);

    console.log(chosenBigNumber + ' is the chosen big number');
    console.log(chosenLittleNumber + ' is the chosen little number');
}

/**
 * This function will fill out the missing parts of the Answer panel
 */
function fillAnswerPanel(chosenBigNumber, chosenLittleNumber) {
    // the below fills in the wording of the chosen sum
    let answerPanelBigP = document.getElementById("answer-panel-big-number-p").innerHTML = chosenBigNumber;
    let answerPanelLittleP = document.getElementById("answer-panel-little-number-p").innerHTML = chosenLittleNumber;

    // the below fills in the number representation of the sum
    let answerPanelSpanBig = document.getElementById("answer-panel-big-number-graphical").innerHTML = chosenBigNumber;
    let answerPanelSpanLittle = document.getElementById("answer-panel-little-number-graphical").innerHTML = chosenLittleNumber;

    console.log(answerPanelBigP + ' is answerPanelBigP');
    console.log(answerPanelLittleP + ' is answerPanelLittleP');
    console.log(answerPanelSpanBig + ' is answerPanelSpanBig');
    console.log(answerPanelSpanLittle + ' is answerPanelSpanLittle');
}

/**
 * This function will create the amount of iterations needed for the calculation and focus user here as the second section to input
 */
function fillWorkingsOutPanel(chosenBigNumber, chosenLittleNumber) {
    let scrollingContainer = document.getElementById("workings-out-scrolling-container");

    scrollingContainer.innerHTML =
        `<div id="workings-out-initial-panel" class="iteration-index">
            <!-- div is used to keep inline blocks from allowing further elements on this line -->
            <!-- tells the user which part of the calculation they are completing -->
            <span class="workings-out-iteration">${chosenBigNumber} to the power of 2</span><br>
            <!-- the below span holds the answer to the previous iteration that is now multiplied by the big number -->
            <span class="workings-out-previous-iteration-answer">Just a normal sum</span>
            <div>
                <p class="padding-top-bottom workings-out-medium-size text-shadow">${chosenBigNumber}</p>
                <p class="padding-top-bottom workings-out-multiply-sign text-shadow">x</p>
                <p class="padding-top-bottom workings-out-medium-size text-shadow">${chosenBigNumber}</p>
            </div>
            <!-- css has input going in reverse so sum can be worked out as you would normally do -->
            <input class="workings-out-input" id="workings-out-focus-1" type="number">
            <button class="workings-out-submit">Check my answer</button>
            <span id="error-message"></span>
        </div>`;

    // for loop sets out how many divs are needed to calculate the sum and adds the elements
    for (let i = 2; i < chosenLittleNumber; ++i) {
            let iterationPanel = document.createElement('div');
            iterationPanel.classList.add("workings-out-iteration-panel");
            // The below was added to overcome the concatonation issue in the template literal, google didnt help so i just tried lots of things and this worked
            let trueIterationCount = i + 1;

            let iterationHtml = `
            <!-- tells the user which part of the calculation they are completing -->
            <span class="workings-out-iteration">${chosenBigNumber} to the power ${trueIterationCount}</span><br>
            <!-- the below span holds the answer to the previous iteration that is now multiplied by the big number -->
            <span class="workings-out-previous-iteration-answer">?</span>
            <!-- div is used to keep inline blocks from allowing further elements on this line -->
            <div>
                <p class="padding-top-bottom workings-out-multiply-sign text-shadow">x</p>
                <p class="padding-top-bottom workings-out-medium-size text-shadow">${chosenBigNumber}</p>
            </div>
            <input class="workings-out-input" id="workings-out-focus-${[i]}" type="number">
            <span id="error-message"></span>
            <button class="workings-out-submit">Check my answer</button>
            `;

            iterationPanel.innerHTML = iterationHtml;

            scrollingContainer.appendChild(iterationPanel);
    }

    // focus on the first workings out panel to guide the user what is next to complete
    let workingsOutFocus = document.getElementById("workings-out-focus-1");
    workingsOutFocus.focus();

    //  this event listener is for the first iteration calculations buttons
    document.getElementsByClassName('workings-out-submit')[0].addEventListener("click", calculateIteration);
}

function calculateIteration() {
    let scrollingContainer = document.getElementById('workings-out-scrolling-container');
    let iterationIndex = [];

    if (iterationIndex.length === 0) {
        for (let child = 0; child < globalLittle; ++child) {
            let iterationAnswer = Math.pow(globalBig, child + 2);
            iterationIndex.push(iterationAnswer);
            
            console.log(iterationAnswer);
        }
    }


    
    console.log(iterationIndex + ' is the iteration Indexes')
    console.log('whatup');
}

function finalAnswerSubmit() {
    let finalAnswerError = document.getElementById("final-answer-error-message");
    let finalAnswerInput = document.getElementById("final-answer-input").value;
    let finalAnswerCalculation = Math.pow(globalBig, globalLittle);

    console.log(globalBig + ' is globalBig');
    console.log(globalLittle + ' is globalLittle');
    console.log(finalAnswerInput + ' is finalAnswerInput')
    console.log(finalAnswerCalculation + ' is finalAnswerCalculation');

    if (finalAnswerInput === "") {
        finalAnswerError.innerHTML = "Place your answer in the box!";

        console.log('No answer given');
    } else if (finalAnswerInput == finalAnswerCalculation) {
        finalAnswerError.innerHTML = "";

        alert(`
        Well Done! You got it correct!
        Keep up the good work!
        Dont forget to check out your calculation history in the Answer Log`);
        answerLog(globalBig, globalLittle, finalAnswerInput, finalAnswerCalculation);
        refreshQuestionPanel();
        nullifyGlobalVariables();

        console.log('Correct Answer given');
    } else if (finalAnswerInput != finalAnswerCalculation) {
        finalAnswerError.innerHTML = "";

        alert(`
        Oops, you answered that incorrect!
        Dont forget to check out your calculation history in the Answer Log
        And remember, you cam always have another try at this question`);
        answerLog(globalBig, globalLittle, finalAnswerInput, finalAnswerCalculation);
        refreshQuestionPanel();
        nullifyGlobalVariables();

        console.log('Incorrect answer given');
    }
}

function answerLog(globalBig, globalLittle, finalAnswerInput, finalAnswerCalculation) {
    let answerLogPanel = document.getElementById('answer-log-panel');

    // create the div for each log and set attribute for styles
    let answerLogDiv = document.createElement('div');
    answerLogDiv.setAttribute = ("class", "answer-log-iteration-container");

    // sets the innerHTMl of the div with if statement for the img true=tick or false=cross
    if (finalAnswerInput == finalAnswerCalculation) {
        answerLogDiv.innerHTML = `<div class="answer-log-iteration-container">
    <div class="answer-log-scenario">
        <p><span class="big-number  text-shadow">${globalBig}</span><span class="little-number  text-shadow">${globalLittle}</span></p>
    </div>
    <div class="answer-log-scenario-answer">
        <p class="center text-shadow bg-removed">${finalAnswerInput}</p>
    </div>
        <div class="answer-log-outcome">
            <i class="fa-solid fa-circle-check answer-log-correct center text-shadow bg-removed"></i>
        </div>
    </div>`;
    } else {
        answerLogDiv.innerHTML = `<div class="answer-log-iteration-container">
    <div class="answer-log-scenario">
        <p><span class="big-number text-shadow">${globalBig}</span><span class="little-number  text-shadow">${globalLittle}</span></p>
    </div>
    <div class="answer-log-scenario-answer">
        <p class="center text-shadow bg-removed">${finalAnswerInput}</p>
    </div>
        <div class="answer-log-outcome">
        <i class="fa-solid fa-circle-xmark answer-log-wrong center text-shadow bg-removed"></i>
        </div>
    </div>`;
    }

    // appends the answerLogDiv to the AnswerLogPanel
    answerLogPanel.appendChild(answerLogDiv);

}

function refreshQuestionPanel() {
    // sets the inner HTML of the question panel back to the original state
    let lockedIn = document.getElementById("input-to-locked-in").innerHTML = `
    <form class="padding-top-bottom">
                        <input id="big-number" type="number" min="2" max="15" class="big-number text-shadow">
                        <input id="little-number" type="number" min="2" max="15" class="little-number text-shadow">
                        <br><br><br>
                        <span id="error-message"></span>
                        <label for="big-number">The big number is the one to be multiplied</label><br>
                        <label for="little-number">The little number is how many times the big number is multiplied by itself</label>
                    </form>
                    <button id="question-tile-calculate-btn">Complete this sum</button>
                    <button id="question-tile-random-btn">Random</button>
                </div>`;

    // the below resets the wording of the chosen sum in the final answer panel
    let answerPanelBigP = document.getElementById("answer-panel-big-number-p").innerHTML = '?';
    let answerPanelLittleP = document.getElementById("answer-panel-little-number-p").innerHTML = '?';

    // the below resets the number representation of the sum in the final answer panel
    let answerPanelSpanBig = document.getElementById("answer-panel-big-number-graphical").innerHTML = '?';
    let answerPanelSpanLittle = document.getElementById("answer-panel-little-number-graphical").innerHTML = '?';

    // resets the workingsOutPanel
    let scrollingContainer = document.getElementById("workings-out-scrolling-container");

    scrollingContainer.innerHTML = `<div id="workings-out-initial-panel">
    <!-- div is used to keep inline blocks from allowing further elements on this line -->
    <!-- tells the user which part of the calculation they are completing -->
    <span class="workings-out-iteration">? to the power [i]</span><br>
    <!-- the below span holds the answer to the previous iteration that is now multiplied by the big number -->
    <span class="workings-out-previous-iteration-answer">?</span>
    <div>
        <p class="padding-top-bottom workings-out-medium-size text-shadow">?</p>
        <p class="padding-top-bottom workings-out-multiply-sign text-shadow">x</p>
        <p class="padding-top-bottom workings-out-medium-size text-shadow">?</p>
    </div>
    <!-- css has input going in reverse so sum can be worked out as you would normally do -->
    <input class="workings-out-input" type="number">
    <span id="error-message"></span>
    <button class="workings-out-submit">Check my answer</button>
</div>
<div class="workings-out-iteration-panel">
    <!-- tells the user which part of the calculation they are completing -->
    <span class="workings-out-iteration">? to the power [i]</span><br>
    <!-- the below span holds the answer to the previous iteration that is now multiplied by the big number -->
    <span class="workings-out-previous-iteration-answer">?</span>
    <!-- div is used to keep inline blocks from allowing further elements on this line -->
    <div>
        <p class="padding-top-bottom workings-out-multiply-sign text-shadow">x</p>
        <p class="padding-top-bottom workings-out-medium-size text-shadow">?</p>
    </div>
    <input class="workings-out-input" type="number">
    <span id="error-message"></span>
    <button class="workings-out-submit">Check my answer</button>
</div>
<div class="workings-out-iteration-panel">
    <!-- tells the user which part of the calculation they are completing -->
    <span class="workings-out-iteration">? to the power [i]</span><br>
    <!-- the below span holds the answer to the previous iteration that is now multiplied by the big number -->
    <span class="workings-out-previous-iteration-answer">?</span>
    <!-- div is used to keep inline blocks from allowing further elements on this line -->
    <div>
        <p class="padding-top-bottom workings-out-multiply-sign text-shadow">x</p>
        <p class="padding-top-bottom workings-out-medium-size text-shadow">?</p>
    </div>
    <input class="workings-out-input" type="number">
    <span id="error-message"></span>
    <button class="workings-out-submit">Check my answer</button>
</div>
<div class="workings-out-iteration-panel">
    <!-- tells the user which part of the calculation they are completing -->
    <span class="workings-out-iteration">? to the power [i]</span><br>
    <!-- the below span holds the answer to the previous iteration that is now multiplied by the big number -->
    <span class="workings-out-previous-iteration-answer">?</span>
    <!-- div is used to keep inline blocks from allowing further elements on this line -->
    <div>
        <p class="padding-top-bottom workings-out-multiply-sign text-shadow">x</p>
        <p class="padding-top-bottom workings-out-medium-size text-shadow">?</p>
    </div>
    <input class="workings-out-input" type="number">
    <span id="error-message"></span>
    <button class="workings-out-submit">Check my answer</button>
</div>`;


    // This event listener is for the first section submit button, i placed it here as it stopped working after the first answer is given, seems to work!
    document.getElementById("question-tile-calculate-btn").addEventListener("click", questionChosen);
}

function nullifyGlobalVariables() {
    globalBig = null;
    globalLittle = null;

    // This empties the input field on final answer panel
    document.getElementById('final-answer-input').value = "";
}

// event listeners below
// this event listener waits for DOM to load then sets timer so user can read description before the function runs welcomeAlert
document.addEventListener("DOMContentLoaded", welcomeTimer);
// This event listener is for the first section submit button
document.getElementById("question-tile-calculate-btn").addEventListener("click", questionChosen);
// this event listener is for the final answer button
document.getElementById("final-answer-submit").addEventListener("click", finalAnswerSubmit);
