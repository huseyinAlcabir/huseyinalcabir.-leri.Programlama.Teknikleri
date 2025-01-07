// تعريف مصفوفة تحتوي على بيانات الأعلام
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

// تعريف المتغيرات الأساسية التي ستستخدم في اللعبة
let currentFlagIndex = 0; // المؤشر الحالي للعلم الذي يتم عرضه
let score = 0; // عدد النقاط التي حققها اللاعب
let timeRemaining = 30; // الوقت المتبقي للعبة
let timer; // المتغير الذي سيحفظ قيمة المؤقت
let correctAnswers = 0; // عدد الإجابات الصحيحة
let incorrectAnswers = 0; // عدد الإجابات الخاطئة
let startTime; // وقت بدء اللعبة

// العناصر التي سيتم التفاعل معها في الـ HTML
const flagContainer = document.getElementById("flag-container");
const optionsContainer = document.getElementById("options-container");
const hintButton = document.getElementById("hint-button");
const hintContainer = document.getElementById("hint-container");
const timerDisplay = document.getElementById("question-time-remaining");
const scoreDisplay = document.getElementById("score");
const removeTwoButton = document.getElementById("remove-two-button");

let hintUsageCount = 2; // عدد مرات استخدام التلميحات المتاحة

// دالة لبدء اللعبة
function startQuiz() {
  currentFlagIndex = 0;
  score = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  scoreDisplay.textContent = score; // عرض النقاط الحالية
  removeTwoButton.style.display = "none"; // إخفاء زر "إزالة خيارين" في البداية
  resetTimer(); // إعادة تعيين المؤقت
  startTime = Date.now(); // حفظ الوقت الحالي كبداية للعبة
  shuffleFlags(); // خلط الأعلام عشوائيًا
  showFlag(); // عرض العلم الأول
}

// دالة لإعادة تعيين المؤقت
function resetTimer() {
  clearInterval(timer); // إيقاف أي مؤقت موجود
  timeRemaining = 25; // تعيين الوقت المتبقي إلى 25 ثانية
  timerDisplay.textContent = timeRemaining; // تحديث عرض الوقت المتبقي

  timer = setInterval(() => {
    timeRemaining--; // تقليل الوقت المتبقي ثانية تلو الأخرى
    timerDisplay.textContent = timeRemaining; // تحديث عرض الوقت المتبقي

    if (timeRemaining <= 0) { // إذا انتهى الوقت
      clearInterval(timer); // إيقاف المؤقت
      showEndMessage(); // عرض رسالة النهاية
    }
  }, 1000); // تكرار كل ثانية
}

// دالة لخلط الأعلام عشوائيًا
function shuffleFlags() {
  // خلط الأعلام عشوائيًا باستخدام دالة sort و Math.random
  flags.sort(() => Math.random() - 0.5);
}

// دالة لعرض العلم الحالي مع خيارات الإجابة
function showFlag() {
  const flag = flags[currentFlagIndex]; // الحصول على العلم الحالي
  flagContainer.innerHTML = `<img src="${flag.url}" alt="Flag">`; // عرض صورة العلم

  const randomFlags = [];
  while (randomFlags.length < 4) {
    const randomIndex = Math.floor(Math.random() * flags.length); // اختيار عشوائي من الأعلام
    const randomFlag = flags[randomIndex];
    if (!randomFlags.includes(randomFlag)) {
      randomFlags.push(randomFlag); // إضافة العلم إذا لم يكن مضافًا من قبل
    }
  }

  const correctOption = flag.country; // الإجابة الصحيحة هي اسم الدولة
  if (!randomFlags.some(f => f.country === correctOption)) { // إذا لم تتضمن الخيارات الإجابة الصحيحة
    randomFlags[Math.floor(Math.random() * 4)] = flag; // استبدال أحد الخيارات بعلم صحيح
  }

  randomFlags.sort(() => Math.random() - 0.5); // خلط الخيارات عشوائيًا

  optionsContainer.innerHTML = ""; // مسح المحتوى السابق
  randomFlags.forEach(option => {
    const button = document.createElement("button"); // إنشاء زر لكل خيار
    button.textContent = option.country; // تعيين اسم الدولة كـ نص للزر
    button.addEventListener("click", () => handleAnswer(option.country, button)); // إضافة حدث عند الضغط على الزر
    optionsContainer.appendChild(button); // إضافة الزر إلى الحاوية
  });

  hintContainer.textContent = " "; // مسح أي تلميحات سابقة
}

// دالة لعرض رسالة النهاية عند انتهاء اللعبة
function showEndMessage() {
  const endTime = Date.now(); // حفظ وقت النهاية
  const timeSpent = Math.floor((endTime - startTime) / 1000); // حساب الوقت المستغرق بالثواني
  const endMessage = `Game Over! Your score is ${score}.<br>Time spent: ${timeSpent} seconds.<br>Correct Answers: ${correctAnswers}<br>Incorrect Answers: ${incorrectAnswers}`;

  const modal = document.getElementById("modal"); // العنصر الذي يعرض نافذة النهاية
  const modalMessage = document.getElementById("modal-message"); // العنصر الذي يعرض الرسالة داخل النافذة
  const modalCloseButton = document.getElementById("modal-close-button"); // زر إغلاق النافذة
  const restartButton = document.createElement("button"); // زر إعادة بدء اللعبة

  modalMessage.innerHTML = endMessage; // تحديث الرسالة
  modal.style.display = "flex"; // عرض نافذة النهاية

  restartButton.textContent = "Restart Game"; // نص الزر
  restartButton.style.padding = "10px 20px";
  restartButton.style.backgroundColor = "#007bff";
  restartButton.style.color = "#fff";
  restartButton.style.border = "none";
  restartButton.style.borderRadius = "5px";
  restartButton.style.cursor = "pointer";
  restartButton.addEventListener("click", () => {
    modal.style.display = "none"; // إخفاء النافذة عند إعادة البدء
    startQuiz(); // إعادة بدء اللعبة
  });

  modalMessage.appendChild(restartButton); // إضافة زر إعادة البدء إلى الرسالة

  modalCloseButton.addEventListener("click", () => {
    modal.style.display = "none"; // إخفاء النافذة عند الضغط على زر الإغلاق
    startQuiz(); // إعادة بدء اللعبة عند الإغلاق
  });
}

// دالة لتفعيل التلميحات
hintButton.addEventListener("click", () => {
  if (hintUsageCount > 0) {
    const correctAnswer = flags[currentFlagIndex].country; // الحصول على الإجابة الصحيحة
    hintContainer.textContent = `Hint: The first letter of the country is "${correctAnswer.charAt(0)}"`; // عرض التلميح
    hintUsageCount--; // تقليل عدد التلميحات المتاحة
  } else {
    hintContainer.textContent = "You have used all your hints!"; // إذا تم استخدام جميع التلميحات
  }
});

// دالة للتعامل مع الإجابة عند اختيار أحد الخيارات
function handleAnswer(selectedOption, button) {
  const allButtons = optionsContainer.querySelectorAll("button"); // الحصول على جميع الأزرار
  allButtons.forEach(button => button.disabled = true); // تعطيل الأزرار بعد الإجابة

  const correctAnswer = flags[currentFlagIndex].country; // الإجابة الصحيحة

  if (selectedOption === correctAnswer) { // إذا كانت الإجابة صحيحة
    score++; // زيادة النقاط
    correctAnswers++; // زيادة عدد الإجابات الصحيحة
    scoreDisplay.textContent = score; // تحديث النقاط المعروضة

    if (score === 10) { // إذا وصل اللاعب إلى 10 نقاط
      clearInterval(timer); // إيقاف المؤقت
      showEndMessage(); // عرض رسالة النهاية
      return; // إنهاء الدالة
    }

    setTimeout(() => {
      currentFlagIndex++; // الانتقال إلى العلم التالي
      if (currentFlagIndex < flags.length) {
        showFlag(); // عرض العلم التالي
      } else {
        clearInterval(timer); // إيقاف المؤقت عند الانتهاء من الأعلام
        showEndMessage(); // عرض رسالة النهاية
      }
    }, 500); // الانتظار لمدة 500 ميلي ثانية قبل الانتقال للسؤال التالي
  } else { // إذا كانت الإجابة خاطئة
    incorrectAnswers++; // زيادة عدد الإجابات الخاطئة
    if (incorrectAnswers >= 3) { // إذا وصل عدد الإجابات الخاطئة إلى 3
      clearInterval(timer); // إيقاف المؤقت
      showEndMessage(); // عرض رسالة النهاية
    }
    setTimeout(() => {
      currentFlagIndex++; // الانتقال إلى العلم التالي
      if (currentFlagIndex < flags.length) {
        showFlag(); // عرض العلم التالي
      } else {
        clearInterval(timer); // إيقاف المؤقت عند الانتهاء من الأعلام
        showEndMessage(); // عرض رسالة النهاية
      }
    }, 500); // الانتظار لمدة 500 ميلي ثانية قبل الانتقال للسؤال التالي
  }
}

// دالة لإزالة خيارين عشوائيين من الإجابات
removeTwoButton.addEventListener("click", () => {
  const correctAnswer = flags[currentFlagIndex].country; // الحصول على الإجابة الصحيحة

  const incorrectOptions = flags.filter(option => option.country !== correctAnswer); // استخراج الخيارات الخاطئة
  const randomIncorrectOption = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)]; // اختيار خيار خاطئ عشوائيًا

  const remainingOptions = [
    { country: correctAnswer, url: flags[currentFlagIndex].url },
    randomIncorrectOption
  ];
  remainingOptions.sort(() => Math.random() - 0.5); // خلط الخيارات

  optionsContainer.innerHTML = ""; // مسح الخيارات السابقة
  remainingOptions.forEach(option => {
    const button = document.createElement("button"); // إنشاء زر لكل خيار
    button.textContent = option.country; // تعيين اسم الدولة كـ نص للزر
    button.addEventListener("click", () => handleAnswer(option.country, button)); // إضافة حدث عند الضغط على الزر
    optionsContainer.appendChild(button); // إضافة الزر إلى الحاوية
  });

  removeTwoButton.style.display = "none"; // إخفاء زر إزالة خيارين بعد استخدامه
});

// إعداد الحاوية للأزرار الخاصة بالتلميحات
const buttonContainer = document.createElement("div");
buttonContainer.style.display = "flex";
buttonContainer.style.justifyContent = "center";
buttonContainer.style.gap = "10px";

// إدراج الأزرار في الـ DOM
hintButton.parentNode.insertBefore(buttonContainer, hintButton);
buttonContainer.appendChild(hintButton);
buttonContainer.appendChild(removeTwoButton);

// بدء اللعبة
startQuiz();
