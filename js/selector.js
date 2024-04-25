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
// Select main date display
const mainDisplay = document.getElementById("month-header");
// Select input element
const input = document.getElementById("start");

// An array containing each month
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Updates the calendar display with the current month and year
 */
function updateCalendar() {
  currentDateDisplay.innerText = `${months[month]} ${year}`;
  mainDisplay.innerText = `${months[month]} ${year}`;
  input.value = dateToInputFormat(month, year);
  clearAndRepopulate(month, year);
}

/**
 * Updates the calendar based on the input month and year
 */
function updateCalendarFromInput() {
  // Get the month and year from the input field
  const [inputYear, inputMonth] = input.value
    .split("-")
    .map((num) => parseInt(num));
  year = inputYear;
  month = inputMonth - 1;
  updateCalendar();
}

/* Converts numerical values of month and year to string format
 * accepted by input element
 */
function dateToInputFormat(month, year) {
  var inputString = year + "-";
  if (month + 1 < 10) inputString += "0";
  inputString += month + 1;
  return inputString;
}

// Add event listeners to each navigation icon
navigationIcons.forEach((icon) => {
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
