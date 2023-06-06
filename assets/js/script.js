// Global Variables are because of issues in reading the changed input as it was reading as null after HTML changed by questionChosen function
let globalBig;
let globalLittle;
let globalIterationCount = 2;

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
    alert(`Welcome to 2 The Power
We will take you through step by step how to calculate indices
We will start by entering a number, between 2 and 15, into the larger input box
Then inputting a number, between 3 and 15, into the smaller input box, 
Notice how the smaller input box is raised towards the top of the other number? this is how we show "to the power"`
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

    // adds event listener to newly created refresh button
    document.getElementById("refresh-answer-panel-btn").addEventListener("click", refreshAnswerPanelBtn);
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
        `<div id="workings-out-initial-panel">
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
            <input id="workings-out-input" type="number">
            <button id="workings-out-submit">Check my answer</button>
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
            </div>`;

            iterationPanel.innerHTML = iterationHtml;

            scrollingContainer.appendChild(iterationPanel);
    }

    // focus on the first workings out panel to guide the user what is next to complete
    let workingsOutFocus = document.getElementById("workings-out-input");
    workingsOutFocus.focus();

    //  this event listener is for the first iteration calculations buttons
    document.getElementById('workings-out-submit').addEventListener("click", calculateIteration);
}

function calculateIteration() {
    let workingsOutInput = document.getElementById('workings-out-input');
    let workingsOutSubmit = document.getElementById('workings-out-submit');
    let answerError = document.getElementById("error-message");
    let correct = document.createElement("div");
    let incorrect = document.createElement("div");
    let globalIterationBeforeRunning = globalIterationCount;
    console.log(globalIterationBeforeRunning + ' is used for the if statement to effect the last iteration differences');

    correct.innerHTML = `<i class="fa-solid fa-circle-check answer-log-correct iteration-answer-log-smaller center text-shadow bg-removed"></i><br><p>Well Done! Keep smashing it</p>`;
    incorrect.innerHTML = `<i class="fa-solid fa-circle-xmark answer-log-wrong iteration-answer-log-smaller center text-shadow bg-removed"></i><br><p>Dont worry! Lets keep going</p>`;
    console.log(globalIterationCount + ' this is the iteration count before running function');
    console.log(workingsOutInput.value + ' is the workings out input');

    if (workingsOutInput.value === "") {
        answerError.innerHTML = `<br>Place your answer in the box!`;

        console.log('No answer given');
    } else {
        let iterationPow = Math.pow(globalBig, globalIterationCount);
        ++globalIterationCount;

        console.log(iterationPow + ' is the iterationPow');

        if (workingsOutInput.value == iterationPow) {
            if (globalIterationBeforeRunning == globalLittle) {
                alert(`Well Done! You got it right...
That was your last section
Now input the same answer into the final answer section and log your progress!`);

                this.parentNode.appendChild(correct);
                
                console.log('Correct answer given - last iteration');
            } else {
                alert(`Well Done! You got it right...
Lets move on to the next section
Keep up the great work`);

                this.parentNode.appendChild(correct);
                
                console.log('Correct answer given');
            }
        } else {
            if (globalIterationBeforeRunning == globalLittle) {
                alert(`Oops, that doesnt seem to be right
We arent going to give you the answer this time, have another try to work it out and head on over to the final answer section to check your answer
Remember you can use a calculator to work this out, whats important is that you understand the concept of "2 The Power"`);
            
                this.parentNode.appendChild(incorrect);
    
                console.log('Incorrect answer given - last iteration');
            } else {
                alert(`Oops, that doesnt seem to be right
Dont worry we are going to help you with the answer this time, you will see it in the next working out stage.
Remember you can use a calculator to check your answers, whats important is that you understand the concept of "2 The Power"`);

                this.parentNode.appendChild(incorrect);

                console.log('Incorrect answer given');
            }
        }

        console.log(globalIterationCount + ' this is the iteration count after');

        console.log(this.parentNode + ' is the parent Node');
        console.log(this.parentNode.nextSibling + ' is the next sibling');
        console.log(this.parentNode.nextElementSibling + ' is the next element sibling');

        let nextDiv = this.parentNode.nextElementSibling;

        this.remove(workingsOutSubmit);
        workingsOutInput.remove();
        answerError.remove();

        console.log(nextDiv + ' created after removals');

        let newInput = document.createElement('input');
        newInput.setAttribute("id", "workings-out-input");
        newInput.setAttribute("type", "number");

        let newSpan = document.createElement('Span');
        newSpan.setAttribute("id", "error-message");

        let newBtn = document.createElement('Button');
        newBtn.setAttribute("id", "workings-out-submit");
        newBtn.innerHTML = "Check my answer";

        if (globalIterationBeforeRunning != globalLittle) {
            nextDiv.appendChild(newInput);
            nextDiv.appendChild(newSpan);
            nextDiv.appendChild(newBtn);
            nextDiv.childNodes[8].innerHTML = iterationPow;
            console.log(nextDiv.childNodes);

            newInput.focus(newInput);

            //  this event listener is for the following iterations buttons
            document.getElementById('workings-out-submit').addEventListener("click", calculateIteration);
        } else {
            document.getElementById('final-answer-input').focus();
            console.log('im focusing on the final answer input');
        }
    }
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
        And remember, you can always have another try at this question`);
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
        <p class="center text-shadow bg-removed">You answered<br>${finalAnswerInput}</p>
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
        <p class="center text-shadow bg-removed">You answered<br>${finalAnswerInput}</p>
    </div>
        <div class="answer-log-outcome">
        <i class="fa-solid fa-circle-xmark answer-log-wrong center text-shadow bg-removed"></i>
        </div>
    </div>`;
    }

    // appends the answerLogDiv to the AnswerLogPanel
    answerLogPanel.appendChild(answerLogDiv);

}

function refreshAnswerPanelBtn() {
    refreshQuestionPanel();
    nullifyGlobalVariables();
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
    <input id="workings-out-input" type="number">
    <span id="error-message"></span>
    <button id="workings-out-submit">Check my answer</button>
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
</div>`;


    // This event listener is for the first section submit button, i placed it here as it stopped working after the first answer is given, seems to work!
    document.getElementById("question-tile-calculate-btn").addEventListener("click", questionChosen);
}

function nullifyGlobalVariables() {
    globalBig = null;
    globalLittle = null;
    globalIterationCount = 2;

    console.log(globalBig + ' is nullified globalBig');
    console.log(globalLittle + ' is nullified globalLittle');
    console.log(globalIterationCount + ' is gloabalIterationCount reset to 2');

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
