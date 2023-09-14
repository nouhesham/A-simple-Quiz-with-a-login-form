"strict";
var column = document.querySelector(".column-1");
var rowlayout = document.querySelector(".row");
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    timeLimit: 20,
    id: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correctAnswer: "Mars",
    timeLimit: 15,
    id: 2,
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
      "Mark Twain",
    ],
    correctAnswer: "William Shakespeare",
    timeLimit: 25,
    id: 3,
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Kangaroo"],
    correctAnswer: "Blue Whale",
    timeLimit: 30,
    id: 4,
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
    timeLimit: 18,
    id: 5,
  },
];
start();

var currentquestionindex;
var index;
var score;

function start() {
  currentquestionindex = 0;
  score = 0;
  showquestion();
}
//variables declaration
var form;
var divforquestion;
var pquestion;
var divinput;
var radio;
var radiotext;
var submit;
var timing;
var divforwholelayotu;
var radiogroup;
var radioCheck;
var divforresults;
var scorep;
var timer;

function showquestion() {
  divforquestion = document.createElement("div");
  divforwholelayotu = document.createElement("div");
  pquestion = document.createElement("p");
  var buttondiv = document.createElement("div");
  var divfortime = document.createElement("div");
  var questionnum = document.createElement("p");
  var displaytime = document.createElement("span");
  submit = document.createElement("button");
  form = document.createElement("form");
  submit.innerHTML = "Submit";

  submit.addEventListener("click", submitfun);
  let currentquestion = quizData[currentquestionindex].question;

  timing = quizData[currentquestionindex].timeLimit;

  let questionno = quizData[currentquestionindex].id;
  pquestion.innerHTML = currentquestion;

  questionnum.innerHTML =
    "<small>Question number</small> " +
    questionno +
    " <small>out of 5 </small>";

  column.append(divforwholelayotu);
  divforwholelayotu.append(divfortime);
  divforwholelayotu.append(divforquestion);
  divforwholelayotu.append(buttondiv);
  divforquestion.append(pquestion);
  divfortime.append(questionnum);
  divfortime.append(displaytime);
  buttondiv.append(submit);

  //styling
  divfortime.classList.add("flexrow2");
  form.classList.add("flex");
  pquestion.classList.add("style");
  submit.classList.add("btn");
  //radiobuttons
  quizData[currentquestionindex].options.forEach((element) => {
    radio = document.createElement("input");
    radiotext = document.createElement("label");
    divinput = document.createElement("div");
    //adding a class to the radio labels
    radio.classList.add("radiolabels");

    radio.id = element;
    radio.name = "radiobutton";
    radiotext.for = radio.id;
    radio.type = "radio";
    radiotext.innerHTML = element;
    //appending the elements
    divforquestion.append(form);
    divinput.append(radio);
    divinput.append(radiotext);
    form.append(divinput);

    radiogroup = document.querySelectorAll(".radiolabels");
  });

  form.classList.add("flex");
  divinput.classList.add("flexrow");
  divinput.classList.add("padding");
  buttondiv.classList.add("button");
  startTimer(timing, displaytime);
}
var timetaken;
var interval;
var sumoftime = 0;
//start timer
function startTimer(duration, display) {
  interval = setInterval(function () {
    --duration;
    if (duration <= 0 && currentquestionindex < 5) {
      submitfun();
    }
    duration = duration < 10 ? "0" + duration : duration;
    display.textContent = "00 : " + duration;
    timetaken = quizData[currentquestionindex].timeLimit - duration;
  }, 1000);

  sumoftime += timetaken;
}

//submit function
function submitfun() {
  radiogroup.forEach((rad) => {
    if (rad.checked) {
      if (quizData[currentquestionindex].correctAnswer == rad.id) {
        score++;
      }
    }
  });

  nextquestion();
}
//next question function
function nextquestion() {
  if (currentquestionindex === 4) {
    result();
  } else {
    clearInterval(interval);
    currentquestionindex++;
    divforwholelayotu.innerHTML = null;
    showquestion();
  }
}
var retry;
function result() {
  clearInterval(interval);
  column.innerHTML = null;
  divforresults = document.createElement("div");
  divscore = document.createElement("div");
  scorep = document.createElement("p");
  timer = document.createElement("p");

  scorep.innerHTML =
    "<b>Score</b> : " + score + " <br> you answered " + score + " out of 5 ";
  if (sumoftime > 60) {
    sumoftime = "1 minute" + (sumoftime - 60);
  }
  timer.innerHTML = "<b>Time</b>: " + sumoftime + " seconds";
  //styling row
  rowlayout.classList.add("rowscore");
  timer.classList.add("scorep");
  scorep.classList.add("scorep");
  divforresults.classList.add("flexrowcongrats");
  divscore.classList.add("flex");

  //appending the divs
  divscore.append(scorep);
  divscore.append(timer);
  divforresults.append(divscore);
  rowlayout.append(divforresults);
  rowlayout.append(retake);
}
