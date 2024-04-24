//const monthSelector = document.getElementById("#month-selector");

var monthGrid = document.getElementById("month-grid");

const month = 12;
const offset = 4;

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const numDays = monthDays[month - 1];

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

function expandDay(dayId) {
  console.log(`pressed ${dayId}`);
}

for (let i = offset; i >= 0; i--) {
  const lastMonth = (month - 1) % 12;
  const lastMonthDays = monthDays[lastMonth];

  const dayBlock = createDayBlock(`offset${i}`, `${lastMonthDays - i}`);
  dayBlock.disabled = true;

  dayBlock.style.opacity = "70%";
  monthGrid.appendChild(dayBlock);
}

for (let j = 0; j < numDays; j++) {
  const dayBlock = createDayBlock(`main${j}`, `${j + 1}`);
  monthGrid.appendChild(dayBlock);
}

for (let j = 0; j < (7 - ((numDays + offset + 1) % 7)) % 7; j++) {
  const dayBlock = createDayBlock(`end${j}`, `${j + 1}`);
  dayBlock.style.opacity = "70%";
  dayBlock.disabled = true;
  monthGrid.appendChild(dayBlock);
}
