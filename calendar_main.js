const calendarContainer = document.getElementById('calendar');

// Get the month and year
const month = document.getElementById('monthInput').value - 1;
const year = document.getElementById('yearInput').value;


// Get the first day of the month
const firstDay = new Date(year, month, 1).getDay();

// Get the number of days in the month
const daysInMonth = new Date(year, month + 1, 0).getDate();

// Fill in the days of the month
for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('day');
    calendarContainer.appendChild(emptyDay);
}

// Fill in the days of the month
for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.classList.add('day');
    day.textContent = i;
    calendarContainer.appendChild(day);
}
