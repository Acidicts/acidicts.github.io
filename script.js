function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
}

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
}

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

var QuizUI = {
    displayNext: function () {
        if (quiz.hasEnded()) {
            this.displayScore();
        }
        else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function() {
        this.populatedIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function(){
        var choices = quiz.getCurrentQuestion().choices;

        for (var i = 0; i < choices.length; i++) {
            this.populatedIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess"  + i, choices[i]);
        }
    },
    displayScore: function() {
        var gameOverHTML = "<h1>GameOver</h1>"
        gameOverHTML += "<h2> Your score is: " + quiz.score + " / 5 </h2>";
        this.populatedIdWithHTML("quiz", gameOverHTML);
    },
    populatedIdWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    },
    displayProgress: function() {
        var currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populatedIdWithHTML("progress", "Question " + currentQuestionNumber + " of " + quiz.questions.length);
    }
};

var questions = [
    new Question("Which planet has most moons ?", ["Jupiter", "Saturn", "Uranus", "Mars"], "Saturn"),
    new Question("What country has won the most world cups ?", ["Brazil", "Germany", "Argentina", "Italy"], "Brazil"),
    new Question("How many bones are in a human ear ?", ["8", "14", "5", "3"], "3"),
    new Question("Which Netfilx show had the most streaming views in 2021 ?", ["The Witcher", "Arcane:League of Legends", "Squid Game", "Midnight Mass"], "Squid Game"),
    new Question("What is the forth letter in Greek ?", ["Zeta", "Delta", "Alpha", "Epsilon"], "Delta")
];

var quiz = new Quiz(questions)

QuizUI.displayNext();
