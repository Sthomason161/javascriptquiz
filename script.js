const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let available = [];

let questions = [
    {
        question: 'What is the biggest mountain in the USA?',
        choice1: "Denali",
        choice2: "Mount Whitney",
        choice3: 'Mount Rainier',
        choice4: 'Twin Peaks',
        answer: 1
    },
    {
        question: 'What is the largest planet in our Solar System?',
        choice1: 'Pluto',
        choice2: 'Saturn',
        choice3: 'Earth',
        choice4: 'Jupiter',
        answer: 4
    },
    {
        question: 'How many spaces are on a standard Monopoly board?',
        choice1: '90',
        choice2: '50',
        choice3: '40',
        choice4: '75',
        answer: 3
    },
    {
        question: 'What temperature is the same in Celsius and Fahrenheit?',
        choice1: '+40 degrees',
        choice2: '0 degrees',
        choice3: '-40 degrees',
        choice4: '+100 degrees',
        answer: 3
    },
    {
        question: 'How many blue stripes does the United States of America national flag have?',
        choice1: '7',
        choice2: '13',
        choice3: '0',
        choice4: '6',
        answer: 3
    },
]
const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQustions();
}


getNewQustions = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("end.html")
    }

    questionCounter++;

    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQustions();
        }, 1000);




    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();