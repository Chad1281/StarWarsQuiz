
// var timeEl = document.querySelector("#timer");
// var secondsLeft = 120;
const startButton = document.getElementById("start");
const questionContainerEl = document.getElementById("question-container");
const questionEl = document.getElementById("question");
// const choiceA = document.getElementById("a");
// const choiceB = document.getElementById("b");
// const choiceC = document.getElementById("c");
// const choiceD = document.getElementById("d");
const highScores = document.getElementById("scores");
// const lastQuestion = questions.length -1;
// let startQuestion = 0;

startButton.addEventListener("click", startQuiz); 

function startQuiz() {
    // console.log('started');
    startButton.classList.add("hide");
    // currentQuestionIndex = 0;
    questionContainerEl.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion();
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.choices.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(button, button.dataset.correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } 
    else {
        element.classList.add("wrong");
    }
}

const questions = [
    {
        question: "What year did the first Star Wars movie come out?",
        choices: ["1970", "1976", "1977", "1981"]
        answer: "1977"
    },
    {
        question: "What is the name of the character played by Harrison Ford?",
        choices: ["Obi-Wan Kenobi", "Luke Skywalker", "Darth Vader", "Han Solo"]
        answer: "Han Solo"
    },
    {
        question: "Which actor is the voice of Darth Vader?",
        choices: ["James Earl Jones", "Morgan Freeman", "Sean Connery", "Christopher Lee"]
        answer: "James Earl Jones"
    },
    {
        question: "How did Yoda die?", 
        choices: ["Stabbed by Lightsaber", "Ship Explosion", "Planet Explosion", "Old Age"]
        answer: "Old Age"
    }, 
    {
        question: "How old was Yoda when he died?",
        choices: ["900", "800", "650", "1000"]
        answer: "900"
    },
    {
        question: "Who built C-3PO?",
        choices: ["Luke Skywalker", "Anakin Skywalker", "Obi-Wan Kenobi", "Han Solo"]
        answer: "Anakin Skywalker"
    },
]

choiceA.textContent = choices[0];
choiceB.textContent = choices[1];
choiceC.textContent = choices[2];
choiceD.textContent = choices[3];

// function setTime() {
//     var timerInterval = setInterval(function() {
//       secondsLeft--;
//       timeEl.textContent = "Time left:" + " " + secondsLeft;
  
//     //   if(secondsLeft === 0) {
//     //     clearInterval(timerInterval);
//     //     sendMessage();
//     //   }
  
//     }, 1000);
//   }

// function renderQuestion() {
//     let q = questions[startQuestion];

//     question.innerHTML = "<p>"+ q.question +"</p>";
//     choiceA.innerHTML = q.choiceA;
//     choiceB.innerHTML = q.choiceB;
//     choiceC.innerHTML = q.choiceC;
//     choiceD.innerHTML = q.choiceD;
// }

// function showScores() {

// }



