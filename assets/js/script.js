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
    var id = block.id; // Get the ID of the current time block.
    var lastTwoCharacters = id.slice(-2); // Extract the last two characters from the ID.

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
  function saveDataToLocalStorage(description, id) {
    localStorage.setItem(id, description); // Save the description value in localStorage with the time block ID as the key.
  }

  // Function to load the saved data from localStorage and display it in the 'description' field for each time block.
  function loadSavedDataFromLocalStorage() {
    var timeBlocks = document.querySelectorAll('.time-block'); // Get all elements with class 'time-block'.
    timeBlocks.forEach(block => {
      var id = block.id; // Get the ID of the current time block.
      var description = localStorage.getItem(id); // Get the saved description from localStorage using the time block ID as the key.
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
  var saveButtons = document.querySelectorAll('.saveBtn');
  saveButtons.forEach(button => {
    // Attach a click event listener to each 'saveBtn' element.
    button.addEventListener('click', (event) => {
      var descriptionField = event.target.parentElement.querySelector('.description');
      var description = descriptionField.value;
      var id = event.target.parentElement.id;
      saveDataToLocalStorage(description, id); // Call the function to save the user's input to localStorage when the button is clicked.
      showMessage(); // Call the function to show the message.
    });
  });

  // Function to show the message container when the save button is clicked.
  function showMessage() {
    var messageElement = document.getElementById('message');
    var messageTextElement = document.getElementById('messageText');
    messageTextElement.textContent = "Appointment Added to localStorage ✔️"; // Set the message text
    messageElement.style.display = 'block'; // Set the display property to 'block' to show the message.
  
    // Set a timeout to hide the message after 3 seconds (3000 milliseconds).
    setTimeout(function () {
      messageElement.style.display = 'none'; // Set the display property to 'none' to hide the message after the delay.
    }, 3000); // Adjust the time (in milliseconds) as per your preference.
  }
});

