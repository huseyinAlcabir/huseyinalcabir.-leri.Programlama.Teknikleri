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

let currentFlagIndex = 0;
let score = 0;
let timeRemaining = 30;
let timer;
let correctAnswers = 0;
let incorrectAnswers = 0;
let startTime;

const flagContainer = document.getElementById("flag-container");
const optionsContainer = document.getElementById("options-container");
const hintButton = document.getElementById("hint-button");
const hintContainer = document.getElementById("hint-container");
const timerDisplay = document.getElementById("question-time-remaining");
const scoreDisplay = document.getElementById("score");
const removeTwoButton = document.getElementById("remove-two-button");

let hintUsageCount = 2;

function startQuiz() {
  currentFlagIndex = 0;
  score = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  scoreDisplay.textContent = score;
  removeTwoButton.style.display = "none"; // Hide the remove-two button initially
  resetTimer();
  startTime = Date.now();
  showFlag();
}

function resetTimer() {
  clearInterval(timer);
  timeRemaining = 25;
  timerDisplay.textContent = timeRemaining;

  timer = setInterval(() => {
    timeRemaining--;
    timerDisplay.textContent = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timer);
      showEndMessage(); // نهاية اللعبة عند انتهاء الوقت
    }
  }, 1000);
}

function showFlag() {
  const flag = flags[currentFlagIndex];
  flagContainer.innerHTML = `<img src="${flag.url}" alt="Flag">`;

  const randomFlags = [];
  while (randomFlags.length < 4) {
    const randomIndex = Math.floor(Math.random() * flags.length);
    const randomFlag = flags[randomIndex];
    if (!randomFlags.includes(randomFlag)) {
      randomFlags.push(randomFlag);
    }
  }

  const correctOption = flag.country;
  if (!randomFlags.some(f => f.country === correctOption)) {
    randomFlags[Math.floor(Math.random() * 4)] = flag;
  }

  randomFlags.sort(() => Math.random() - 0.5);

  optionsContainer.innerHTML = "";
  randomFlags.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option.country;
    button.addEventListener("click", () => handleAnswer(option.country, button));
    optionsContainer.appendChild(button);
  });

  hintContainer.textContent = " ";
}

function showEndMessage() {
  const endTime = Date.now();
  const timeSpent = Math.floor((endTime - startTime) / 1000); // حساب الوقت المستغرق بالثواني
  const endMessage = `Game Over! Your score is ${score}.<br>Time spent: ${timeSpent} seconds.<br>Correct Answers: ${correctAnswers}<br>Incorrect Answers: ${incorrectAnswers}`;
  
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const modalCloseButton = document.getElementById("modal-close-button");
  const restartButton = document.createElement("button");

  // إعداد رسالة النهاية
  modalMessage.innerHTML = endMessage;
  modal.style.display = "flex"; // عرض الـ modal

  // إضافة زر إعادة بدء اللعبة
  restartButton.textContent = "Restart Game";
  restartButton.style.padding = "10px 20px";
  restartButton.style.backgroundColor = "#007bff";
  restartButton.style.color = "#fff";
  restartButton.style.border = "none";
  restartButton.style.borderRadius = "5px";
  restartButton.style.cursor = "pointer";
  restartButton.addEventListener("click", () => {
    modal.style.display = "none"; // إخفاء الـ modal
    startQuiz(); // إعادة تشغيل اللعبة
  });

  modalMessage.appendChild(restartButton);

  modalCloseButton.addEventListener("click", () => {
    modal.style.display = "none"; // إخفاء الـ modal عند الضغط على زر الإغلاق
    startQuiz(); // إعادة تشغيل اللعبة عند الإغلاق
  });
}

hintButton.addEventListener("click", () => {
  if (hintUsageCount > 0) {
    const correctAnswer = flags[currentFlagIndex].country;
    hintContainer.textContent = `Hint: The first letter of the country is "${correctAnswer.charAt(0)}"`;

    hintUsageCount--;
  } else {
    hintContainer.textContent = "You have used all your hints!";
  }
});

function handleAnswer(selectedOption, button) {
  // Disable all buttons after answering
  const allButtons = optionsContainer.querySelectorAll("button");
  allButtons.forEach(button => button.disabled = true);

  const correctAnswer = flags[currentFlagIndex].country;

  if (selectedOption === correctAnswer) {
    score++;
    correctAnswers++;
    scoreDisplay.textContent = score;

    if (score === 10) {
      clearInterval(timer);
      showEndMessage(); // تنتهي اللعبة إذا وصل اللاعب إلى 10 نقاط
      return; // خروج من الدالة بعد إنهاء اللعبة
    }
    if (correctAnswers === 3) {
      removeTwoButton.style.display = "block";
      hintContainer.textContent = "Congratulations! You can now use the hint button!";
      
      // اجعل الرسالة تظهر لمدة 3 ثوانٍ فقط
      setTimeout(() => {
        if (hintContainer.textContent === "Congratulations! You can now use the hint button!") {
          hintContainer.textContent = "6564545"; // إخفاء الرسالة بعد 3 ثوانٍ
        }
      }, 1000000000);
    }

     
    

    setTimeout(() => {
      currentFlagIndex++;
      if (currentFlagIndex < flags.length) {
        showFlag();
      } else {
        clearInterval(timer);
        showEndMessage(); // عرض النتيجة والوقت عند نهاية اللعبة
      }
    }, 500); // Wait for 1 second before showing the next question
  } else {
    incorrectAnswers++;
    if (incorrectAnswers >= 3) {
      clearInterval(timer);
      showEndMessage(); // عرض النتيجة والوقت عند نهاية اللعبة
    }
    setTimeout(() => {
      currentFlagIndex++;
      if (currentFlagIndex < flags.length) {
        showFlag();
      } else {
        clearInterval(timer);
        showEndMessage();
        // عرض النتيجة والوقت عند نهاية اللعبة
      }
    }, 500); // Wait for 1 second before showing the next question
  }
}

removeTwoButton.addEventListener("click", () => {
  const correctAnswer = flags[currentFlagIndex].country;

  const incorrectOptions = flags.filter(option => option.country !== correctAnswer);
  const randomIncorrectOption = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];

  const remainingOptions = [
    { country: correctAnswer, url: flags[currentFlagIndex].url },
    randomIncorrectOption
  ];
  remainingOptions.sort(() => Math.random() - 0.5);

  optionsContainer.innerHTML = "";
  remainingOptions.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option.country;
    button.addEventListener("click", () => handleAnswer(option.country, button));
    optionsContainer.appendChild(button);
  });

  removeTwoButton.style.display = "none";
});

const buttonContainer = document.createElement("div");
buttonContainer.style.display = "flex";
buttonContainer.style.justifyContent = "center";
buttonContainer.style.gap = "10px";

hintButton.parentNode.insertBefore(buttonContainer, hintButton);
buttonContainer.appendChild(hintButton);
buttonContainer.appendChild(removeTwoButton);

startQuiz();
