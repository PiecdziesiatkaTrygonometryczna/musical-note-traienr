let submitButton = document.querySelector('.display-notes');

document.addEventListener('DOMContentLoaded', function () {
    submitButton.disabled = true; // disable the submit button by default
});

// when nointerval is checked, disable intervalinput
document.getElementById('noInterval').addEventListener('change', function () {
    document.getElementById('intervalInput').disabled = this.checked;
});


// function to select or unselect a specific note to later display it or not
function toggleNote(note) {
    const button = document.querySelector(`button[value="${note}"]`);
    const checkbox = document.querySelector(`input[value="${note}"]`);

    button.disabled = true;

    setTimeout(function () {
        button.disabled = false;
    }, 100);

    button.classList.toggle('selected');
    checkbox.checked = !checkbox.checked;

    const checkedNotes = Array.from(document.querySelectorAll('input[name="note"]:checked')).map(input => input.value);
    console.log(checkedNotes);

    // disable the start button if there are less than 2 notes selected
    submitButton.disabled = checkedNotes.length < 2;
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
    selectNotes(value => value.endsWith('♯'));
}

function selectAllNaturalNotes() {
    selectNotes(value => !value.endsWith('♯'));
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