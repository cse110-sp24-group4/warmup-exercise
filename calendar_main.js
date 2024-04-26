window.onload = (event) => {
    const monthInput = document.getElementById('monthInput');
    monthInput.addEventListener('input', updateCalendar);

    updateCalendar();
};

function updateCalendar() {
    const calendarContainer = document.getElementById('calendar');
    calendarContainer.querySelectorAll('.day').forEach(child => child.remove());

    const monthInput = document.getElementById('monthInput').value;
    const year = Number(monthInput.split('-')[0]);
    const month = Number(monthInput.split('-')[1]) - 1;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendarContainer.appendChild(document.createElement('div')).className = 'day emptyDay';
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'day';
        day.textContent = i;
        day.addEventListener('click', (e) => {
            document.querySelectorAll('.selectedDay').forEach(d => d.classList.remove('selectedDay'));
            e.currentTarget.classList.add('selectedDay');
            const date = new Date(year, month, i);
            updateScheduler(date);
        });
        calendarContainer.appendChild(day);
    }
}

function updateScheduler(date) {
    const schedulerDateDisplay = document.querySelector('#scheduler-date span');
    schedulerDateDisplay.textContent = date.toLocaleDateString();

    const scheduler = document.querySelector('#daily-scheduler .time-slots');
    scheduler.innerHTML = '';

    for (let hour = 9; hour <= 17; hour++) {
        let timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.innerHTML = `<h2>${hour}:00 - ${hour + 1}:00</h2><ul class="tasks"></ul><button class="add-task">Add Task</button>`;
        scheduler.appendChild(timeSlot);

        timeSlot.querySelector('.add-task').addEventListener('click', function() {
            const taskText = prompt(`Add an event for ${hour}:00 - ${hour + 1}:00 on ${date.toLocaleDateString()}`);
            if (taskText) {
                const taskItem = document.createElement('li');
                taskItem.textContent = taskText;
                timeSlot.querySelector('.tasks').appendChild(taskItem);
                taskIdx = timeSlot.querySelector('.tasks').children.length - 1;

                localStorage.setItem(date + hour + taskIdx, taskText);
                localStorage.setItem(date + hour, Number(taskIdx + 1));
            }
        });


        let tasksLength = localStorage.getItem(date + hour);
        if (tasksLength) {
            for (let i = 0; i < tasksLength; i++) {
                const taskItem = document.createElement('li');
                taskItem.textContent = localStorage.getItem(date + hour + i);
                timeSlot.querySelector('.tasks').appendChild(taskItem);
            }
        }

    }
}
