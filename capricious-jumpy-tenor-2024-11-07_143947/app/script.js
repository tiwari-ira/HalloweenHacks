const questions = [
    {
        question: "What vegetable was traditionally used to carve Jack-o'-lanterns before pumpkins?",
        answers: [
            { text: "Potatoes", correct: false },
            { text: "Turnips", correct: true },
            { text: "Carrots", correct: false },
            { text: "Radishes", correct: false },
            { text: "Beets", correct: false },
        ]
    },

    {
        question: "In which country did Halloween originate?",
        answers: [
            { text: "Germany", correct: false },
            { text: "United States", correct: false },
            { text: "Ireland", correct: true },
            { text: "Mexico", correct: false },
            { text: "France", correct: false },
        ]
    },

    {
        question: "What item is considered good luck on Halloween?",
        answers: [
            { text: "Spider", correct: true },
            { text: "Black cat", correct: false },
            { text: "Full moon", correct: false },
            { text: "Pumpkin", correct: false },
            { text: "Bat", correct: false },
        ]
    },

    {
        question: "What is the name of Dracula’s sidekick?",
        answers: [
            { text: "Renfield", correct: true },
            { text: "Igor", correct: false },
            { text: "Boris", correct: false },
            { text: "Vlad", correct: false },
            { text: "Wolfgang", correct: false },
        ]
    },

    {
        question: "Which famous magician died on Halloween?",
        answers: [
            { text: "Harry Houdini", correct: true },
            { text: "David Copperfield", correct: false },
            { text: "Chris Angel", correct: false },
            { text: "David Blaine", correct: false },
            { text: "Penn Jillette", correct: false },
        ]
    },

    {
        question: "What phobia means you have an intense fear of Halloween?",
        answers: [
            { text: "Nyctophobia", correct: false },
            { text: "Samhainophobia", correct: true },
            { text: "Phasmophobia", correct: false },
            { text: "Spectrophobia", correct: false },
            { text: "Hexakosioihexekontahexaphobia", correct: false },
        ]
    },

    {
        question: "What popular candy was originally called 'Chicken Feed'?",
        answers: [
            { text: "Candy Corn", correct: true },
            { text: "M&Ms", correct: false },
            { text: "Milky Way", correct: false },
            { text: "Skittles", correct: false },
            { text: "Twizzlers", correct: false },
        ]
    },

    {
        question: "Which monster is associated with the full moon?",
        answers: [
            { text: "Vampire", correct: false },
            { text: "Frankenstein's Monster", correct: false },
            { text: "Werewolf", correct: true },
            { text: "Zombie", correct: false },
            { text: "Mummy", correct: false },
        ]
    },

    {
        question: "What is another name for Halloween?",
        answers: [
            { text: "The Witching Day", correct: false },
            { text: "All Hallows' Eve", correct: true },
            { text: "Spooky Fest", correct: false },
            { text: "Haunt Night", correct: false },
            { text: "Pumpkin Day", correct: false },
        ]
    },

    {
        question: "What do people 'bob' for at Halloween parties?",
        answers: [
            { text: "Pumpkins", correct: false },
            { text: "Oranges", correct: false },
            { text: "Apples", correct: true },
            { text: "Carrots", correct: false },
            { text: "Candy", correct: false },
        ]
    },
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQeustionIndex = 0;
let score = 0;

function startQuiz(){
    currentQeustionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQeustion = questions[currentQeustionIndex];
    let questionNo = currentQeustionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQeustion.question;

    currentQeustion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQeustionIndex++;
    if(currentQeustionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQeustionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();