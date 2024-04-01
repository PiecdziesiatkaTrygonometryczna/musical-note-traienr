let pause = false;

document.addEventListener('noteChanged', function (event) {
    if (!pause) {
        const currentNotePlaying = event.detail.currentNotePlaying;
        const currentNoteNav = document.querySelector(`.${CURRENT_NOTE_CLASS}`);
        console.log(currentNotePlaying);

        if (currentNoteNav.textContent.trim() === currentNotePlaying) {
            console.log("dobrze");
            currentNoteNav.style.color = 'green';
            console.log(withoutInterval);
            if (withoutInterval) { pause = true; setTimeout(() => { updateNotesDisplay(); pause = false; }, 1000); }
            else if (!withInterval) { setTimeout(() => revertColorOfCurrentNote(), 1000); }
        }
    }
}

);