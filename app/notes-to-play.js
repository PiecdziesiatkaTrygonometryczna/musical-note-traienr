let displayNotesInterval;
let previousNotes = [];


// handle the submit of the interval function
function startProgram() {
    const intervalInput = document.getElementById('intervalInput');
    const interval = parseFloat(intervalInput.value);
    if (!isNaN(interval) && interval >= 0.3 && interval <= 10.0) {
        startDisplayingNotes(interval);
    } else {
        alert("Nieprawidłowe dane.");
    }
}

// fill the next notes array with 3 notes - this function is called only once - when pressing the start button 
function initializeNextNotesArray() {
    const selectedNotes = Array.from(document.querySelectorAll('input[name="note"]:checked'), checkbox => checkbox.value); // notes selected by the user
    const nextNotesNav = document.querySelector('.next-notes'); // the html element where the next notes are displayed
    const randomIndexes = Array.from({ length: 3 }, () => Math.floor(Math.random() * selectedNotes.length)); // generate 3 random notes
    const nextNotes = randomIndexes.map(index => selectedNotes[index]);
    nextNotesNav.textContent = nextNotes.join(" "); // and also display it in the next-notes nav
    return nextNotes;
}


// function to randomly choose a note from the selected notes array every n seconds
function startDisplayingNotes(interval) {
    stopDisplayingNotes() // if any notes are being displayed, stop it

    const currentNoteNav = document.querySelector('.current-note');
    const nextNotesNav = document.querySelector('.next-notes');
    const selectedNotes = Array.from(document.querySelectorAll('input[name="note"]:checked'), checkbox => checkbox.value);

    let nextNotes = initializeNextNotesArray(); // generate initial set of notes
    swipeAllNotesLeft();

    // repeat every specified interval
    displayNotesInterval = setInterval(() => {
        currentNoteNav.style.color = ''; // revert color
        swipeAllNotesLeft();
    }, interval * 1000);

    // helper function to display next note, and move every note 1 place left
    function swipeAllNotesLeft() {
        const currentNote = nextNotes.shift(); // take (and remove) the first note from the next notes array
        currentNoteNav.innerHTML = `<nav>${currentNote}</nav>`; // display it as the current note
        addNoteToPreviousNotes(currentNote); // and add it to previous notes array

        const randomIndex = Math.floor(Math.random() * selectedNotes.length);// generate a new note 
        nextNotes.push(selectedNotes[randomIndex]);// and add it as the last index of the next notes array
        nextNotesNav.textContent = nextNotes.join(" "); // update next notes nav

    }
}

// handle adding note to previous notes array
function addNoteToPreviousNotes(note) {
    if (previousNotes.length > 5) { // prevent previous notes from storing more than 5 notes
        previousNotes.shift();
    }
    previousNotes.push(note);
    const previousNotesNav = document.querySelector('.previous-notes');
    let string = "";

    for (let i = 0; i < previousNotes.length - 1; i++) { // convert all elements of the array to single string
        string += previousNotes[i] + " "
    }
    previousNotesNav.innerHTML = string; // display all notes in the previous-notes nav
}


// function to stop displaying the notes
function stopDisplayingNotes() {
    clearInterval(displayNotesInterval);
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


