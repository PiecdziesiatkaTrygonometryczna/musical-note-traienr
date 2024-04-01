let displayNotesIntervalId;
let recentNotes = [];
let nextNotes = [];
const amountOfRecentNotesToDisplay = 5;
const amountOfNextNotesToDisplay = 3;
let flagToDisplayNotes = false;

// fill the next notes array with n amount of notes at once
function fillNextNotesArray() {
    nextNotes = [];
    const NextNotesNav = document.querySelector('.next-notes');
    const selectedNotes = Array.from(document.querySelectorAll('input[name="note"]:checked'))
        .map(checkbox => checkbox.value);
    for (let i = 0; i < amountOfNextNotesToDisplay; i++) {
        const randomIndex = Math.floor(Math.random() * selectedNotes.length);
        nextNotes.push(selectedNotes[randomIndex]);
    }
    let string = ""
    for (let i = 0; i < nextNotes.length; i++) {
        string += nextNotes[i] + " "
    }
    NextNotesNav.innerHTML = string; // and also display it in the next-notes nav

}
// function to randomly choose a note from the selected notes array every n seconds
function generateRandomNotes(interval) {
    recentNotes = [];
    stopDisplayingNotes();
    fillNextNotesArray();


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
        // Custom event listening when the playing note is changing
        document.addEventListener('noteChanged', function (event) {
            const currentNotePlaying = event.detail.currentNotePlaying;
            const currentNoteNav = document.querySelector('.current-note');

            if (currentNoteNav.textContent.trim() === currentNotePlaying) {
                currentNoteNav.style.color = 'green'; // Change color of current note div if it matches the current playing note
                console.log("git z intewalem")
            } else {
                currentNoteNav.style.color = '';
            }
        });
        // Revert color when the interval function is called
        currentNoteNav.style.color = '';
        generateRandomNote(); // Generate note every n seconds interval
    }, interval * 1000);
}



// handle the submit of the interval function
function startDisplayingNotesWithInterval() {
    const intervalInput = document.getElementById('intervalInput');
    const interval = parseFloat(intervalInput.value);
    if (!isNaN(interval) && interval >= 0.3 && interval <= 10.0) {
        generateRandomNotes(interval);
    } else {
        alert("Nieprawidłowe dane.");
    }
}

function handleStartDisplayingButton() {
    if (option2Checkbox.checked) {
        generateRandomNotesWithoutInterval();
    } else {
        startDisplayingNotesWithInterval();
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
    flagToDisplayNotes = false;
}




function generateRandomNotesWithoutInterval() {
    recentNotes = [];
    stopDisplayingNotes();
    fillNextNotesArray();


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


    generateRandomNote(); // Generate one note when pressing the button
    flagToDisplayNotes = true;

    function checkNoteMatch() {



        // Custom event listening when the playing note is changing
        document.addEventListener('noteChanged', function (event) {
            const currentNotePlaying = event.detail.currentNotePlaying;
            const currentNoteNav = document.querySelector('.current-note');

            if (currentNoteNav.textContent.trim() === currentNotePlaying) {
                currentNoteNav.style.color = 'green'; // Change color of current note div if it matches the current playing note
                console.log("git bez intrwala")
                setTimeout(function () {
                    generateRandomNote();
                    element.removeEventListener(event, listenerFunction);
                    checkNoteMatch(); // Call the function again to check for the next note match
                }, 1000);
            } else {
                currentNoteNav.style.color = '';
            }
        });

    }

    checkNoteMatch(); // Start checking for note match


}