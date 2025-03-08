document.addEventListener('DOMContentLoaded', function () {
    const moodIcons = document.querySelectorAll('.mood-icons i');
    const moodSelection = document.querySelector('.mood-selection');
    const moodNotes = document.getElementById('mood-notes');
    const moodDate = document.getElementById('mood-date');
    const submitButton = document.querySelector('.submit-btn');
    const historyContainer = document.createElement('div');
    historyContainer.classList.add('history-container');
    document.body.appendChild(historyContainer);

    // Event listener for mood icon selection
    moodIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const selectedMood = this.getAttribute('data-mood');
            moodSelection.setAttribute('data-mood', selectedMood);

            // Change background based on selected mood
            document.body.style.backgroundColor = getMoodBackground(selectedMood);

            // Store mood in local storage
            const moodHistory = localStorage.getItem('moodHistory') ? JSON.parse(localStorage.getItem('moodHistory')) : [];
            const date = new Date(moodDate.value || new Date()).toLocaleDateString();
            moodHistory.push({ mood: selectedMood, date: date, notes: moodNotes.value });
            localStorage.setItem('moodHistory', JSON.stringify(moodHistory));

            updateMoodHistory(moodHistory);
        });
    });

    // Save mood history in local storage and display
    function updateMoodHistory(history) {
        historyContainer.innerHTML = '<h2>Mood History</h2>';
        history.forEach(entry => {
            const historyItem = document.createElement('div');
            historyItem.classList.add('history-item');
            historyItem.innerHTML = `<strong>${entry.date}</strong> - Mood: ${entry.mood} <br> Notes: ${entry.notes}`;
            historyContainer.appendChild(historyItem);
        });
    }

    // Function to return background color based on mood
    function getMoodBackground(mood) {
        switch (mood) {
            case 'happy': return '#FFD700';
            case 'sad': return '#00BFFF';
            case 'neutral': return '#32CD32';
            case 'angry': return '#FF6347';
            case 'excited': return '#FF69B4';
            default: return '#f5f5f5';
        }
    }

    // Load mood history from local storage
    const savedMoodHistory = localStorage.getItem('moodHistory');
    if (savedMoodHistory) {
        updateMoodHistory(JSON.parse(savedMoodHistory));
    }

    // Handle saving mood notes and mood date
    submitButton.addEventListener('click', function () {
        if (moodNotes.value.trim() === '') {
            alert('Please add some notes about your mood.');
            return;
        }
    });
});
