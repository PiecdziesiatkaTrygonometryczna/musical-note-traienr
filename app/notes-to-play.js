// function to randomly choose a note from the selected notes array every n seconds
let displayIntervalId;
function displayRandomNote(interval) {
    stopDisplaying();
    const notesToPlayDiv = document.querySelector('.notes-to-play');
    const selectedNotes = Array.from(document.querySelectorAll('input[name="note"]:checked'))
        .map(checkbox => checkbox.value);
    displayIntervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * selectedNotes.length);
        const randomNote = selectedNotes[randomIndex];
        notesToPlayDiv.innerHTML = `<nav>${randomNote}<nav>`;
    }, interval * 1000); // n seconds interval
}


// handle the submit of the interval function
function submitRandomNote() {
    const intervalInput = document.getElementById('intervalInput');
    const interval = parseFloat(intervalInput.value);
    if (!isNaN(interval) && interval >= 0.3 && interval <= 10.0) {
        displayRandomNote(interval);
    } else {
        alert("Nieprawidłowe dane.");
    }
}

// function to stop displaying the notes
function stopDisplaying() {
    clearInterval(displayIntervalId);
    const notesToPlayDiv = document.querySelector('.notes-to-play');
    notesToPlayDiv.innerHTML = '';

    const selectedNotesDiv = document.getElementById('selectedNotes');
    selectedNotesDiv.textContent = '';
}
