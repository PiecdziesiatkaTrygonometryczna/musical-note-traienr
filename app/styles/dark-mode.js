const modeToggleBtn = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');
const body = document.body;

modeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
        modeIcon.style.color = '#f0f0f0';
    } else {
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
        modeIcon.style.color = '';
    }
});
