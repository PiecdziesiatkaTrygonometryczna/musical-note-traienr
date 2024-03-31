let submitButton = document.querySelector('.display-notes');

document.addEventListener('DOMContentLoaded', function () {
    submitButton.disabled = true; // disable the submit button by default
});

// function to select or unselect a specific note to later display it or not
function toggleNote(note) {
    const button = document.querySelector(`button[value="${note}"]`);
    const checkbox = document.querySelector(`input[value="${note}"]`);
    button.classList.toggle('selected');
    checkbox.checked = !checkbox.checked;

    // Enable the submit button if at least 2 notes are selected
    const checkboxes = document.querySelectorAll('input[name="note"]:checked');
    submitButton.disabled = checkboxes.length < 2;
}

// function to select notes based on a filter condition
function selectNotes(filterCondition) {
    const notes = Array.from(document.querySelectorAll('input[name="note"]'));
    notes.forEach(note => {
        const button = document.querySelector(`button[value="${note.value}"]`);
        if (filterCondition(note.value)) {
            note.checked = true;
            button.classList.add('selected');
        } else {
            note.checked = false;
            button.classList.remove('selected');
        }
    });
    submitButton.disabled = !notes.some(note => filterCondition(note.value));
}

function selectAllSharpNotes() {
    selectNotes(value => value.endsWith('#'));
}

function selectAllNaturalNotes() {
    selectNotes(value => !value.endsWith('#'));
}

function selectAllNotes() {
    selectNotes(() => true);
}
function unselectAllNotes() {
    selectNotes(() => false);
}


// debugging function to display all of the selected notes.
function displaySelectedNotes() {
    const selectedNotesDiv = document.getElementById('selectedNotes');
    const selectedNotes = Array.from(document.querySelectorAll('input[name="note"]:checked'))
        .map(checkbox => checkbox.value);
    selectedNotesDiv.textContent = 'Selected notes: ' + selectedNotes.join(', ');
}