window.onload = (event) => {
    const monthInput = document.getElementById("monthInput");

    monthInput.addEventListener("input", updateCalendar);

    updateCalendar()
  };


function updateCalendar() {
    const calendarContainer = document.getElementById('calendar');
    const childrenWithClassDay = calendarContainer.querySelectorAll('.day');
      
    // Remove each child with the class 'day'
    childrenWithClassDay.forEach(child => {
        child.remove();
    });

    // Get the month and year
    const monthInput = document.getElementById('monthInput').value;
    const year = Number(monthInput.split('-')[0]);
    const month = Number(monthInput.split('-')[1]) - 1;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Fill in the days of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day');
        emptyDay.classList.add('emptyDay');
        calendarContainer.appendChild(emptyDay);
    }

    // Fill in the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.textContent = i;
        calendarContainer.appendChild(day);
    }
}
