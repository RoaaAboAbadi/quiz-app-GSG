import { qustions } from "./qustions.js";

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

let selectedCategory = null;
let currentIndex = 0;
let score = 0;
let filteredQuestions = [];
let currentAnswer = null;

btn.addEventListener("click", () => {
    container.style.display = "none";
    con.style.display = "flex";
});

// Handling category selection and starting the quiz with filtered questions
categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedCategory = button.getAttribute("data-category");
        // console.log(selectedCategory, "selectedCategory", button, "button");

        // Filtering questions by the selected category
        filteredQuestions = qustions.filter(q => q.category === selectedCategory);
        console.log(filteredQuestions, "filteredQuestions");

        if (filteredQuestions.length > 0) {
            startQuiz();
        } else {
            alert("No questions available for this category.");
        }
    });
});

// Starting the quiz with the first question
const startQuiz = () => {
    currentIndex = 0;
    score = 0;
    displayQuestion();
};

// Displaying the current question and options
const displayQuestion = () => {
    currentAnswer = null;
    clearOptionsSelection();

    if (currentIndex < filteredQuestions.length) {
        console.log(currentIndex, "currentIndex", filteredQuestions.length, "filteredQuestions.length");
        const currentQuestion = filteredQuestions[currentIndex];
        theQuestion.innerHTML = currentQuestion.qustion;

        options.forEach((option, index) => {
            option.innerHTML = currentQuestion.options[index];
        });

        numberOfQuestion.textContent = currentIndex + 1;
    } else {
        showScorePage();
    }
};

// Checking the answer and moving to the next question
const changeQuestion = () => {
    if (currentAnswer === null) return;

    const currentQuestion = filteredQuestions[currentIndex];
    if (currentQuestion.answer === currentAnswer) {
        score++;
    }

    currentIndex++;
    displayQuestion();
};

// Clearing the option selection
const clearOptionsSelection = () => {
    options.forEach(option => option.classList.remove("colored"));
};

// Click event on the option to select the answer
options.forEach(option => {
    option.addEventListener("click", (event) => {
        clearOptionsSelection();
        option.classList.add("colored");
        currentAnswer = event.target.textContent;
    });
});

// Displaying the final score page
const showScorePage = () => {
    con.style.display = "none";
    scorePage.style.display = "flex";

    // Clearing previous score display content
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

// Moving to the next question when clicking the "next" button
next.addEventListener("click", () => {
    changeQuestion();
    clearOptionsSelection();
});

// Loading the saved score when the page loads
// window.onload = () => {
//     const savedScore = localStorage.getItem("score");
//     console.log(savedScore);
// };
