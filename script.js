function toProperCase(textInput) {
    let splitString = textInput.split(" ");
    let newString = "";

    for(let i = 0; i < splitString.length; i++) {
        let currentString = splitString[i];

        let upperCase = currentString.substring(0, 1).toUpperCase();
        let lowerCase = currentString.substring(1).toLowerCase();

        newString += (upperCase + lowerCase + " ");
    }
    return newString.trim();
}

function toSentenceCase(textInput) {
    let splitString = textInput.split(".");
    let newString = "";

    for(let i = 0; i < splitString.length; i++) {
        let currentString = splitString[i];

        let firstNonSpaceIndex = 0;
        for(let j = 0; j < currentString.length; j++) {
            if(currentString.charAt(j) !== " ") {
                firstNonSpaceIndex = j;
                break;
            } else {
                newString += " ";
            }
        }

        let uppercase = currentString.substring(firstNonSpaceIndex, firstNonSpaceIndex + 1).toUpperCase();
        let lowercase = currentString.substring(firstNonSpaceIndex + 1).toLowerCase();

        newString += (uppercase + lowercase);

        if(i !== splitString.length - 1) {
            newString += ".";
        }
    }
    return newString;
}

function removeUnnecessarySpaces(textInput) {
    textInput = textInput.trim();
    let newString = "";
    let isLastCharSpace = false;

    for (let i = 0; i < textInput.length; i++) {
        let currentChar = textInput.charAt(i);
        let isWhitespace = (currentChar === " ");

        if(!isWhitespace) {
            newString += currentChar;
            isLastCharSpace = false;
        } else if(!isLastCharSpace) {
            newString += " ";
            isLastCharSpace = true;
        }
    }

    return newString;
}

function updateLetterCount() {
    document.getElementById("letter-number").innerText =
        document.getElementById("text-area").value.length;
}

function updateWordCount() {
    let textBoxString = document.getElementById("text-area").value;
    let whitespaceCorrectedString = removeUnnecessarySpaces(textBoxString);
    if(textBoxString) {
        let splitString = whitespaceCorrectedString.split(" ");
        document.getElementById("word-number").innerText = splitString.length.toString();
    } else {
        document.getElementById("word-number").innerText = "0";
    }
}

function generateFilename(text) {
    const currentDate = new Date();
    const dateString = currentDate.getDay() + "." + currentDate.getMonth() + "." + currentDate.getFullYear();
    const timeString = currentDate.getHours() + "." + currentDate.getMinutes();
    let stripMessage = text.trim().split(" ");
    if(stripMessage[0].length > 0 && stripMessage[0].length <= 10) {
        return dateString + "_" + timeString + "_" + stripMessage[0].trim() + ".txt";
    } else {
        const messageSubstring = stripMessage[0].trim().substring(0, 10);
        return dateString + "_" + timeString + "_" + messageSubstring + ".txt";
    }
}

function downloadTextFile(filename, text) {
    let anchor = document.createElement("a");
    anchor.setAttribute("href", 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    anchor.setAttribute("download", filename);

    anchor.style.display = "none";
    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
}

function toggleWordCount() {
    const wordIntro = document.getElementById("word-intro");
    const wordCount = document.getElementById("word-number");

    const wordIntroDisplay = getComputedStyle(wordIntro).display;
    const wordCountDisplay = getComputedStyle(wordCount).display;

    const isHidden = wordIntroDisplay === "none" && wordCountDisplay === "none";

    if(isHidden) {
        wordIntro.style.display = "unset";
        wordCount.style.display = "unset";
    } else {
        wordIntro.style.display = "none";
        wordCount.style.display = "none";
    }
}

function toggleLetterCount() {
    const letterIntro = document.getElementById("letter-intro");
    const letterCount = document.getElementById("letter-number");

    const letterIntroDisplay = getComputedStyle(letterIntro).display;
    const letterCountDisplay = getComputedStyle(letterCount).display;

    const isHidden = letterIntroDisplay === "none" && letterCountDisplay === "none";

    if(isHidden) {
        letterIntro.style.display = "unset";
        letterCount.style.display = "unset";
    } else {
        letterIntro.style.display = "none";
        letterCount.style.display = "none";
    }
 }

document.getElementById("upper-case").addEventListener("click", function() {
    let areaString = document.getElementById("text-area").value;
    document.getElementById("text-area").value = areaString.toUpperCase();
});

document.getElementById("lower-case").addEventListener("click", function() {
    let areaString = document.getElementById("text-area").value;
    document.getElementById("text-area").value = areaString.toLowerCase();
});

document.getElementById("proper-case").addEventListener("click", function() {
    let areaString = document.getElementById("text-area").value;
    document.getElementById("text-area").value = toProperCase(areaString);
});

document.getElementById("sentence-case").addEventListener("click", function () {
    let areaString = document.getElementById("text-area").value;
    document.getElementById("text-area").value = toSentenceCase(areaString);
});

document.getElementById("save-text-file").addEventListener("click", function () {
    let areaString = document.getElementById("text-area").value;
    if(areaString) {
        let filename = generateFilename(areaString);
        downloadTextFile(filename, areaString);
    }
});

document.getElementById("text-area").addEventListener("input", function () {
    document.getElementById("letter-number").innerText =
        document.getElementById("text-area").value.length;
});

document.getElementById("text-area").addEventListener("input", updateLetterCount);
document.getElementById("text-area").addEventListener("change", updateLetterCount);

document.getElementById("text-area").addEventListener("input", updateWordCount);
document.getElementById("text-area").addEventListener("change", updateWordCount);

document.getElementById("word-count-btn").addEventListener("click", toggleWordCount);
document.getElementById("letter-count-btn").addEventListener("click", toggleLetterCount);
