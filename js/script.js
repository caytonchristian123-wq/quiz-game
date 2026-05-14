const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const timerSpan = document.getElementById("timer");

const quizQuestions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlinks Text Management Language", correct: false },
            { text: "Hyper Tool Multi Language", correct: false }
        ]
    },

    {
        question: "Which CSS property changes text color?",
        answers: [
            { text: "font-size", correct: false },
            { text: "color", correct: true },
            { text: "background", correct: false },
            { text: "text-style", correct: false }
        ]
    },

    {
        question: "Which symbol is used for ID in CSS?",
        answers: [
            { text: ".", correct: false },
            { text: "#", correct: true },
            { text: "*", correct: false },
            { text: "@", correct: false }
        ]
    },

    {
        question: "Which language makes websites interactive?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "Python", correct: false }
        ]
    },

    {
        question: "Which HTML tag creates a button?",
        answers: [
            { text: "<div>", correct: false },
            { text: "<p>", correct: false },
            { text: "<button>", correct: true },
            { text: "<span>", correct: false }
        ]
    }
];


 let currentQuestionIndex = 0;
 let score = 0;
 let answersDisabled = false;
 let timer;
 let timeLeft = 10;

 totalQuestionsSpan.textContent = quizQuestions.length;
 maxScoreSpan.textContent = quizQuestions.length


 startButton.addEventListener("click", startQuiz)
 restartButton.addEventListener("click", restartQuiz)

 function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()

 }

 function showQuestion() {

    answersDisabled = false

    clearInterval(timer);
    timeLeft = 10;
    timerSpan.textContent = timeLeft;

    timer = setInterval(() => {

        timeLeft--;

        timerSpan.textContent = timeLeft;

        if(timeLeft <= 0) {

            clearInterval(timer);

            currentQuestionIndex++;

            if(currentQuestionIndex < quizQuestions.length) {

                showQuestion();

            } else {

                showResults();

            }

        }

    }, 1000);

    const currentQuestion = quizQuestions[currentQuestionIndex]
    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent =(currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width =progressPercent + "%"

    questionText.textContent =currentQuestion.question

    answerContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")
        
        button.dataset.correct = answer.correct

        button.addEventListener("click", selectAnswer);

        answerContainer.appendChild(button);
    })
 }

 function selectAnswer (event) {
    
    if(answersDisabled) return

    clearInterval(timer);

    answersDisabled = true

    const selectedButton =event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answerContainer.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct")
        } else if (button === selectedButton){ 
            button.classList.add("incorrect");
        }
    });
    if(isCorrect) {
        score++;
        scoreSpan.textContent = score
    }
    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion()
        } else {
            showResults()
        }
    } ,1000) 
 }
 function showResults() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100

        if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
        } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
        } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
        } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
        } else {
        resultMessage.textContent = "Keep studying! You'll get better!";

    }
 }

  function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
 }