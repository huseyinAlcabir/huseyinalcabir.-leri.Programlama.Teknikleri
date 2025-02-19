// Define an array containing flag data
const flags = [
  { country: "Turkey", url: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Flag_of_the_Ottoman_Empire_%281844%E2%80%931922%29.svg" },
  { country: "Qatar", url: "https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Qatar.svg" },
  { country: "Somalia", url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Somalia.svg" },
  { country: "Mexico", url: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg" },
  { country: "Syria", url: "https://upload.wikimedia.org/wikipedia/commons/1/14/Flag_of_the_Syrian_revolution.svg" },
  { country: "Saudi Arabia", url: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg" },
  { country: "Brazil", url: "https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg" },
  { country: "Algeria", url: "https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg" },
  { country: "France", url: "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg" },
  { country: "Iraq", url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Flag_of_Iraq.svg" },
  { country: "Canada", url: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg" },
  { country: "Sudan", url: "https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_Sudan.svg" },
  { country: "Japan", url: "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg" },
  { country: "Jordan", url: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Jordan.svg" },
  { country: "United States", url: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" },
  { country: "Oman", url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Oman.svg" },
  { country: "Italy", url: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg" },
  { country: "Morocco", url: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg" },
  { country: "Russia", url: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg" },
  { country: "Egypt", url: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg" },
  { country: "Yemen", url: "https://upload.wikimedia.org/wikipedia/commons/8/89/Flag_of_Yemen.svg" }
];

// Define basic variables to be used in the game
let currentFlagIndex = 0; // Current flag index being displayed
let score = 0; // Player's score
let timeRemaining = 30; // Time remaining in the game
let timer; // Variable to hold the timer value
let correctAnswers = 0; // Number of correct answers
let incorrectAnswers = 0; // Number of incorrect answers
let startTime; // Game start time

// HTML elements to interact with
const flagContainer = document.getElementById("flag-container");
const optionsContainer = document.getElementById("options-container");
const hintButton = document.getElementById("hint-button");
const hintContainer = document.getElementById("hint-container");
const timerDisplay = document.getElementById("question-time-remaining");
const scoreDisplay = document.getElementById("score");
const removeTwoButton = document.getElementById("remove-two-button");

let hintUsageCount = 2; // Number of available hints

// Function to start the quiz
function startQuiz() {
  currentFlagIndex = 0;
  score = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  scoreDisplay.textContent = score; // Display current score
  removeTwoButton.style.display = "none"; // Hide the "Remove Two Options" button at the start
  resetTimer(); // Reset the timer
  startTime = Date.now(); // Save the current time as the start of the game
  shuffleFlags(); // Shuffle flags randomly
  showFlag(); // Show the first flag
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timer); // Stop any existing timer
  timeRemaining = 25; // Set remaining time to 25 seconds
  timerDisplay.textContent = timeRemaining; // Update the display of remaining time

  timer = setInterval(() => {
    timeRemaining--; // Decrease remaining time by 1 second
    timerDisplay.textContent = timeRemaining; // Update the remaining time display

    if (timeRemaining <= 0) { // If time runs out
      clearInterval(timer); // Stop the timer
      showEndMessage(); // Show the end message
    }
  }, 1000); // Repeat every second
}

// Function to shuffle flags randomly
function shuffleFlags() {
  // Shuffle flags randomly using sort and Math.random
  flags.sort(() => Math.random() - 0.5);
}

// Function to show the current flag with answer options
function showFlag() {
  const flag = flags[currentFlagIndex]; // Get the current flag
  flagContainer.innerHTML = `<img src="${flag.url}" alt="Flag">`; // Display the flag image

  const randomFlags = [];
  while (randomFlags.length < 4) {
    const randomIndex = Math.floor(Math.random() * flags.length); // Select a random flag
    const randomFlag = flags[randomIndex];
    if (!randomFlags.includes(randomFlag)) {
      randomFlags.push(randomFlag); // Add the flag if it hasn't been added already
    }
  }

  const correctOption = flag.country; // The correct answer is the country's name
  if (!randomFlags.some(f => f.country === correctOption)) { // If the correct answer is not in the options
    randomFlags[Math.floor(Math.random() * 4)] = flag; // Replace one of the options with the correct flag
  }

  randomFlags.sort(() => Math.random() - 0.5); // Shuffle options randomly

  optionsContainer.innerHTML = ""; // Clear previous options
  randomFlags.forEach(option => {
    const button = document.createElement("button"); // Create a button for each option
    button.textContent = option.country; // Set the country name as the button text
    button.addEventListener("click", () => handleAnswer(option.country, button)); // Add click event
    optionsContainer.appendChild(button); // Add the button to the container
  });

  hintContainer.textContent = " "; // Clear previous hints
}

// Function to show the end message when the game ends
function showEndMessage() {
  const endTime = Date.now(); // Save the end time
  const timeSpent = Math.floor((endTime - startTime) / 1000); // Calculate time spent in seconds
  const endMessage = `Game Over! Your score is ${score}.<br>Time spent: ${timeSpent} seconds.<br>Correct Answers: ${correctAnswers}<br>Incorrect Answers: ${incorrectAnswers}`;

  const modal = document.getElementById("modal"); // Modal element to show end message
  const modalMessage = document.getElementById("modal-message"); // Element to show message inside modal
  const modalCloseButton = document.getElementById("modal-close-button"); // Close button for modal
  const restartButton = document.createElement("button"); // Restart game button

  modalMessage.innerHTML = endMessage; // Update the message
  modal.style.display = "flex"; // Show the modal

  restartButton.textContent = "Restart Game"; // Button text
  restartButton.style.padding = "10px 20px";
  restartButton.style.backgroundColor = "#007bff";
  restartButton.style.color = "#fff";
  restartButton.style.border = "none";
  restartButton.style.borderRadius = "5px";
  restartButton.style.cursor = "pointer";
  restartButton.addEventListener("click", () => {
    modal.style.display = "none"; // Hide modal when restarting
    startQuiz(); // Restart the game
  });

  modalMessage.appendChild(restartButton); // Add restart button to message

  modalCloseButton.addEventListener("click", () => {
    modal.style.display = "none"; // Hide modal on close
    startQuiz(); // Restart the game on close
  });
}

// Function to activate hints
hintButton.addEventListener("click", () => {
  if (hintUsageCount > 0) {
    const correctAnswer = flags[currentFlagIndex].country; // Get the correct answer
    hintContainer.textContent = `Hint: The first letter of the country is "${correctAnswer.charAt(0)}"`; // Show the hint
    hintUsageCount--; // Decrease available hints
  } else {
    hintContainer.textContent = "You have used all your hints!"; // If all hints are used
  }
});

// Function to handle answer selection
function handleAnswer(selectedOption, button) {
  const allButtons = optionsContainer.querySelectorAll("button"); // Get all buttons
  allButtons.forEach(button => button.disabled = true); // Disable buttons after answering

  const correctAnswer = flags[currentFlagIndex].country; // Correct answer

  if (selectedOption === correctAnswer) { // If the answer is correct
    score++; // Increase score
    correctAnswers++; // Increase correct answers count
    scoreDisplay.textContent = score; // Update score display

    if (score === 10) { // If the player reaches 10 points
      clearInterval(timer); // Stop the timer
      showEndMessage(); // Show end message
      return; // End the function
    }

    setTimeout(() => {
      currentFlagIndex++; // Move to the next flag
      if (currentFlagIndex < flags.length) {
        showFlag(); // Show next flag
      } else {
        clearInterval(timer); // Stop the timer if all flags are finished
        showEndMessage(); // Show end message
      }
    }, 500); // Wait for 500 milliseconds before showing next flag
  } else { // If the answer is incorrect
    incorrectAnswers++; // Increase incorrect answers count
    if (incorrectAnswers >= 3) { // If 3 incorrect answers are reached
      clearInterval(timer); // Stop the timer
      showEndMessage(); // Show end message
    }
    setTimeout(() => {
      currentFlagIndex++; // Move to the next flag
      if (currentFlagIndex < flags.length) {
        showFlag(); // Show next flag
      } else {
        clearInterval(timer); // Stop the timer if all flags are finished
        showEndMessage(); // Show end message
      }
    }, 500); // Wait for 500 milliseconds before showing next flag
  }
}

// Function to remove two random incorrect options
removeTwoButton.addEventListener("click", () => {
  const correctAnswer = flags[currentFlagIndex].country; // Get the correct answer

  const incorrectOptions = flags.filter(option => option.country !== correctAnswer); // Get incorrect options
  const randomIncorrectOption = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)]; // Select a random incorrect option

  const remainingOptions = [
    { country: correctAnswer, url: flags[currentFlagIndex].url },
    randomIncorrectOption
  ];
  remainingOptions.sort(() => Math.random() - 0.5); // Shuffle options

  optionsContainer.innerHTML = ""; // Clear previous options
  remainingOptions.forEach(option => {
    const button = document.createElement("button"); // Create a button for each option
    button.textContent = option.country; // Set the country name as the button text
    button.addEventListener("click", () => handleAnswer(option.country, button)); // Add click event
    optionsContainer.appendChild(button); // Add the button to the container
  });

  removeTwoButton.style.display = "none"; // Hide the "Remove Two Options" button after use
});

// Set up the container for hint buttons
const buttonContainer = document.createElement("div");
buttonContainer.style.display = "flex";
buttonContainer.style.justifyContent = "center";
buttonContainer.style.gap = "10px";

// Insert the buttons into the DOM
hintButton.parentNode.insertBefore(buttonContainer, hintButton);
buttonContainer.appendChild(hintButton);
buttonContainer.appendChild(removeTwoButton);

// Start the game
startQuiz();
