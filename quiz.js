document.addEventListener('DOMContentLoaded', function() {
    // Set welcome message with username if available
    const welcomeMessage = document.getElementById('welcomeMessage');
    const username = localStorage.getItem('username');
    if (username) {
        welcomeMessage.textContent = `Welcome, ${username}!`;
    } else {
        welcomeMessage.textContent = 'Welcome!';
    }

    // Display quizzes from localStorage
    displayQuizzes();

    function displayQuizzes() {
        const quizList = document.getElementById('quizList');
        quizList.innerHTML = ''; 

const quizzes = [
    {
      id: 1,
      title: "General Knowledge",
      questions: [
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          answer: 2
        },
        {
          question: "How many continents are there?",
          options: ["5", "6", "7", "8"],
          answer: 2
        },
        {
          question: "What is H2O?",
          options: ["Oxygen", "Water", "Hydrogen", "Salt"],
          answer: 1
        },
        {
          question: "Which animal is known as the King of the Jungle?",
          options: ["Tiger", "Elephant", "Lion", "Leopard"],
          answer: 2
        }
      ]
    },
    {
      id: 2,
      title: "History",
      questions: [
        {
          question: "Who was the first President of the United States?",
          options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
          answer: 1
        },
        {
          question: "In which year did World War II end?",
          options: ["1940", "1943", "1945", "1950"],
          answer: 2
        },
        {
          question: "Which ancient civilization built the pyramids?",
          options: ["Romans", "Greeks", "Egyptians", "Babylonians"],
          answer: 2
        },
        {
          question: "What wall divided East and West Berlin?",
          options: ["The Iron Wall", "The Cold Wall", "The Great Wall", "The Berlin Wall"],
          answer: 3
        }
      ]
    },
    {
      id: 3,
      title: "Science Fun",
      questions: [
        {
          question: "What planet is known as the Red Planet?",
          options: ["Earth", "Mars", "Jupiter", "Saturn"],
          answer: 1
        },
        {
          question: "Which organ pumps blood in the human body?",
          options: ["Liver", "Brain", "Heart", "Lungs"],
          answer: 2
        },
        {
          question: "Which gas do plants use to make food?",
          options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
          answer: 2
        },
        {
          question: "What do bees make?",
          options: ["Butter", "Milk", "Honey", "Juice"],
          answer: 2
        }
      ]
    },
    {
      id: 4,
      title: "Computer Basics",
      questions: [
        {
          question: "What does CPU stand for?",
          options: ["Central Process Unit", "Central Processing Unit", "Computer Power Unit", "Control Process Unit"],
          answer: 1
        },
        {
          question: "What does HTML stand for?",
          options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Machine Language"],
          answer: 0
        },
        {
          question: "Which of these is an output device?",
          options: ["Mouse", "Keyboard", "Monitor", "Scanner"],
          answer: 2
        },
        {
          question: "Which one is a programming language?",
          options: ["Google", "Python", "Chrome", "Excel"],
          answer: 1
        }
      ]
    }
  ];
  
  // Save updated quizzes to localStorage
  localStorage.setItem("quizzes", JSON.stringify(quizzes));
  
  quizzes.forEach((quiz, index) => {
    const quizCard = document.createElement('div');
    quizCard.className = 'quiz-card';
    quizCard.style.animationDelay = `${index * 0.1}s`;
    quizCard.innerHTML = `
        <div class="icon-container">📝</div>
        <h3>${quiz.title}</h3>
        <p>${quiz.description}</p>
        <a href="quiz.html?id=${quiz.id}" class="btn">Start Quiz</a>
    `;
    quizList.appendChild(quizCard);
});
}
});