var unHide = document.createElement("div");
var questCon = document.createElement("div");
var ansCon = document.createElement("div");
var questH2 = document.createElement("h2");
var startBtn = document.getElementById("start");
var hideOnStart = document.querySelector("#hideOnStart");
var container = document.querySelector(".container");

let shuffledQuestions, currentQuestIndex

unHide.setAttribute("class", "hide");
questCon.setAttribute("class", "quizCon");
ansCon.setAttribute("class", "ansConClass");

container.appendChild(unHide);
unHide.appendChild(questCon);
questCon.appendChild(questH2);
questCon.appendChild(ansCon);

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
]

startBtn.addEventListener("click", startQuiz); 

function startQuiz() {
    console.log("started");
    hideOnStart.classList.add("hide");
    unHide.classList.remove("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestIndex = 0
    nextQuest();
}

function nextQuest() {
    resetState();
    showQuest(shuffledQuestions[currentQuestIndex]);
}

function showQuest(question) {
    questH2.innerText = question.question
    console.log(question.choices)
    question.choices.forEach(choice => {
        const button = document.createElement("button");
        button.innerHTML = choice;
        button.classList.add("btn");
        var ansObj = question.answer;
        if (ansObj) {
            button.dataset.correct = ansObj;
        }
        button.addEventListener("click", selectAns);
        button.addEventListener("click", () => {
            currentQuestIndex++;
            nextQuest();
        })
        ansCon.appendChild(button);
        
        
        // function checkAns() {
        //     if (button.innerHTML == question.answer) {
        //         console.log("correct");
        //         nextQuest();
        //     }
        //     else {
        //         console.log("wrong");
        //         nextQuest();
        //     }
        // }
    });
}

function resetState() {
    while (ansCon.firstChild) {
        ansCon.removeChild
        (ansCon.firstChild);
    }
}

function selectAns(e) {
    const selectedBtn = e.target;
    console.log(selectedBtn);
    const correct = selectedBtn.dataset.correct;
    // setStatus(document.body, correct);
    Array.from(questCon.children).forEach(button => {
        setStatus(button, button.dataset.correct)
    })
}

function setStatus(element, correct) {
    // clearStatus(element);
    if (correct) {
        console.log("Correct");
    }
    else {console.log("Wrong")}
}

// for (i = 0; i < questions.length; i++) {
//     // console.log(questions[i]);
//     var questEl = (questions[i].question);
//     var ansBtn0 = (questions[i].choices[0]);
//     var ansBtn1 = (questions[i].choices[1]);
//     var ansBtn2 = (questions[i].choices[2]);
//     var ansBtn3 = (questions[i].choices[3]);
//     questH2.innerHTML = questEl;
//     conBtn0.innerHTML = ansBtn0;
//     conBtn1.innerHTML = ansBtn1;
//     conBtn2.innerHTML = ansBtn2;
//     conBtn3.innerHTML = ansBtn3;
// }
