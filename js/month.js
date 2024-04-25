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
  var monthString = month + 1;
  var dayString = dayId.replace(/\D/g, "");
  dayString = parseInt(dayString) + 1;
  const dateString = year + "-" + monthString + "-" + dayString;
  setDate(dateString);
}

/* Gets day of week for first day of the month. */
function getOffset(month, year) {
  const firstDay = new Date(year, month, 1);
  return firstDay.getDay();
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

  const numDays = monthDays[month];

  /* Populates days of week from previous month. Each block has id `offset${dayOfMonth - 1}`  */
  for (let i = offset; i >= 0; i--) {
    const lastMonth = (month - 1 + 12) % 12;
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
