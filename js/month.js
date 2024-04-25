// Initialize the current date
let date = new Date();
// Extract the year from the current date
let year = date.getFullYear();
// Extract the month from the current date 
let month = date.getMonth();

// Select the HTML element that displays the current date
const currentDateDisplay = document.querySelector(".calendar-current-date");
// Select the navigation icons for changing months
const navigationIcons = document.querySelectorAll(".calendar-navigation span");

// An array containing each month
const months = ["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"];

/**
 * Updates the calendar display with the current month and year
 */
function updateCalendar() {
    currentDateDisplay.innerText = `${months[month]} ${year}`;
}

/**
 * Updates the calendar based on the input month and year
 */
function updateCalendarFromInput() {
    // Get the month and year from the input field
    const input = document.getElementById('start');
    const [inputYear, inputMonth] = input.value.split('-').map(num => parseInt(num));
    year = inputYear;
    month = inputMonth - 1;
    updateCalendar();
}

// Add event listeners to each navigation icon
navigationIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        // Determine which icon was clicked and adjust the month accordingly
        if (icon.id === "calendar-prev") {
            month--;
            // Year decrement when moving back from January to December
            if (month < 0) {
                month = 11;
                year--;
            }
        } else if (icon.id === "calendar-next") {
            month++;
            // Year increment when moving forward from December to January
            if (month > 11) {
                month = 0;
                year++;
            }
        }
        // Update the calendar display to reflect the new month and year
        updateCalendar();
    });
});

// Call updateCalendar initially to set the initial display
updateCalendar();


//const monthSelector = document.getElementById("#month-selector");

/* Creates each individual day block in the month grid using specified text and id */
function createDayBlock(id, text) {
  var dayBlock = document.createElement("button");
  var dayText = document.createElement("p");
  var dayTextContents = document.createTextNode(text);
  dayText.appendChild(dayTextContents);
  dayBlock.appendChild(dayText);
  dayBlock.className = "day-block";
  dayBlock.id = id;
  dayBlock.onclick = () => expandDay(id);
  return dayBlock;
}

/* Function to handle when day block is pressed */
function expandDay(dayId) {
  console.log(`pressed ${dayId}`);
}

/* Gets day of week for first day of the month. Formula found from https://cs.uwaterloo.ca/~alopez-o/math-faq/node73.html */
function getOffset(month, year) {
  const k = 1;
  const m = ((month - 3 + 12) % 12) + 1;
  const C = Math.floor(year / 100);
  const Y = (year % 100) - (month <= 2 ? 1 : 0);
  const offset =
    (k +
      Math.floor(2.6 * m - 0.2) -
      2 * C +
      Y +
      Math.floor(Y / 4) +
      Math.floor(C / 4) +
      7) %
    7;
  return offset;
}

/* Fills month grid with buttons for each day based on selected year and month */
function populateMonthGrid(month, year) {
  const monthDays = [
    31,
    year % 4 == 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  const monthGrid = document.getElementById("month-grid");

  const offset = getOffset(month, year) - 1;

  const numDays = monthDays[month - 1];

  /* Populates days of week from previous month. Each block has id `offset${dayOfMonth - 1}`  */
  for (let i = offset; i >= 0; i--) {
    const lastMonth = (month - 1) % 12;
    const lastMonthDays = monthDays[lastMonth];

    const dayBlock = createDayBlock(`offset${i}`, `${lastMonthDays - i}`);
    dayBlock.disabled = true;

    dayBlock.style.opacity = "70%";
    monthGrid.appendChild(dayBlock);
  }

  /* Populates days of week from current month. Each block has id `main${dayOfMonth - 1}`  */
  for (let j = 0; j < numDays; j++) {
    const dayBlock = createDayBlock(`main${j}`, `${j + 1}`);
    monthGrid.appendChild(dayBlock);
  }

  /* Populates days of week from next month. Each block has id `end${dayOfMonth - 1}` */
  for (let j = 0; j < (7 - ((numDays + offset + 1) % 7)) % 7; j++) {
    const dayBlock = createDayBlock(`end${j}`, `${j + 1}`);
    dayBlock.style.opacity = "70%";
    dayBlock.disabled = true;
    monthGrid.appendChild(dayBlock);
  }
}

/* Clears the grid of all day blocks */
function clearMonthGrid() {
  const monthGrid = document.getElementById("month-grid");

  const dayBlocks = monthGrid.getElementsByClassName("day-block");
  for (let i = dayBlocks.length - 1; i >= 0; i--) {
    monthGrid.removeChild(dayBlocks[i]);
  }
}

/* Refreshes the grid to update the days */
function clearAndRepopulate(month, year) {
  clearMonthGrid();
  populateMonthGrid(month, year);
}

clearAndRepopulate(2, 2024);
