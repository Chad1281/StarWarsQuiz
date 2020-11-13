// select timer element
var timeEl = document.querySelector("#timer");
var secondsLeft = 60;

// create elements for questions container
var unHideQc = document.createElement("div");
var questCon = document.createElement("div");
var ansCon = document.createElement("div");
var nameFoCon = document.createElement("div");
var questH2 = document.createElement("h2");
var startBtn = document.getElementById("start");
var hideOnStart = document.querySelector("#hideOnStart");
var container = document.querySelector(".container");

// create elements for form container
var unHideFo = document.createElement("div");
var formCon = document.createElement("div");
var formH2 = document.createElement("h2");
var form = document.createElement("form");
var formLabel = document.createElement("label");
var formInput = document.createElement("input");
var formBtn = document.createElement("input");
var formBr = document.createElement("br");

// create variables to shuffle and select questions from question bank
let shuffledQuestions, currentQuestIndex

// create elements for scoreboard
var unHideSB = document.createElement("div");
var scoreCon = document.createElement("div");
var scoreH2 = document.createElement("h2");
var scoreBtn = document.createElement("button");
var scoreOl = document.createElement("ol");
var scoreboard = document.getElementById("scoreboard");

// set classes for question elements
unHideQc.setAttribute("class", "hide");
questCon.setAttribute("class", "quizCon");
ansCon.setAttribute("class", "ansConClass");

// set attributes for form elements
unHideFo.setAttribute("class", "hide");
nameFoCon.setAttribute("class", "quizCon");
formCon.setAttribute("class", "quizCon");
form.setAttribute("id", "nameForm");
formInput.setAttribute("type", "text");
formInput.setAttribute("id", "nameInput");
formBtn.setAttribute("type", "submit");
formBtn.setAttribute("value", "Submit Name");
formBtn.setAttribute("class", "btn");

// set classes for scoreboard elements
unHideSB.setAttribute("class", "hide");
unHideSB.setAttribute("id", "scores");
scoreCon.setAttribute("class", "quizCon");
scoreBtn.setAttribute("class", "btn");

// place question elements
container.appendChild(unHideQc);
unHideQc.appendChild(questCon);
questCon.appendChild(questH2);
questCon.appendChild(ansCon);

// place form elements
container.appendChild(unHideFo);
unHideFo.appendChild(nameFoCon);
nameFoCon.appendChild(formCon);
formCon.appendChild(formH2);
formCon.appendChild(form);
form.appendChild(formLabel);
form.appendChild(formInput);
form.appendChild(formBr);
form.appendChild(formBtn);

// place question elements
container.appendChild(unHideSB);
unHideSB.appendChild(scoreCon);
scoreCon.appendChild(scoreBtn);
scoreCon.appendChild(scoreH2);
scoreCon.appendChild(scoreOl);

// text for form label
formLabel.textContent = "Enter you name for scoreboard:";

// text for scoreboard
scoreH2.textContent = "High Scores";
scoreBtn.textContent = "Play Again";

// question index with choice index and correct answers
const questions = [
    {
        question: "What year did the first Star Wars movie come out?",
        choices: ["1970", "1976", "1977", "1981"],
        answer: "1977"
    },
    {
        question: "What is the name of the character played by Harrison Ford?",
        choices: ["Obi-Wan Kenobi", "Luke Skywalker", "Darth Vader", "Han Solo"],
        answer: "Han Solo"
    },
    {
        question: "Which actor is the voice of Darth Vader?",
        choices: ["James Earl Jones", "Morgan Freeman", "Sean Connery", "Christopher Lee"],
        answer: "James Earl Jones"
    },
    {
        question: "How did Yoda die?", 
        choices: ["Stabbed by Lightsaber", "Ship Explosion", "Planet Explosion", "Old Age"],
        answer: "Old Age"
    }, 
    {
        question: "How old was Yoda when he died?",
        choices: ["900", "800", "650", "1000"],
        answer: "900"
    },
    {
        question: "Who built C-3PO?",
        choices: ["Luke Skywalker", "Anakin Skywalker", "Obi-Wan Kenobi", "Han Solo"],
        answer: "Anakin Skywalker"
    },
    {
        question: "What is the name of the character played by Mark Hamill?",
        choices: ["Anakin Skywalker", "Luke Skywalker", "Darth Vader", "Han Solo"],
        answer: "Luke Skywalker"
    },
    {
        question: "Which are the only 2 characters to be in every Star Wars movie?",
        choices: ["Obi-Wan Kenobi, Darth Vader", "Luke Skywalker, Princess Leia", "R2D2, C3PO", "Han Solo, Chewbacca"],
        answer: "R2D2, C3PO"
    },
]

// start quiz on click
startBtn.addEventListener("click", startQuiz); 

// hides instructions and unhides question elements then gets questions ready and starts timer
function startQuiz() {
    console.log("started");
    hideOnStart.classList.add("hide");
    unHideSB.classList.add("hide");
    unHideQc.classList.remove("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestIndex = 0
    setTime();
    nextQuest();
}

// displays time left and ends game when time runs out, sets score
function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = "Time left: " + secondsLeft;
  
      if(secondsLeft <= 0) {
        formH2.textContent = "Your score is " + secondsLeft; 
        clearInterval(timerInterval); 
        endGame(); 
        sendMessage();
        resetTimer();
      }
      if (shuffledQuestions.length <= currentQuestIndex + 1) {
        clearInterval(timerInterval); 
        endGame(); 
        sendMessage();
        resetTimer();
    }
    }, 1000);
}

function sendMessage() {
    console.log("times up");
  }

// runs resetState & showQuest functions  
function nextQuest() {
    resetState();
    showQuest(shuffledQuestions[currentQuestIndex]);
}

// inserts question and choices into question container, checks user answer and moves to next question
function showQuest(question) {
    questH2.innerText = question.question;
    console.log(question.choices);
    question.choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerHTML = choice;
        button.classList.add("btn");
        button.setAttribute("data-name", choice);
        button.setAttribute("data-correct", question.answer);
        button.addEventListener("click", selectAns);
        button.addEventListener("click", () => {
            currentQuestIndex++;
            nextQuest();
        })
        ansCon.appendChild(button);
    });
}

// removes last question and choices from question elements
function resetState() {
    while (ansCon.firstChild) {
        ansCon.removeChild
        (ansCon.firstChild);
    }
}

// compares user to the correct answer and adds or removes time from the timer, ends game when after last question
function selectAns(e) {
    const selectedBtn = e.target;
    console.log(selectedBtn);
    var corAns = selectedBtn.dataset.correct;
    console.log(corAns);
    var userSel = selectedBtn.dataset.name;
    console.log(userSel);
    if (userSel == corAns) {
        console.log("correct");
        secondsLeft += 20;
    }
    else {
        console.log("wrong");
        secondsLeft -= 20;
    }
}

// hides question elements and unhides form elements
function endGame() {
    unHideQc.classList.add("hide");
    unHideFo.classList.remove("hide");
}

// brings up scoreboard on click
formBtn.addEventListener("click", submitScore);
scoreboard.addEventListener("click", showScores);

// saves score to scoreboard
function submitScore() {
    var names = document.querySelector("#nameInput").value;
    var scores = secondsLeft;
    unHideFo.classList.add("hide");
    localStorage.setItem("names", names);
    localStorage.setItem("scores", scores);
    showScores();
}

// shows the scoreboard
function showScores() {
    console.log("show scores");
    hideOnStart.classList.add("hide");
    unHideSB.classList.remove("hide");
    var highScore = localStorage.getItem("names") + localStorage.getItem("scores");
    const li = document.createElement("li");
    li.innerHTML = highScore;
    scoreOl.appendChild(li);
}

// starts game over
scoreBtn.addEventListener("click", playAgain);

// returns to the start quiz screen
function playAgain() {
    unHideSB.classList.add("hide");
    hideOnStart.classList.remove("hide");
    // resetTimer();
}

// resets timer for new game
function resetTimer() {
    secondsLeft = 60;
    timeEl.textContent = "Time Left: " + secondsLeft;
}