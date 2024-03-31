// function to randomly choose a note from the selected notes array every n seconds
function displayRandomNote(n) {
    const notesToPlayDiv = document.querySelector('.notes-to-play');
    const selectedNotes = Array.from(document.querySelectorAll('input[name="note"]:checked'))
        .map(checkbox => checkbox.value);
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * selectedNotes.length);
        const randomNote = selectedNotes[randomIndex];
        notesToPlayDiv.innerHTML = `<nav>${randomNote}<nav>`;
    }, n * 5000); // n seconds interval
}
