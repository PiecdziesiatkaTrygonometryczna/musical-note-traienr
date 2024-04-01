let displayNotesInterval;


function generateRandomNote() {
    const selectedNotes = Array.from(document.querySelectorAll('input[name="note"]:checked'), checkbox => checkbox.value);
    const randomIndex = Math.floor(Math.random() * selectedNotes.length);
    return selectedNotes[randomIndex];
}


// start displaying notes with an interval
function startProgram() {
    const intervalInput = document.getElementById('intervalInput');
    const interval = parseFloat(intervalInput.value);
    if (!isNaN(interval) && interval >= 0.3 && interval <= 10.0) {
        startDisplayingNotes(interval);
    } else {
        alert("Nieprawidłowe dane.");
    }
}

// fill the next notes array with 3 random notes
function initializeNextNotesArray() {
    const nextNotes = Array.from({ length: 3 }, generateRandomNote);
    setNextNotesNav(nextNotes.join(" ")); // and also display it in the next-notes nav
    return nextNotes;
}


// function to randomly display a note from the selected notes array every n seconds
function startDisplayingNotes(interval) {
    stopDisplayingNotes() // if any notes are being displayed, stop it

    initializeNextNotesArray(); // generate initial set of notes
    swipeAllNotesLeft();

    displayNotesInterval = setInterval(() => {    // repeat every specified interval
        revertColorOfCurrentNote(); // rever color to default when switching
        swipeAllNotesLeft();
    }, interval * 1000);
}

// helper function to display next note, and move every note 1 place left
function swipeAllNotesLeft() {
    nextNotes = getNextNotes();
    if (getCurrentNote()) { addNoteToPreviousNotes(getCurrentNote()) }// add current note to previous notes array if it exists
    setCurrentNoteNav(nextNotes.shift()); // remove the first note from the next notes array and display it as the current note
    nextNotes.push(generateRandomNote());// add random note as last index of next notes
    setNextNotesNav(nextNotes.join(" ")); // update next notes nav
}

// handle adding note to previous notes array
function addNoteToPreviousNotes(note) {
    previousNotes = getPreviousNotes();
    if (previousNotes.length >= 5) { // prevent previous notes from storing more than 5 notes
        previousNotes.shift();
    }
    previousNotes.push(note);
    setPreviousNotesNav(previousNotes.join(" "));

}

function stopDisplayingNotes() {
    clearInterval(displayNotesInterval);
}

const getCurrentNote = () => document.querySelector('.current-note').innerText;

function getNextNotes() {
    const nextNotesNav = document.querySelector('.next-notes');
    return nextNotesNav.textContent.trim().split(" ");
}

function getPreviousNotes() {
    const previousNotesNav = document.querySelector('.previous-notes');
    return previousNotesNav.textContent.trim().split(" ");
}


function setCurrentNoteNav(note) {
    const currentNoteNav = document.querySelector('.current-note');
    currentNoteNav.innerHTML = `<nav>${note}</nav>`;
}

function setNextNotesNav(string) {
    const nextNotesNav = document.querySelector('.next-notes');
    nextNotesNav.textContent = string;
}

function setPreviousNotesNav(string) {
    const previousNotesNav = document.querySelector('.previous-notes');
    previousNotesNav.textContent = string;
}

function revertColorOfCurrentNote() {
    const currentNoteNav = document.querySelector('.current-note');
    currentNoteNav.style.color = '';
}

// Custom event listening when the playing note is changing
document.addEventListener('noteChanged', function (event) {
    const currentNotePlaying = event.detail.currentNotePlaying;
    const currentNoteNav = document.querySelector('.current-note');

    if (currentNoteNav.textContent.trim() === currentNotePlaying) {
        currentNoteNav.style.color = 'green'; // Change color of current note div if it matches the current playing note
    } else {
        currentNoteNav.style.color = '';
    }
});


