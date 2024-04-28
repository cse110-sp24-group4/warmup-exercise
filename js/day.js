// Array to resolve indexes to month names
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

var dateString = "1995-06-02";
var entries = [];
var numNotes = 0;
/**
 * Sets date to be displayed
 * @param {string} dateStringFromHTML 
 */
function setDate(dateStringFromHTML) {
    clearInfo();
    dateString = dateStringFromHTML;
    loadEntries();
    update(0);
}
/**
* Adds a note to the specified date
* @param {string} entry - note to be added 
*/
function newEntry(entry) {
    var newNote = document.getElementById(entry).value;
    document.getElementById(entry).value = "New note";
    entries.push(newNote);
    update(numNotes);
    numNotes++;
}
/**
* Stores entries for day in localStorage
*/
function storeEntries() {
    if (entries[0] != undefined) {
        const entriesStored = JSON.stringify(entries);
        localStorage.setItem(dateString, entriesStored);
    } else {
        localStorage.removeItem(dateString);
    }
}
/**
 * Load entries from localStorage
 */
function loadEntries() {
    const entriesString = localStorage.getItem(dateString);
    const tmpArray = JSON.parse(entriesString);
    if (tmpArray != null) {
        entries = tmpArray;
    }
    if (entries[0] != undefined) {
        numNotes = entries.length;
    }
}
/**
 * Displays day information in HTML document
 * @param {int} start - Starting index for adding entries to the day
 */
function displayInfo(start) {
    var dateArray = dateString.split('-');
    var text = document.getElementById("day-info");
    text.style.display = "block";
    
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];
        
    const childList = text.children;
    childList[0].innerHTML = monthName + ' ' + dateArray[2] + ', ' + dateArray[0];
    for (i = start; i < entries.length; i++) {
        const newNode = document.createElement("div");
        newNode.id = "entry-" + i;
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.id = "editEntry-" + i;
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.id = "deleteEntry-" + i;
        

        newNode.innerHTML = entries[i];
        const elem = document.getElementById("day-info");
        elem.insertBefore(newNode, document.getElementById("newNote"));
        newNode.appendChild(editButton);
        newNode.appendChild(deleteButton);
        
        editButton.addEventListener("click", () => editEntry(newNode.id));
        deleteButton.addEventListener("click", () => deleteEntry(newNode.id));
    }
}
/**
 * Updates day information
 * @param {int} start - Starting index of new entries to be added to HTML document
 */
function update(start) {
    storeEntries();
    displayInfo(start);
}
/**
 * Clears variables to prepare for displaying a new date
 */
function clearInfo() {
    for (i = 0; i < entries.length; i++) {
        const elem = document.getElementById("entry-" + i);
        elem.remove();
    }
    entries = [];
    numNotes = 0;
}
/**
 * Removes and entry from the current date
 * @param {string} noteId - Id attribute of element to be removed from HTML document
 */
function deleteEntry(noteId) {
    const idArray = noteId.split('-');
    entries.splice(idArray[1], 1);
    removeAllElementsBelow(idArray[1]);
    numNotes--;
    update(idArray[1]);
}
/**
 * Edits an entry for the current date
 * @param {string} noteId - Id attribute of element to be edited
 */
function editEntry(noteId) {
    const elem = document.getElementById("newNote");
    const entryTextTemp = document.getElementById(noteId).innerText;
    const entryText = entryTextTemp.replace("EditDelete", '');
    elem.value = entryText;
    deleteEntry(noteId);
}
function removeAllElementsBelow(index) {
    for (i = index; i < numNotes; i++) {
        document.getElementById("entry-" + i).remove();
    }
}
