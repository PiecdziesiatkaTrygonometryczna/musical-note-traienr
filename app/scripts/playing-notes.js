let pause = false;

document.addEventListener('noteChanged', function (event) {
    if (!pause) {
        const currentNotePlaying = event.detail.currentNotePlaying;
        const currentNoteNav = document.querySelector(`.${CURRENT_NOTE_CLASS}`);
        console.log(currentNotePlaying);

        if (currentNoteNav.textContent.trim() === currentNotePlaying) {
            pause = true;
            console.log("dobrze");
            currentNoteNav.style.color = 'green';
            setTimeout(() => { updateNotesDisplay(); pause = false; }, 1000);

        }
    }
}

);