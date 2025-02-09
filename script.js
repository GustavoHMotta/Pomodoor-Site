document.addEventListener('DOMContentLoaded', () => {
    const timerElement = document.getElementById('timer');
    const timerProgress = document.getElementById('timer-progress');
    let time = 25 * 60; // 25 minutes in seconds
    let timerInterval;

    function updateTimer() {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        const progress = (time / (25 * 60)) * 848.23;
        timerProgress.style.strokeDashoffset = 848.23 - progress;
        if (time > 0) {
            time--;
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            stopButton.textContent = 'Restart';
        }
    }

    // Set initial timer display to 25:00
    timerElement.textContent = '25:00';

    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');

    startButton.addEventListener('click', () => {
        if (!timerInterval) {
            if (time === 25 * 60) {
                time--; // Decrease time by 1 second immediately if at 25 minutes
                updateTimer(); // Update the timer display immediately
            }
            timerInterval = setInterval(updateTimer, 1000);
            stopButton.textContent = 'Stop';
        }
    });

    stopButton.addEventListener('click', () => {
        if (stopButton.textContent === 'Stop') {
            clearInterval(timerInterval);
            timerInterval = null;
            stopButton.textContent = 'Restart';
        } else {
            time = 25 * 60; // Reset to 25 minutes
            timerElement.textContent = '25:00';
            timerProgress.style.strokeDashoffset = 0;
            stopButton.textContent = 'Stop';
        }
    });

    const sandwichButton = document.getElementById('sandwich-button');
    const dropdown = document.getElementById('dropdown');

    sandwichButton.addEventListener('click', () => {
        dropdown.classList.toggle('show');
        if (dropdown.classList.contains('show')) {
            dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
        } else {
            dropdown.style.maxHeight = null;
        }
    });

    window.addEventListener('click', (event) => {
        if (!event.target.matches('.sandwich-button')) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
                dropdown.style.maxHeight = null;
            }
        }
    });
});