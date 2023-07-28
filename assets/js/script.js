
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


// Define a variable 'today' to store the current date and time using the dayjs library.
var today = dayjs();

// Wait for the DOM to be fully loaded before executing the code inside this function.
$(document).ready(function () {

  // Function to update the current time every second and display it in the 'currentDayElement'.
  function updateTime() {
    today = dayjs(); // Update the 'today' variable with the current date and time.
    var currentDayElement = document.getElementById('currentDay'); // Get the element with ID 'currentDay'.
    currentDayElement.textContent = today.format('dddd, MMMM D YYYY'); // Update the content of 'currentDayElement' with the formatted current date and time.
  }
  
  // Call the 'updateTime' function every second (1000 milliseconds) using setInterval.
  setInterval(updateTime, 1000);

  // Get all elements with the class 'time-block' and store them in the variable 'timeBlocks'.
  var timeBlocks = document.querySelectorAll('.time-block');

  // Get the current hour (24-hour format) from the 'today' variable and store it in the variable 'hour'.
  var hour = today.format('H');

  // Loop through each element with class 'time-block' to determine if it's past, present, or future.
  timeBlocks.forEach(block => {
    const id = block.id; // Get the ID of the current time block.
    const lastTwoCharacters = id.slice(-2); // Extract the last two characters from the ID.

    // Check if the time represented by the last two characters is less than the current hour.
    if (parseInt(lastTwoCharacters) < parseInt(today.format('H'))) {
      block.classList.remove('present', 'future'); // Remove 'present' and 'future' classes from the element.
      block.classList.add('past'); // Add the 'past' class to the element.
    } else if (parseInt(lastTwoCharacters) > parseInt(today.format('H'))) {
      block.classList.remove('past', 'present'); // Remove 'past' and 'future' classes from the element.
      block.classList.add('future'); // Add the 'future' class to the element.
    } else {
      block.classList.remove('past', 'future'); // Remove 'past' and 'present' classes from the element.
      block.classList.add('present'); // Add the 'present' class to the element.
    }
  });

  // Function to save the user's input from the 'description' field to localStorage.
  function saveDataToLocalStorage() {
    const timeBlocks = document.querySelectorAll('.time-block'); // Get all elements with class 'time-block' again.
    timeBlocks.forEach(block => {
      const id = block.id; // Get the ID of the current time block.
      const description = block.querySelector('.description').value; // Get the value of the 'description' field within the current time block.
      localStorage.setItem(id, description); // Save the description value in localStorage with the time block ID as the key.
    });
  }

  // Function to load the saved data from localStorage and display it in the 'description' field for each time block.
  function loadSavedDataFromLocalStorage() {
    const timeBlocks = document.querySelectorAll('.time-block'); // Get all elements with class 'time-block'.
    timeBlocks.forEach(block => {
      const id = block.id; // Get the ID of the current time block.
      const description = localStorage.getItem(id); // Get the saved description from localStorage using the time block ID as the key.
      if (description) {
        block.querySelector('.description').value = description; // If there's a description, set it as the value of the 'description' field within the time block.
      }
    });
  }

  // Call the function to load the saved data from localStorage and update the scheduler with the saved data.
  loadSavedDataFromLocalStorage();

  // Call the function to update the current time on the scheduler.
  updateTime();

  // Add event listeners to all elements with class 'saveBtn'.
  const saveButtons = document.querySelectorAll('.saveBtn');
  saveButtons.forEach(button => {
    // Attach a click event listener to each 'saveBtn' element.
    button.addEventListener('click', () => {
      saveDataToLocalStorage(); // Call the function to save the user's input to localStorage when the button is clicked.
      showMessage(); // Call the function to show the message.
    });
  });

  // Function to show the message container when the save button is clicked.
  function showMessage() {
    const messageElement = document.getElementById('message');
    const messageTextElement = document.getElementById('messageText');
    messageTextElement.textContent = "Appointment Added to localStorage ✔️"; // Set the message text
    messageElement.style.display = 'block'; // Set the display property to 'block' to show the message.
  
    // Set a timeout to hide the message after 3 seconds (3000 milliseconds).
    setTimeout(function () {
      messageElement.style.display = 'none'; // Set the display property to 'none' to hide the message after the delay.
    }, 3000); // Adjust the time (in milliseconds) as per your preference.
  }


  // Alternatively, use jQuery to add a click event listener to all elements with class 'saveBtn'.
  $('.saveBtn').on('click', function () {
    saveDataToLocalStorage(); // Call the function to save the user's input to localStorage when the button is clicked.

  });
});

// TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
