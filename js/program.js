// This section executes when the js file is loaded by the browser

let userInput = [];
let modifiedInput = [];

let getInput = document.querySelector("#getInput"),
    startSection = document.querySelector("#startSection"),
    ulOriginal = document.querySelector("#ulOriginal"),
    updateInput = document.querySelector("#updateInput"),
    endSection = document.querySelector("#endSection"),
    ulConverted = document.querySelector("#ulConverted")

getInput.addEventListener("click", getUserInput, false)
updateInput.addEventListener("click", updateUserInput, false)


// functions only execute when they are called
function getUserInput() {
    for (let i = 0; i < 3; i++) {
        userInput[i] = prompt("Please enter a word");
        createListItem("#ulOriginal", userInput[i]);
    }
    getInput.style.visibility = "hidden";
    updateInput.style.visibility = "visible";
}

function updateUserInput() {
    modifiedInput = userInput.map(swapFirstAndLast)
    for (let i = 0; i < modifiedInput.length; i++) {
        createListItem("#ulConverted", modifiedInput[i]);
    }
    startSection.style.display = "none";
    endSection.style.display = "block";
    updateInput.style.visibility = "hidden";
}

function createListItem(listItemId, listItemTest) {
    let ulTarget = document.querySelector(listItemId);
    let inputListItem = document.createElement('li');
    inputListItem.appendChild(document.createTextNode(listItemTest));
    ulTarget.appendChild(inputListItem);
}

function swapFirstAndLast(inputString) {
    let reversedString = inputString.charAt(inputString.length - 1) +
        inputString.substring(1, inputString.length - 1) +
        inputString.charAt(0);
    return reversedString;
}