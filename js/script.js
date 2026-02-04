// Enhanced Quiz Application with additional features

// Quiz Data with more questions (expanded from original)
const quizData = [
  // ===== SU’AALO DIINI =====
  {
    id: 1,
    category: "religion",
    question: "Waa kuma Nebiga ugu dambeeyay ee Ilaahay soo diray?",
    a: "Nabi Muuse (CS)",
    b: "Nabi Ciise (CS)",
    c: "Nabi Muxammad (NNKH)",
    d: "Nabi Ibraahim (CS)",
    correct: "c",
    explanation: "Nabi Muxammad (NNKH) waa Nebiga ugu dambeeyay ee Ilaahay soo diray."
  },
  {
    id: 2,
    category: "religion",
    question: "Imisa tiir ayuu Islaamku leeyahay?",
    a: "3",
    b: "4",
    c: "5",
    d: "6",
    correct: "c",
    explanation: "Islaamku wuxuu leeyahay 5 tiir."
  },
  {
    id: 3,
    category: "religion",
    question: "Qur'aanka kariimka ah luqaddee ayuu ku soo degay?",
    a: "Af-Carabi",
    b: "Af-Cibraani",
    c: "Af-Faarisi",
    d: "Af-Soomaali",
    correct: "a",
    explanation: "Qur'aanka kariimka ah wuxuu ku soo degay af-Carabi."
  },
  {
    id: 4,
    category: "religion",
    question: "Malaa'igta ayey weheliyaan qofka Muslimka ah?",
    a: "Malaa'igtii xagga midig",
    b: "Malaa'igtii xagga bidix",
    c: "Labada Malaa'igood",
    d: "Malaa'igtii sare",
    correct: "c",
    explanation: "Labada Malaa'igood (midka xagga midig iyo midka xagga bidix) ayaa weheliya qofka Muslimka ah."
  },

  // ===== SU'AALO MAADI =====
  {
    id: 5,
    category: "science",
    question: "Meeraha ugu dhow Qorraxda waa kee?",
    a: "Dhulka",
    b: "Mars",
    c: "Mercury",
    d: "Venus",
    correct: "c",
    explanation: "Mercury waa meeraha ugu dhow Qorraxda."
  },
  {
    id: 6,
    category: "science",
    question: "Qaaradda Afrika waddanka ugu ballaaran waa kee?",
    a: "Masar",
    b: "Algeria",
    c: "Soomaaliya",
    d: "Nigeria",
    correct: "b",
    explanation: "Algeria waa waddanka ugu ballaaran qaaradda Afrika."
  },
  {
    id: 7,
    category: "science",
    question: "Midabkee ayaa ka dhasha marka la isku daro buluug iyo jaalle?",
    a: "Casaan",
    b: "Cagaar",
    c: "Madow",
    d: "Caddaan",
    correct: "b",
    explanation: "Buluug iyo jaalle marka la isku daro waxay noqdaan cagaar."
  },
  {
    id: 8,
    category: "science",
    question: "Immisa gees ayaa leh geesoodka?",
    a: "3",
    b: "4",
    c: "5",
    d: "6",
    correct: "a",
    explanation: "Geesoodku wuxuu leeyahay 3 gees."
  },

  // ===== SU'AALO TAARIIKH =====
  {
    id: 9,
    category: "history",
    question: "Magacaas weyn ee Soomaaliya xilligii hore waxaa loo yaqaanay?",
    a: "Bilad al-Barbar",
    b: "Puntland",
    c: "Horn of Africa",
    d: "Ajam",
    correct: "a",
    explanation: "Soomaaliya xilligii hore waxaa loo yaqaanay Bilad al-Barbar."
  },
  {
    id: 10,
    category: "history",
    question: "Xiligee ayuu ka bilowday Dagaalkii Labaad ee Aduunka?",
    a: "1935",
    b: "1939",
    c: "1941",
    d: "1945",
    correct: "b",
    explanation: "Dagaalkii Labaad ee Aduunka wuxuu ka bilowday 1939."
  },

  // ===== SU'AALO CILMI NAFSIGA =====
  {
    id: 11,
    category: "psychology",
    question: "Waa maxay hormoonka farxadda?",
    a: "Insulin",
    b: "Dopamine",
    c: "Adrenaline",
    d: "Cortisol",
    correct: "b",
    explanation: "Dopamine waa hormoonka farxadda."
  },
  {
    id: 12,
    category: "psychology",
    question: "Immisa jir ayaa uu leeyahay qofka caadiga ah?",
    a: "204",
    b: "206",
    c: "208",
    d: "210",
    correct: "b",
    explanation: "Qofka caadiga ah wuxuu leeyahay 206 jir."
  }
];

// Global variables
let currentQuestion = 0;
let score = 0;
let timer = 600; // 10 minutes in seconds
let timerInterval;
let userAnswers = new Array(quizData.length).fill(null);
let selectedOption = null;
let quizQuestions = [...quizData]; // Copy of quiz data for filtering

// DOM Elements
const quizContainer = document.getElementById('quiz-container');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const totalQuestionsEl = document.getElementById('total-questions');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsTextEl = document.getElementById('total-questions-text');
const progressFillEl = document.getElementById('progress-fill');

// Initialize quiz
function initQuiz() {
  // Check URL parameters for category filtering
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  
  if (category) {
    quizQuestions = quizData.filter(q => q.category === category);
  } else {
    quizQuestions = [...quizData];
  }
  
  // Update UI elements
  if (totalQuestionsEl) {
    totalQuestionsEl.textContent = `${quizQuestions.length} Questions`;
  }
  
  if (totalQuestionsTextEl) {
    totalQuestionsTextEl.textContent = quizQuestions.length;
  }
  
  if (quizContainer) {
    loadQuestion();
    startTimer();
    updateScore();
  }
  
  // Setup mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}

// Load current question
function loadQuestion() {
  if (currentQuestion >= quizQuestions.length) {
    showResults();
    return;
  }
  
  const question = quizQuestions[currentQuestion];
  
  // Create question HTML
  const questionHTML = `
    <div class="quiz-question">
      <div class="question-text">${question.question}</div>
      
      <div class="options-container">
        <div class="option" data-value="a">
          <input type="radio" id="option_a" name="answer" value="a">
          <label for="option_a">
            <span class="option-letter">A</span>
            <span class="option-text">${question.a}</span>
          </label>
        </div>
        
        <div class="option" data-value="b">
          <input type="radio" id="option_b" name="answer" value="b">
          <label for="option_b">
            <span class="option-letter">B</span>
            <span class="option-text">${question.b}</span>
          </label>
        </div>
        
        <div class="option" data-value="c">
          <input type="radio" id="option_c" name="answer" value="c">
          <label for="option_c">
            <span class="option-letter">C</span>
            <span class="option-text">${question.c}</span>
          </label>
        </div>
        
        <div class="option" data-value="d">
          <input type="radio" id="option_d" name="answer" value="d">
          <label for="option_d">
            <span class="option-letter">D</span>
            <span class="option-text">${question.d}</span>
          </label>
        </div>
      </div>
      
      <div id="quiz-feedback" class="quiz-feedback"></div>
      
      <div class="quiz-actions">
        <div class="question-counter">
          Question ${currentQuestion + 1} of ${quizQuestions.length}
        </div>
        <button id="submit-btn" class="btn btn-primary">
          ${currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `;
  
  quizContainer.innerHTML = questionHTML;
  
  // Restore previous selection if exists
  if (userAnswers[currentQuestion]) {
    const previousAnswer = userAnswers[currentQuestion];
    document.querySelector(`input[value="${previousAnswer}"]`).checked = true;
    selectedOption = previousAnswer;
    
    // Highlight selected option
    const selectedOptionEl = document.querySelector(`.option[data-value="${previousAnswer}"]`);
    if (selectedOptionEl) {
      selectedOptionEl.style.borderColor = '#4361ee';
      selectedOptionEl.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
    }
  }
  
  // Update progress
  updateProgress();
  
  // Add event listeners
  addEventListeners();
}

// Add event listeners to options and submit button
function addEventListeners() {
  // Option selection
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.addEventListener('click', function() {
      // Remove selection from all options
      options.forEach(opt => {
        opt.style.borderColor = '#e9ecef';
        opt.style.backgroundColor = '';
      });
      
      // Select this option
      const value = this.getAttribute('data-value');
      const input = this.querySelector('input');
      input.checked = true;
      selectedOption = value;
      
      // Highlight selected option
      this.style.borderColor = '#4361ee';
      this.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
      
      // Clear any previous feedback
      const feedbackEl = document.getElementById('quiz-feedback');
      feedbackEl.classList.remove('show', 'correct', 'incorrect');
      feedbackEl.textContent = '';
    });
  });
  
  // Submit button
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitAnswer);
  }
  
  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Number keys 1-4 for options
    if (e.key >= 1 && e.key <= 4) {
      const optionIndex = parseInt(e.key) - 1;
      const options = document.querySelectorAll('.option');
      if (options[optionIndex]) {
        options[optionIndex].click();
      }
    }
    
    // Enter to submit
    if (e.key === 'Enter') {
      submitAnswer();
    }
    
    // Space to select option (when focused)
    if (e.key === ' ' && document.activeElement.classList.contains('option')) {
      document.activeElement.click();
      e.preventDefault();
    }
  });
}

// Update progress bar and counter
function updateProgress() {
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  
  if (progressFillEl) {
    progressFillEl.style.width = `${progress}%`;
  }
  
  if (currentQuestionEl) {
    currentQuestionEl.textContent = currentQuestion + 1;
  }
}

// Start timer
function startTimer() {
  if (!timerEl) return;
  
  updateTimerDisplay();
  
  timerInterval = setInterval(() => {
    timer--;
    updateTimerDisplay();
    
    if (timer <= 0) {
      clearInterval(timerInterval);
      showResults();
    }
  }, 1000);
}

// Update timer display
function updateTimerDisplay() {
  if (!timerEl) return;
  
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  
  timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Change color when less than 1 minute
  if (timer <= 60) {
    timerEl.style.color = '#f72585';
    timerEl.style.fontWeight = 'bold';
    
    // Add blinking animation for last 10 seconds
    if (timer <= 10) {
      timerEl.style.animation = 'blink 1s infinite';
    }
  }
}

// Update score display
function updateScore() {
  if (scoreEl) {
    scoreEl.textContent = `Score: ${score}`;
  }
}

// Submit answer
function submitAnswer() {
  if (!selectedOption) {
    showFeedback('Please select an answer before continuing!', 'warning');
    return;
  }
  
  // Store user's answer
  userAnswers[currentQuestion] = selectedOption;
  
  // Check if correct
  const isCorrect = selectedOption === quizQuestions[currentQuestion].correct;
  
  if (isCorrect) {
    score++;
    updateScore();
    
    const explanation = quizQuestions[currentQuestion].explanation;
    showFeedback(`✓ Correct! ${explanation}`, 'correct');
  } else {
    const correctAnswer = quizQuestions[currentQuestion].correct;
    const correctText = quizQuestions[currentQuestion][correctAnswer];
    const explanation = quizQuestions[currentQuestion].explanation;
    
    showFeedback(`✗ Incorrect. The correct answer is ${correctAnswer.toUpperCase()}: ${correctText}. ${explanation}`, 'incorrect');
    
    // Highlight correct answer
    const correctOption = document.querySelector(`.option[data-value="${correctAnswer}"]`);
    if (correctOption) {
      correctOption.style.borderColor = '#4cc9f0';
      correctOption.style.backgroundColor = 'rgba(76, 201, 240, 0.1)';
    }
  }
  
  // Disable all options after answering
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.style.pointerEvents = 'none';
  });
  
  // Change button text and function
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.innerHTML = currentQuestion === quizQuestions.length - 1 
    ? 'View Results <i class="fas fa-chart-bar"></i>' 
    : 'Next Question <i class="fas fa-arrow-right"></i>';
  
  submitBtn.onclick = function() {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  };
}

// Show feedback message
function showFeedback(message, type) {
  const feedbackEl = document.getElementById('quiz-feedback');
  
  feedbackEl.textContent = message;
  feedbackEl.className = `quiz-feedback show ${type}`;
  
  // Scroll feedback into view if needed
  feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Show results
function showResults() {
  clearInterval(timerInterval);
  
  const percentage = Math.round((score / quizQuestions.length) * 100);
  let message = '';
  let emoji = '';
  
  if (percentage >= 90) {
    message = 'Excellent! You are a true expert!';
    emoji = '🏆';
  } else if (percentage >= 70) {
    message = 'Great job! You have good knowledge!';
    emoji = '👍';
  } else if (percentage >= 50) {
    message = 'Good effort! Keep learning!';
    emoji = '👌';
  } else {
    message = 'Keep practicing to improve!';
    emoji = '📚';
  }
  
  // Calculate time taken
  const timeTaken = 600 - timer;
  const minutesTaken = Math.floor(timeTaken / 60);
  const secondsTaken = timeTaken % 60;
  
  // Create results HTML
  const resultsHTML = `
    <div class="results-container">
      <h2>Quiz Completed! ${emoji}</h2>
      <p class="results-message">${message}</p>
      
      <div class="score-display">
        <div class="score-circle">
          <div class="score-text">
            <span class="score-number">${score}/${quizQuestions.length}</span>
            <span class="score-percentage">${percentage}%</span>
          </div>
        </div>
        
        <div class="score-details">
          <div class="detail-item">
            <i class="fas fa-clock"></i>
            <span>Time: ${minutesTaken}:${secondsTaken.toString().padStart(2, '0')}</span>
          </div>
          <div class="detail-item">
            <i class="fas fa-chart-line"></i>
            <span>Accuracy: ${percentage}%</span>
          </div>
        </div>
      </div>
      
      <div class="results-breakdown">
        <h3>Detailed Breakdown</h3>
        <div class="answers-list">
          ${quizQuestions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            const correctLetter = question.correct;
            const correctText = question[correctLetter];
            const userAnswerText = userAnswer ? question[userAnswer] : 'Not answered';
            
            return `
              <div class="answer-item ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="question-number">Q${index + 1}</div>
                <div class="question-text">${question.question}</div>
                <div class="user-answer">Your answer: ${userAnswerText}</div>
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
  
  // Animate score circle
  setTimeout(() => {
    const scoreCircle = document.querySelector('.score-circle');
    if (scoreCircle) {
      scoreCircle.style.background = `conic-gradient(#4361ee 0% ${percentage}%, #e9ecef ${percentage}% 100%)`;
    }
  }, 100);
}

// Restart quiz
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  timer = 600;
  userAnswers = new Array(quizQuestions.length).fill(null);
  selectedOption = null;
  
  initQuiz();
}

// Share results
function shareResults() {
  const shareText = `I scored ${score}/${quizQuestions.length} (${Math.round((score / quizQuestions.length) * 100)}%) on the QuizMaster Challenge! Test your knowledge at: ${window.location.origin}`;
  
  if (navigator.share) {
    navigator.share({
      title: 'My QuizMaster Results',
      text: shareText,
      url: window.location.href
    }).catch(err => {
      console.log('Error sharing:', err);
      fallbackShare(shareText);
    });
  } else {
    fallbackShare(shareText);
  }
}

// Fallback share method
function fallbackShare(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Results copied to clipboard! You can now paste and share.');
    }).catch(err => {
      prompt('Copy the following text to share:', text);
    });
  } else {
    prompt('Copy the following text to share:', text);
  }
}

// Add CSS for animations
function addStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .score-details {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 20px;
      background-color: #f8f9fa;
      border-radius: 50px;
    }
    
    .detail-item i {
      color: #4361ee;
    }
    
    .results-message {
      font-size: 1.2rem;
      margin-bottom: 30px;
    }
  `;
  document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  addStyles();
  initQuiz();
});
