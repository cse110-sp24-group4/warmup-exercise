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
const populateMonthGrid = (month, year) => {
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
};

populateMonthGrid(2, 2024);
