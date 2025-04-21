document.addEventListener('DOMContentLoaded', function() {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = parseInt(urlParams.get('id'));
    
   
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quiz = quizzes.find(q => q.id === quizId);
    
    if (!quiz) {
        alert('Quiz not found!');
        window.location.href = 'index.html';
        return;
    }
    
  
    const quizTitle = document.getElementById('quiz-title');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressBar = document.getElementById('progress-bar');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const quizContent = document.getElementById('quiz-content');
    const resultsContainer = document.getElementById('results-container');
    const scoreElement = document.getElementById('score');
    const restartBtn = document.getElementById('restart-btn');
    
   
    let currentQuestionIndex = 0;
    let userAnswers = Array(quiz.questions.length).fill(null);
    let score = 0;
    
    quizTitle.textContent = quiz.title;
    showQuestion();
    updateProgressBar();
    updateNavigationButtons();
    
    prevBtn.addEventListener('click', goToPreviousQuestion);
    nextBtn.addEventListener('click', goToNextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    
    function showQuestion() {
        const question = quiz.questions[currentQuestionIndex];
        questionText.textContent = question.question;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            if (userAnswers[currentQuestionIndex] === index) {
                optionElement.classList.add('selected');
            }
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionElement);
        });
    }
    
    function selectOption(optionIndex) {
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });
        event.target.classList.add('selected');
        userAnswers[currentQuestionIndex] = optionIndex;
    }
    
    function updateProgressBar() {
        const progress = ((currentQuestionIndex  ) / quiz.questions.length  ) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    function updateNavigationButtons() {
        prevBtn.disabled = currentQuestionIndex === 0;
        
        if (currentQuestionIndex === quiz.questions.length -1) {
            nextBtn.textContent = 'Finish';
        } else {
            nextBtn.textContent = 'Next';
        }
    }
    
    function goToPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
            updateProgressBar();
            updateNavigationButtons();
        }
    }
    
    function goToNextQuestion() {
        if (userAnswers[currentQuestionIndex] === null && currentQuestionIndex !== quiz.questions.length - 1) {
            alert('Please select an answer!');
            return;
        }
        
        if (currentQuestionIndex < quiz.questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
            updateProgressBar();
            updateNavigationButtons();
        } else {
            calculateScore();
            saveQuizResult();
            progressBar.style.width = '100%';
            quizContent.style.display = 'none';
            resultsContainer.style.display = 'block';
        }
    }
    
    function saveQuizResult() {
        const email = localStorage.getItem('currentUserEmail');
        if (!email) return;
        
        const quizResults = JSON.parse(localStorage.getItem('quizResults')) || {};
        const userResults = quizResults[email] || [];
        
        userResults.push({
            quizId: quiz.id,
            quizTitle: quiz.title,
            score: (score / quiz.questions.length) * 100,
            date: new Date().toISOString().split('T')[0]
        });
        
        quizResults[email] = userResults;
        localStorage.setItem('quizResults', JSON.stringify(quizResults));
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === email);
        if (userIndex !== -1) {
            users[userIndex].lastActive = new Date().toISOString().split('T')[0];
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
    function calculateScore() {
        score = 0;
        quiz.questions.forEach((question, index) => {
            if (userAnswers[index] === question.answer) {
                score++;
            }
        });
        saveQuizResult();
        scoreElement.textContent = `You scored ${score} out of ${quiz.questions.length}`;
    }
    
    function restartQuiz() {
        currentQuestionIndex = 0;
        userAnswers = Array(quiz.questions.length).fill(null);
        score = 0;
        
        quizContent.style.display = 'block';
        resultsContainer.style.display = 'none';
        
        showQuestion();
        updateProgressBar();
        updateNavigationButtons();
    }
});