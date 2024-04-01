let areNotesMatching = false; // 

// event listening when the playing note is changing
document.addEventListener('noteChanged', function (event) {
    console.log("działam!");
    const currentNotePlaying = event.detail.currentNotePlaying;
    const currentNoteNav = document.querySelector(`.${CURRENT_NOTE_CLASS}`);

    if (currentNoteNav.textContent.trim() === currentNotePlaying) {
        currentNoteNav.style.color = 'green'; // Change color of current note div if it matches the current playing note
        areNotesMatching = true;
    } else {
        currentNoteNav.style.color = '';
        areNotesMatching = false;
    }
});
