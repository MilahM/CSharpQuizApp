const questions = [
    {
        question: "C# is what kind of programming language?",
        answers: [
            {text: "statically typed", correct: true},
            {text: "loosely typed", correct: false},
            {text: "string typed", correct: false},
            {text: "tightly typed", correct: false},
        ]
    },
    {
        question: "Which naming convention is correct for variables in C#?",
        answers: [
            {text: "CamelCase", correct: false},
            {text: "Camelcase", correct: false},
            {text: "camelCase", correct: true},
            {text: "camelcase", correct: false},
        ]
    },
    {
        question: "Which is the correct way to access a static class member?",
        answers: [
            {text: "ClassName.StaticMember;", correct: true},
            {text: "ClassName:StaticMember;", correct: false},
            {text: "ClassName(StaticMember);", correct: false},
            {text: "ClassName<StaticMember>;", correct: false},
        ]
    },
    {
        question: "Which is true of abstract classes?",
        answers: [
            {text: "They can be instantiated.", correct: false},
            {text: "They may not contain abstract methods and accessors.", correct: false},
            {text: "They must be instantiated.", correct: false},
            {text: "A non-abstract class derived from an abstract class must implement inherited methods and accessors.", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML= "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display ="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display ="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();


