document.getElementById('eventForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const eventName = document.getElementById('eventName').value;
    const eventDate = new Date(document.getElementById('eventDate').value);
    // Set the time part to the start of the day (00:00:00)
    eventDate.setHours(0, 0, 0, 0);
    addEvent(eventName, eventDate);
});

function addEvent(name, date) {
    const eventsContainer = document.getElementById('eventsContainer');
    const eventElement = document.createElement('div');
    eventElement.className = 'event';
    const uniqueId = `countdown-${name}-${Date.now()}`;
    eventElement.innerHTML = `
        <h2>${name}</h2>
        <p id="${uniqueId}"></p>
        <div class="buttons">
            <button onclick="renameEvent('${uniqueId}')">Rename</button>
            <button onclick="deleteEvent('${uniqueId}')">Delete</button>
        </div>
    `;
    eventsContainer.appendChild(eventElement);
    startCountdown(name, date, uniqueId);
}

function startCountdown(name, date, elementId) {
    const countdownElement = document.getElementById(elementId);
    const intervalId = setInterval(() => {
        const now = new Date();
        const timeDifference = date - now;

        if (timeDifference < 0) {
            countdownElement.innerHTML = `The event has started!`;
            clearInterval(intervalId);
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

function renameEvent(elementId) {
    const newName = prompt('Enter the new name for the event:');
    if (newName) {
        const eventElement = document.querySelector(`#${elementId}`).closest('.event');
        eventElement.querySelector('h2').textContent = newName;
    }
}

function deleteEvent(elementId) {
    const eventElement = document.querySelector(`#${elementId}`).closest('.event');
    eventElement.remove();
}
