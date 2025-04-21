document.addEventListener('DOMContentLoaded', function() {
   
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('quizResults')) {
        localStorage.setItem('quizResults', JSON.stringify({}));
    }


    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
        window.location.assign('index.html');
        return;
    }


    const totalUsersEl = document.getElementById('totalUsers');
    const quizzesTakenEl = document.getElementById('quizzesTaken');
    const usersTableBody = document.querySelector('#usersTable tbody');


    const users = JSON.parse(localStorage.getItem('users')) || [];
    const quizResults = JSON.parse(localStorage.getItem('quizResults')) || {};

  
    const totalQuizzesTaken = Object.values(quizResults).reduce((total, userResults) => {
        return total + userResults.length;
    }, 0);


    totalUsersEl.textContent = users.length;
    quizzesTakenEl.textContent = totalQuizzesTaken;

    usersTableBody.innerHTML = '';


    users.forEach(user => {
        const row = usersTableBody.insertRow();
        const userResults = quizResults[user.email] || [];
        
    
        const usernameCell = row.insertCell(0);
        usernameCell.textContent = user.username || user.email.split('@')[0];
        

        const emailCell = row.insertCell(1);
        emailCell.textContent = user.email;
      
        const quizzesCell = row.insertCell(2);
        quizzesCell.textContent = userResults.length;
        
    
        const avgScoreCell = row.insertCell(3);
        if (userResults.length > 0) {
            const total = userResults.reduce((sum, result) => sum + result.score, 0);
            const average = (total / userResults.length).toFixed(1);
            avgScoreCell.innerHTML = `<span class="quiz-score">${average}%</span>`;
        } else {
            avgScoreCell.textContent = 'N/A';
        }
    });
});

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
}