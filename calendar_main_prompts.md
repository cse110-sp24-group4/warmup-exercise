1. I have an issue in the styling where saturday is positioned before sunday and was not aligned how could i fix this:
   Answer: Add grid-column: 1 / -1; to .header

2. To access the document from a java script file how can I do that?
   Answer: Use document.getElementById(class) // insert class name

3. How can I have a user input a number into the website and register that in my js file?
   Answer: Use 
   ```html
   <input type="number" id="monthInput" placeholder="Month (1-12)">
   <input type="number" id="yearInput" placeholder="Year (e.g., 2024)">

4. How do I fill in the days of the month once I recieve that data from the API?
   Answer: Use
   ```javascript
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
