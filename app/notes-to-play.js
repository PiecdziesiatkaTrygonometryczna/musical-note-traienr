let displayNotesIntervalId;
let recentNotes = [];
const amountOfRecentNotesToDisplay = 5;

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
function generateRandomNotes(interval) {
    recentNotes = [];
    stopDisplayingNotes();
    let nextNotes = makeNextNotesArray();


    const currentNoteNav = document.querySelector('.current-note');
    const NextNotesNav = document.querySelector('.next-notes');
    const selectedNotes = Array.from(document.querySelectorAll('input[name="note"]:checked'))
        .map(checkbox => checkbox.value);


    function generateRandomNote() {
        const randomNote = nextNotes.shift();
        const randomIndex = Math.floor(Math.random() * selectedNotes.length);
        nextNotes.push(selectedNotes[randomIndex]);
        displayRecentNote(randomNote);
        currentNoteNav.innerHTML = `<nav>${randomNote}<nav>`;
        let string = ""
        for (let i = 0; i < nextNotes.length; i++) {
            string += nextNotes[i] + " "
        }
        NextNotesNav.innerHTML = string;
    }


    generateRandomNote();    //generate one note when pressing the button

    displayNotesIntervalId = setInterval(() => {
        // Revert color when the interval function is called
        currentNoteNav.style.color = '';
        generateRandomNote(); // Generate note every n seconds interval
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
    // console.log("recent" + recentNotes);
    // console.log("next" + nextNotes);

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