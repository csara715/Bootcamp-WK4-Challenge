var buttonEl = document.querySelector("#start-quiz");
var submitBtn = document.querySelector("#submit-answer");
var inputEl = document.querySelectorAll("input");
var scriptEl = document.querySelector("#new-script");
var highScoreList = document.querySelector("#recent-scores");

var questEl = document.querySelector("#question");
var answer1 = document.querySelector("#answer-one");
var answer2 = document.querySelector("#answer-two");
var answer3 = document.querySelector("#answer-three");
var answer4 = document.querySelector("#answer-four");
var timerEl = document.querySelector("#time-remaining");
var message = document.querySelector("#result-message");

var correctCounter;
var questNum = 0;
var userAnswer;
var index = 0;
var timer;
var timeRemaining;
var testTakers = [];
var testScores = [];
var testScore;
var initial;

var questArr = [
  {
    question: "Commonly used data types DO NOT include ______.",
    ans1: "strings",
    ans2: "booleans",
    ans3: "alerts",
    ans4: "numbers",
    correct: 3,
  },

  {
    question: "Arrays in JavaScript can be used to store ______.",
    ans1: "numbers and strings",
    ans2: "other arrays",
    ans3: "booleans",
    ans4: "all of the above",
    correct: 4,
  },

  {
    question: "Which of the following is used for strict equality?",
    ans1: "===",
    ans2: "==",
    ans3: "!=",
    ans4: "!==",
    correct: 1,
  },

  {
    question:
      "The condition in an if/else statement is enclosed within ______.",
    ans1: "quotes",
    ans2: "curly brackets",
    ans3: "parentheses",
    ans4: "square brackets",
    correct: 3,
  },

  {
    question:
      "String values must be enclosed within ______ when being assigned to variables.",
    ans1: "commas",
    ans2: "curly brackets",
    ans3: "quotes",
    ans4: "parentheses",
    correct: 3,
  },
];

function init() {
  submitBtn.disabled = true;
}

function startQuiz(event) {
  event.preventDefault();
  startTimer();
  generateQuest(questNum);
  questNum++;
  buttonEl.disabled = true;
  message.textContent = "";
  timeRemaining = 30;
  correctCounter = 0;
  testScore = 0;
  initial = "";
}

function startTimer() {
  timer = setInterval(function () {
    timeRemaining--;
    timerEl.textContent = timeRemaining;
    
    if ((timeRemaining === 0) || (index === questArr.length)) {
      clearInterval(timer);
      quizFinish();
    }

  }, 1000);
}

function submitButton() {
  submitBtn.textContent = "Submit Answer";
  submitBtn.disabled = false;
}

function finishButton() {
  score();
  submitBtn.textContent =
    "The quiz is finished and your score is " + testScore + "!";
}

function changeInput() {
  inputEl[0].setAttribute("type", "radio");
  inputEl[1].setAttribute("type", "radio");
  inputEl[2].setAttribute("type", "radio");
  inputEl[3].setAttribute("type", "radio");
}

function generateQuest(x) {
  questEl.textContent = questArr[x].question;
  answer1.textContent = questArr[x].ans1;
  answer2.textContent = questArr[x].ans2;
  answer3.textContent = questArr[x].ans3;
  answer4.textContent = questArr[x].ans4;

  changeInput();
  submitButton();
}

function clearChecked() {
  inputEl[0].checked = false;
  inputEl[1].checked = false;
  inputEl[2].checked = false;
  inputEl[3].checked = false;
}

function clearQuest() {
  questEl.textContent = "";
  answer1.textContent = "";
  answer2.textContent = "";
  answer3.textContent = "";
  answer4.textContent = "";
  message.textContent = "Please click the start quiz button to try again!";
}

function checkAns(index) {
  var userSelected = document.getElementsByName("answer");

  if (index < questArr.length) {
    for (i = 0; i < userSelected.length; i++) {
      if (userSelected[i].checked) {
        var userAnswer = userSelected[i].value;
      }
    }
    if (userAnswer == questArr[index].correct) {
      correctCounter++;
      correctMessage();
    } else {
      incorrectMessage();
      if(timeRemaining > 5) {
      timeRemaining = timeRemaining - 5;
      } else {
        timeRemaining -= timeRemaining;
    }
  }
}
}

function incorrectMessage() {
  message.textContent = "That is incorrect.";
}

function correctMessage() {
  message.textContent = "That is correct!";
}

function score() {
  if (correctCounter > 0) {
  console.log(correctCounter);
  testScore = (correctCounter * 2) + (timeRemaining/5);
  } else {
    testScore = 0;
  }
}

function storeInitial() {
   initial = window.prompt("The quiz is over, please enter your initials to save your score.");
   if (initial === null) {
    initial = window.prompt("Please enter valid initials.")
   } else {
   testTakers.push(initial);
   localStorage.setItem("testTakers", JSON.stringify(testTakers));
   initial = "";
   }
}

function storeScore() {
  testScores.push(testScore);
  localStorage.setItem("testScores", JSON.stringify(testScores));
  testScore = 0;
}

function scoreList() {

   var storedScores = JSON.parse(localStorage.getItem("testScores"));
   var storedInitials = JSON.parse(localStorage.getItem("testTakers"));
   highScoreList.innerHTML = "";
   
   for (j = 0; j < storedScores.length; j++) {
    var highScore = document.createElement("li")
    highScore.setAttribute("style", "display: block; font-weight: bold; text-align: center; margin-top: 1px; margin-bottom: 0")
    highScore.textContent = storedInitials[j].toUpperCase() + ": " + storedScores[j];
    highScoreList.appendChild(highScore);
   }
 }

function quizFinish() {
  buttonEl.disabled = false;
  submitBtn.disabled = true;

  clearQuest();
  inputEl[0].setAttribute("type", "hidden");
  inputEl[1].setAttribute("type", "hidden");
  inputEl[2].setAttribute("type", "hidden");
  inputEl[3].setAttribute("type", "hidden");
  finishButton();
  storeInitial();
  storeScore();
  scoreList();
  questNum = 0;
  index = 0;
}


submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  
  if (index <= questArr.length) {
    checkAns(index);
  }
  if ((timeRemaining > 0) && (questNum < questArr.length)) {
    generateQuest(questNum);
    questNum++;
    }

  index++;  
  clearChecked();
});

init();
buttonEl.addEventListener("click", startQuiz);
