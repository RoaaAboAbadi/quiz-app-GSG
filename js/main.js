import { questions } from "./qustions.js";

const btn = document.getElementById("btn");
const container = document.getElementById("container");
const con = document.getElementById("con");
const theQuestion = document.getElementById("the-question");
let numberOfQuestion = document.getElementById("number-of-question");
const options = document.querySelectorAll(".options > button");
const next = document.getElementById("next");
const scorePage = document.getElementById("score-page");
const contentScore = document.getElementById("content-score");
const categoryButtons = document.querySelectorAll(".category-buttons > button");
// const signUpIcon = document.getElementById("icon");

let selectedCategory = null;
let currentIndex = 0;
let score = 0;
let filteredQuestions = [];
let currentAnswer = null;



window.onload = function () {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "signIn.html"
        console.log("1111111111");
        // signUpIcon.style.display = "block";
    } else {
        // signUpIcon.style.display = "none"; 
        startGame();
        console.log("start playingggg");

    }
};



// signUpIcon.addEventListener("click", () => {
//     window.location.href = "signIn.html"; 
// });


btn.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        // container.style.display = "none";
        // con.style.display = "flex";
        // console.log("5555555555555555");
        window.location.href = "signIn.html";
    } else {
        container.style.display = "none";
        con.style.display = "flex";
        startGame();
    }
});


const startGame = () => {

    categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedCategory = button.getAttribute("data-category");

            filteredQuestions = questions.filter(q => q.category === selectedCategory);

            if (filteredQuestions.length > 0) {
                startQuiz();
            } else {
                alert("No questions available for this category.");
            }
        });
    });
};

const startQuiz = () => {
    currentIndex = 0;
    score = 0;
    displayQuestion();
};


const displayQuestion = () => {
    currentAnswer = null;
    clearOptionsSelection();

    if (currentIndex < filteredQuestions.length) {
        const currentQuestion = filteredQuestions[currentIndex];
        theQuestion.innerHTML = currentQuestion.question;

        options.forEach((option, index) => {
            option.innerHTML = currentQuestion.options[index];
        });

        numberOfQuestion.textContent = currentIndex + 1;
    } else {
        showScorePage();
    }
};

const changeQuestion = () => {
    if (currentAnswer === null) return;

    const currentQuestion = filteredQuestions[currentIndex];
    console.log('currentQuestion=-', currentQuestion)
    if (currentQuestion.answer === currentAnswer) {
        score++;
    }

    currentIndex++;
    displayQuestion();
};

const clearOptionsSelection = () => {
    options.forEach(option => option.classList.remove("colored"));
};


options.forEach(option => {
    option.addEventListener("click", (event) => {
        clearOptionsSelection();
        option.classList.add("colored");
        currentAnswer = event.target.textContent;
    });
});


const showScorePage = () => {
    con.style.display = "none";
    scorePage.style.display = "flex";


    contentScore.innerHTML = "";

    let imgScoreElement = document.createElement("img");
    imgScoreElement.classList.add("imageScore");

    let textScoreElement = document.createElement("div");
    textScoreElement.classList.add("textScore");

    let finalScoreElement = document.createElement("span");
    finalScoreElement.classList.add("finalScore");

    contentScore.append(imgScoreElement, textScoreElement, finalScoreElement);

    localStorage.setItem("score", score);

    if (score >= 6) {
        imgScoreElement.src = "./images/medal.png";
        textScoreElement.textContent = "Congratulations! You have achieved a high score! Your score is";
    } else if (score > 3) {
        imgScoreElement.src = "./images/positive-vote.png";
        textScoreElement.textContent = "Good job! Your score is";
    } else {
        imgScoreElement.src = "./images/sad-face.png";
        textScoreElement.textContent = "Your performance is not good! Your score is";
    }

    finalScoreElement.textContent = score;
};

next.addEventListener("click", () => {
    changeQuestion();
    clearOptionsSelection();
});
