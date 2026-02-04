// Quiz Data with more questions
const quizData = [
  // ===== SU’AALO DIINI =====
  {
    question: "Waa kuma Nebiga ugu dambeeyay ee Ilaahay soo diray?",
    a: "Nabi Muuse (CS)",
    b: "Nabi Ciise (CS)",
    c: "Nabi Muxammad (NNKH)",
    d: "Nabi Ibraahim (CS)",
    correct: "c",
    explanation: "Nabi Muxammad (NNKH) waa Nebiga ugu dambeeyay ee Ilaahay soo diray."
  },
  {
    question: "Imisa tiir ayuu Islaamku leeyahay?",
    a: "3",
    b: "4",
    c: "5",
    d: "6",
    correct: "c",
    explanation: "Islaamku wuxuu leeyahay 5 tiir."
  },
  {
    question: "Qur’aanka kariimka ah luqaddee ayuu ku soo degay?",
    a: "Af-Carabi",
    b: "Af-Cibraani",
    c: "Af-Faarisi",
    d: "Af-Soomaali",
    correct: "a",
    explanation: "Qur’aanka kariimka ah wuxuu ku soo degay af-Carabi."
  },

  // ===== SU’AALO MAADI =====
  {
    question: "Meeraha ugu dhow Qorraxda waa kee?",
    a: "Dhulka",
    b: "Mars",
    c: "Mercury",
    d: "Venus",
    correct: "c",
    explanation: "Mercury waa meeraha ugu dhow Qorraxda."
  },
  {
    question: "Qaaradda Afrika waddanka ugu ballaaran waa kee?",
    a: "Masar",
    b: "Algeria",
    c: "Soomaaliya",
    d: "Nigeria",
    correct: "b",
    explanation: "Algeria waa waddanka ugu ballaaran qaaradda Afrika."
  },
  {
    question: "Midabkee ayaa ka dhasha marka la isku daro buluug iyo jaalle?",
    a: "Casaan",
    b: "Cagaar",
    c: "Madow",
    d: "Caddaan",
    correct: "b",
    explanation: "Buluug iyo jaalle marka la isku daro waxay noqdaan cagaar."
  }
];


// Global variables
let currentQuestion = 0;
let score = 0;
let timer = 600; // 10 minutes in seconds
let timerInterval;
let userAnswers = [];
let selectedOption = null;

// DOM Elements
const questionEl = document.getElementById('question');
const aText = document.getElementById('a_text');
const bText = document.getElementById('b_text');
const cText = document.getElementById('c_text');
const dText = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const options = document.querySelectorAll('input[name="answer"]');
const errorEl = document.getElementById('error');
const quizContainer = document.getElementById('quiz');

// Initialize quiz
function initQuiz() {
  if (!quizContainer) return;
  
  loadQuestion();
  startTimer();
  
  // Add event listeners for options
  options.forEach(option => {
    option.addEventListener('change', function() {
      selectedOption = this.value;
      errorEl.textContent = '';
      errorEl.style.color = '';
    });
  });
  
  // Submit button event listener
  if (submitBtn) {
    submitBtn.addEventListener('click', submitAnswer);
  }
  
  // Add keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key >= 1 && e.key <= 4) {
      const optionIndex = parseInt(e.key) - 1;
      if (options[optionIndex]) {
        options[optionIndex].checked = true;
        selectedOption = options[optionIndex].value;
      }
    }
    
    if (e.key === 'Enter') {
      submitAnswer();
    }
  });
}

// Load current question
function loadQuestion() {
  if (currentQuestion >= quizData.length) {
    showResults();
    return;
  }
  
  const question = quizData[currentQuestion];
  
  questionEl.textContent = question.question;
  aText.textContent = question.a;
  bText.textContent = question.b;
  cText.textContent = question.c;
  dText.textContent = question.d;
  
  // Clear previous selection
  options.forEach(option => option.checked = false);
  selectedOption = null;
  
  // Restore previous answer if exists
  if (userAnswers[currentQuestion]) {
    const previousAnswer = userAnswers[currentQuestion];
    document.querySelector(`input[value="${previousAnswer}"]`).checked = true;
    selectedOption = previousAnswer;
  }
  
  // Update question counter in title if exists
  const questionCounter = document.querySelector('.question-counter');
  if (questionCounter) {
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  }
  
  // Update progress bar if exists
  updateProgressBar();
}

// Update progress bar
function updateProgressBar() {
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
}

// Start timer
function startTimer() {
  const timerEl = document.getElementById('timer');
  if (!timerEl) return;
  
  timerInterval = setInterval(() => {
    timer--;
    
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    
    timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Change color when less than 1 minute
    if (timer <= 60) {
      timerEl.style.color = '#f72585';
    }
    
    if (timer <= 0) {
      clearInterval(timerInterval);
      showResults();
    }
  }, 1000);
}

// Submit answer
function submitAnswer() {
  if (!selectedOption) {
    errorEl.textContent = 'Please select an answer!';
    errorEl.style.color = '#f72585';
    errorEl.style.animation = 'shake 0.5s';
    setTimeout(() => {
      errorEl.style.animation = '';
    }, 500);
    return;
  }
  
  // Store user's answer
  userAnswers[currentQuestion] = selectedOption;
  
  // Check if correct
  const isCorrect = selectedOption === quizData[currentQuestion].correct;
  
  if (isCorrect) {
    score++;
    showFeedback('correct', '✓ Correct! ' + quizData[currentQuestion].explanation);
  } else {
    const correctAnswer = quizData[currentQuestion].correct;
    const correctText = quizData[currentQuestion][correctAnswer];
    showFeedback('incorrect', `✗ Incorrect. Correct answer is ${correctAnswer.toUpperCase()}: ${correctText}`);
  }
  
  // Move to next question after delay
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
      errorEl.textContent = '';
    } else {
      showResults();
    }
  }, 2000);
}

// Show feedback
function showFeedback(type, message) {
  errorEl.textContent = message;
  errorEl.style.color = type === 'correct' ? '#4cc9f0' : '#f72585';
  errorEl.classList.add('feedback-show');
  
  // Highlight correct answer if wrong
  if (type === 'incorrect') {
    const correctAnswer = quizData[currentQuestion].correct;
    const correctOption = document.querySelector(`input[value="${correctAnswer}"]`);
    if (correctOption && correctOption.parentElement) {
      correctOption.parentElement.style.backgroundColor = '#d4edda';
      correctOption.parentElement.style.borderColor = '#c3e6cb';
    }
  }
}

// Show results
function showResults() {
  clearInterval(timerInterval);
  
  const percentage = Math.round((score / quizData.length) * 100);
  let message = '';
  
  if (percentage >= 90) message = 'Excellent! 🎉';
  else if (percentage >= 70) message = 'Good job! 👍';
  else if (percentage >= 50) message = 'Not bad! 👌';
  else message = 'Keep practicing! 📚';
  
  // Create results HTML
  const resultsHTML = `
    <div class="results-container">
      <h2>Quiz Completed!</h2>
      <p>${message}</p>
      
      <div class="score-display">
        <div class="score-circle" style="background: conic-gradient(#4cc9f0 0% ${percentage}%, #e9ecef ${percentage}% 100%);">
          <div class="score-text">
            <span class="score-number">${score}/${quizData.length}</span>
            <span class="score-percentage">${percentage}%</span>
          </div>
        </div>
      </div>
      
      <div class="results-breakdown">
        <h3>Your Answers:</h3>
        <div class="answers-list">
          ${quizData.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            const correctLetter = question.correct;
            const correctText = question[correctLetter];
            
            return `
              <div class="answer-item ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="question-number">Q${index + 1}</div>
                <div class="question-text">${question.question}</div>
                <div class="user-answer">Your answer: ${userAnswer ? question[userAnswer] : 'Not answered'}</div>
                ${!isCorrect ? `<div class="correct-answer">Correct: ${correctText}</div>` : ''}
                <div class="explanation">${question.explanation}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
      
      <div class="results-actions">
        <button onclick="restartQuiz()" class="btn btn-primary">
          <i class="fas fa-redo"></i> Restart Quiz
        </button>
        <button onclick="shareResults()" class="btn btn-secondary">
          <i class="fas fa-share"></i> Share Results
        </button>
        <a href="index.html" class="btn btn-secondary">
          <i class="fas fa-home"></i> Back to Home
        </a>
      </div>
    </div>
  `;
  
  quizContainer.innerHTML = resultsHTML;
  
  // Add animations
  setTimeout(() => {
    const scoreCircle = document.querySelector('.score-circle');
    if (scoreCircle) {
      scoreCircle.style.transform = 'scale(1)';
      scoreCircle.style.opacity = '1';
    }
  }, 100);
}

// Restart quiz
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  timer = 600;
  userAnswers = [];
  selectedOption = null;
  
  // Reload the page to restart
  window.location.reload();
}

// Share results
function shareResults() {
  const shareText = `I scored ${score}/${quizData.length} on the QuizMaster Web Development Quiz! Try it out: ${window.location.origin}`;
  
  if (navigator.share) {
    navigator.share({
      title: 'My Quiz Results',
      text: shareText,
      url: window.location.href
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Results copied to clipboard!');
    });
  }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', initQuiz);

// Add shake animation for error
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  
  .feedback-show {
    animation: feedbackShow 0.5s;
  }
  
  @keyframes feedbackShow {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);