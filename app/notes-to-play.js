let displayNotesIntervalId;
let recentNotes = [];
let nextNotes = [];
const amountOfRecentNotesToDisplay = 5;
const amountOfNextNotesToDisplay = 3;

function fillNextNotesArray() {
    nextNotes = [];
    const NextNotesNav = document.querySelector('.next-notes');
    const selectedNotes = Array.from(document.querySelectorAll('input[name="note"]:checked'))
        .map(checkbox => checkbox.value);
    for (let i = 0; i <= amountOfNextNotesToDisplay; i++) {
        const randomIndex = Math.floor(Math.random() * selectedNotes.length);
        nextNotes.push(selectedNotes[randomIndex]);
    }
    let string = ""
    for (let i = 0; i < nextNotes.length; i++) {
        string += nextNotes[i] + " "
    }
    NextNotesNav.innerHTML = string;

}
// function to randomly choose a note from the selected notes array every n seconds
function generateRandomNotes(interval) {
    stopDisplayingNotes();
    fillNextNotesArray()


    const currentNoteNav = document.querySelector('.current-note');
    const selectedNotes = Array.from(document.querySelectorAll('input[name="note"]:checked'))
        .map(checkbox => checkbox.value);


    function generateRandomNote() {
        const randomIndex = Math.floor(Math.random() * selectedNotes.length);
        const randomNote = selectedNotes[randomIndex];
        displayRecentNote(randomNote);
        currentNoteNav.innerHTML = `<nav>${randomNote}<nav>`;
    }


    generateRandomNote();    //generate one note when pressing the button

    displayNotesIntervalId = setInterval(() => {
        generateRandomNote(); // and then generate it every n seconds interval
    }, interval * 1000);
}


// handle the submit of the interval function
function startDisplayingNotes() {
    const intervalInput = document.getElementById('intervalInput');
    const interval = parseFloat(intervalInput.value);
    if (!isNaN(interval) && interval >= 0.3 && interval <= 10.0) {
        generateRandomNotes(interval);
    } else {
        alert("Nieprawidłowe dane.");
    }
}

// handle displaying previous notes
function displayRecentNote(note) {
    if (recentNotes.length > amountOfRecentNotesToDisplay) {
        recentNotes.shift();
    }
    recentNotes.push(note);
    console.log(recentNotes);

    const previousNotesNav = document.querySelector('.previous-notes');
    let string = "";

    for (let i = 0; i < recentNotes.length - 1; i++) {
        string += recentNotes[i] + " "
    }
    previousNotesNav.innerHTML = string;
}


// function to stop displaying the notes
function stopDisplayingNotes() {
    clearInterval(displayNotesIntervalId);
}
