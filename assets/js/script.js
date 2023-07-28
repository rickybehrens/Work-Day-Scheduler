// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours of 9am&ndash;5pm
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future
// WHEN I click into a timeblock
// THEN I can enter an event
// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist


// PSEUDO CODE

// Add time today's date to the header
// Complete the time boxes from 9am to 5pm
// Make sure the "Save" button atually stor the information locally
// Anything that's in the past will be gray. Anything current time will be red. Future will be green



// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
// var hour = today.format('h')

var today = dayjs();

function updateTime() {
  var currentDayElement = document.getElementById('currentDay');
  currentDayElement.textContent = today.format('dddd, MMMM D YYYY, h:mm:ss a');
}
// Call the updateCurrentDay function every second (1000 milliseconds)
setInterval(updateTime, 1000);

var timeBlocks = document.querySelectorAll('.time-block');
var hour = today.format('H')

timeBlocks.forEach(block => {
  const id = block.id;
  const lastTwoCharacters = id.slice(-2); // Using slice method

  // Use the last two characters in the div's id to determine what's past, present and future
  timeBlocks.forEach(block => {
    const id = block.id;
    const lastTwoCharacters = id.slice(-2); // Using slice method

    if (parseInt(lastTwoCharacters) < parseInt(today.format('H'))) {
      block.classList.remove('present', 'future'); // Remove present and future classes
      block.classList.add('past'); // Add the 'past' class
    } else if (parseInt(lastTwoCharacters) > parseInt(today.format('H'))) {
      block.classList.remove('past', 'present'); // Remove past and future classes
      block.classList.add('future'); // Add the 'present' class
    } else {
      block.classList.remove('past', 'future'); // Remove past and present classes
      block.classList.add('present'); // Add the 'future' class
    }
  });
});

// Function to save the user's input to localStorage
function saveDataToLocalStorage() {
  const timeBlocks = document.querySelectorAll('.time-block');
  timeBlocks.forEach(block => {
    const id = block.id;
    const description = block.querySelector('.description').value;
    localStorage.setItem(id, description);
  });
}

// Function to load the saved data from localStorage and display it in the scheduler
function loadSavedDataFromLocalStorage() {
  const timeBlocks = document.querySelectorAll('.time-block');
  timeBlocks.forEach(block => {
    const id = block.id;
    const description = localStorage.getItem(id);
    if (description) {
      block.querySelector('.description').value = description;
    }
  });
}

// Call the functions to load the saved data and update the scheduler
loadSavedDataFromLocalStorage();
updateTime();

// Add event listeners to the save buttons
const saveButtons = document.querySelectorAll('.saveBtn');
saveButtons.forEach(button => {
  button.addEventListener('click', () => {
    saveDataToLocalStorage();
  });
});

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
