let displayNotesIntervalId;
let previousNotes = [];

// fill the next notes array with 3 notes - this function is only called once - when pressing the start button
function makeNextNotesArray() {
    const nextNotesNav = document.querySelector('.next-notes'); // the html element where the next notes are displayed
    const selectedNotes = Array.from(document.querySelectorAll('input[name="note"]:checked'), checkbox => checkbox.value); // notes selected by the user
    const randomIndexes = Array.from({ length: 3 }, () => Math.floor(Math.random() * selectedNotes.length)); // generate random notes
    const nextNotes = randomIndexes.map(index => selectedNotes[index]);
    nextNotesNav.textContent = nextNotes.join(" "); // and also display it in the next-notes nav
    return nextNotes;
}



// function to randomly choose a note from the selected notes array every n seconds
function startDisplayingNotes(interval) {
    // Helper function to generate a random note
    function generateRandomNote() {
        const randomNote = nextNotes.shift(); // take the first note of the next notes and display it as the current one
        addNoteToPreviousNotes(randomNote);

        const randomIndex = Math.floor(Math.random() * selectedNotes.length);// and generate a new note at the end of the next notes
        nextNotes.push(selectedNotes[randomIndex]);

        updateNextNotesNav();
        updateCurrentNoteNav(randomNote);
    }

    // Initialize variables
    stopDisplayingNotes();

    // DOM elements
    const currentNoteNav = document.querySelector('.current-note');
    const nextNotesNav = document.querySelector('.next-notes');

    // Get selected notes
    const selectedNotes = Array.from(document.querySelectorAll('input[name="note"]:checked'), checkbox => checkbox.value);

    // Generate initial set of notes
    let nextNotes = makeNextNotesArray();
    generateRandomNote();

    // Generate notes at the specified interval
    displayNotesIntervalId = setInterval(() => {
        currentNoteNav.style.color = ''; // Revert color
        generateRandomNote();
    }, interval * 1000);

    // Helper function to update next notes display
    function updateNextNotesNav() {
        nextNotesNav.textContent = nextNotes.join(" ");
    }

    function updateCurrentNoteNav(note) {
        currentNoteNav.innerHTML = `<nav>${note}</nav>`;
    }
}


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

// handle displaying previous notes
function addNoteToPreviousNotes(note) {
    if (previousNotes.length > 5) {
        previousNotes.shift();
    }
    previousNotes.push(note);
    // console.log("previous" + previousNotes);
    // console.log("next" + nextNotes);

    const previousNotesNav = document.querySelector('.previous-notes');
    let string = "";

    for (let i = 0; i < previousNotes.length - 1; i++) {
        string += previousNotes[i] + " "
    }
    previousNotesNav.innerHTML = string;
}


// function to stop displaying the notes
function stopDisplayingNotes() {
    clearInterval(displayNotesIntervalId);
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