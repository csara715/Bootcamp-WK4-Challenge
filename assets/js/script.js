var buttonEl = document.querySelector("#start-quiz");
var submitBtn = document.querySelector("#submit-answer");
var inputEl = document.querySelectorAll("input");
var scriptEl = document.querySelector("#new-script");

var questEl = document.querySelector("#question");
var answer1 = document.querySelector("#answer-one");
var answer2 = document.querySelector("#answer-two");
var answer3 = document.querySelector("#answer-three");
var answer4 = document.querySelector("#answer-four");
var timerEl = document.querySelector("#time-remaining");
var message = document.querySelector("#result-message");

var correctCounter = 0;
var questNum = 0;
var userAnswer;
var timer;
var timeRemaining;
var testTaker = [];
var testScore = [];
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
  message.textContent = "";
}

function startQuiz(event) {
  event.preventDefault();
  startTimer();
  generateQuest(questNum);
  questNum++;
  buttonEl.disabled = true;
  correctCounter = 0;
  var index = 0;
}

function startTimer() {
  timeRemaining = 60;
  timer = setInterval(function () {
    timeRemaining--;
    timerEl.textContent = timeRemaining;
    var num = questNum + 1;

    if (timeRemaining === 0 || num === questArr.length) {
      clearInterval(timer);
    }
  }, 1000);
}

function submitButton() {
  submitBtn.textContent = "Submit Answer";
  submitBtn.disabled = false;
}

function finishButton() {
  submitBtn.textContent =
    "The quiz is finished and your score is " + correctCounter + "!";
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

var index = 0;
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
      timeRemaining = timeRemaining - 5;
    }
  }
}

function incorrectMessage() {
  message.textContent = "That is incorrect.";
}

function correctMessage() {
  message.textContent = "That is correct!";
}


// function getInitial() {
//   initial = window.prompt("What are your initials?");
//   localStorage.setItem("testTaker", JSON.stringify(initial));
//   testTaker.push(initial);
//   console.log(initial);
// }

// function getScore() {
//   localStorage.setItem("testScore", correctCounter);
//   console.log(correctCounter);
// }

// function scoreList() {
//   var storedScores = localStorage.getItem("testScore");
//   var storedInitials = JSON.parse(localStorage.getItem("testTaker"));
//   if (storedInitials !== null) {
//     initial = storedInitials;
//   }
//   for (j = 0; j < storedScores.length; j++) {
//   console.log(storedScores[j]);
//   console.log(initial);
//   }
// }

function quizFinish() {
  buttonEl.disabled = false;
  submitBtn.disabled = true;

  clearQuest();
  inputEl[0].setAttribute("type", "hidden");
  inputEl[1].setAttribute("type", "hidden");
  inputEl[2].setAttribute("type", "hidden");
  inputEl[3].setAttribute("type", "hidden");
  finishButton();
  // getInitial();
  // getScore();
  // scoreList();
  questNum = 0;
  index = 0;
}


submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  
  if (index < questArr.length) {
    checkAns(index);
    index++;
  }
  if (timeRemaining > 0) {
    if (questNum < questArr.length){
    generateQuest(questNum);
    questNum++
    } else {
      quizFinish();
    }
  }
  clearChecked();
});

init();
buttonEl.addEventListener("click", startQuiz);
