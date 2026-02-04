// Enhanced Quiz Functionality
const quizData = [
  {
    question: "What does HTML stand for?",
    a: "Hyper Text Markup Language",
    b: "High Text Machine Language",
    c: "Hyper Text Markdown Language",
    d: "Hyper Transfer Markup Language",
    correct: "a",
    explanation: "HTML is the standard markup language for documents designed to be displayed in a web browser."
  },
  {
    question: "Which CSS property controls the text size?",
    a: "font-style",
    b: "text-size",
    c: "font-size",
    d: "text-style",
    correct: "c",
    explanation: "The font-size property sets the size of the text."
  },
  {
    question: "Which is not a JavaScript data type?",
    a: "Number",
    b: "String",
    c: "Boolean",
    d: "Float",
    correct: "d",
    explanation: "Float is not a separate data type in JavaScript; it's part of the Number type."
  },
  {
    question: "What does CSS stand for?",
    a: "Computer Style Sheets",
    b: "Creative Style System",
    c: "Cascading Style Sheets",
    d: "Colorful Style Sheets",
    correct: "c",
    explanation: "CSS stands for Cascading Style Sheets."
  }
];

class ModernQuiz {
  constructor() {
    this.currentQuestion = 0;
    this.score = 0;
    this.selectedAnswer = null;
    this.quizTime = 300; // 5 minutes in seconds
    this.timerInterval = null;
    this.userAnswers = [];
    
    this.initializeElements();
    this.setupEventListeners();
    this.startTimer();
    this.loadQuestion();
  }

  initializeElements() {
    this.questionEl = document.getElementById('question');
    this.aText = document.getElementById('a_text');
    this.bText = document.getElementById('b_text');
    this.cText = document.getElementById('c_text');
    this.dText = document.getElementById('d_text');
    this.submitBtn = document.getElementById('submit');
    this.nextBtn = document.getElementById('next');
    this.prevBtn = document.getElementById('prev');
    this.options = document.querySelectorAll('.option-label');
    this.progressBar = document.querySelector('.progress-bar');
    this.timerEl = document.getElementById('timer');
    this.questionCounter = document.querySelector('.question-counter');
    this.errorEl = document.getElementById('error');
  }

  setupEventListeners() {
    // Option selection
    this.options.forEach(option => {
      option.addEventListener('click', (e) => {
        this.selectOption(e.currentTarget);
      });
    });

    // Submit answer
    this.submitBtn?.addEventListener('click', () => this.submitAnswer());
    
    // Next question
    this.nextBtn?.addEventListener('click', () => this.nextQuestion());
    
    // Previous question
    this.prevBtn?.addEventListener('click', () => this.previousQuestion());
  }

  selectOption(option) {
    // Remove selected class from all options
    this.options.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    option.classList.add('selected');
    
    // Get the selected answer value
    const input = option.querySelector('input');
    this.selectedAnswer = input.value;
    input.checked = true;
    
    // Clear any error messages
    this.errorEl.textContent = '';
  }

  loadQuestion() {
    if (this.currentQuestion >= quizData.length) {
      this.showResults();
      return;
    }

    const question = quizData[this.currentQuestion];
    
    // Update question elements
    this.questionEl.textContent = question.question;
    this.aText.textContent = question.a;
    this.bText.textContent = question.b;
    this.cText.textContent = question.c;
    this.dText.textContent = question.d;

    // Update progress
    this.updateProgress();
    
    // Clear selection
    this.options.forEach(opt => {
      opt.classList.remove('selected');
      const input = opt.querySelector('input');
      input.checked = false;
    });
    this.selectedAnswer = null;

    // Check if user has previously answered this question
    const previousAnswer = this.userAnswers[this.currentQuestion];
    if (previousAnswer) {
      const option = document.querySelector(`input[value="${previousAnswer}"]`);
      if (option) {
        option.checked = true;
        option.closest('.option-label').classList.add('selected');
        this.selectedAnswer = previousAnswer;
      }
    }
  }

  updateProgress() {
    const progress = ((this.currentQuestion + 1) / quizData.length) * 100;
    this.progressBar.style.width = `${progress}%`;
    
    // Update question counter
    this.questionCounter.textContent = `Question ${this.currentQuestion + 1} of ${quizData.length}`;
  }

  submitAnswer() {
    if (!this.selectedAnswer) {
      this.errorEl.textContent = 'Please select an answer before submitting!';
      this.errorEl.style.color = 'var(--danger)';
      return;
    }

    // Check if correct
    const isCorrect = this.selectedAnswer === quizData[this.currentQuestion].correct;
    
    // Store user answer
    this.userAnswers[this.currentQuestion] = this.selectedAnswer;
    
    // Update score
    if (isCorrect) {
      this.score++;
      this.errorEl.textContent = '✓ Correct! ' + quizData[this.currentQuestion].explanation;
      this.errorEl.style.color = 'var(--success)';
    } else {
      const correctAnswer = quizData[this.currentQuestion].correct;
      this.errorEl.textContent = `✗ Incorrect. The correct answer is ${correctAnswer.toUpperCase()}: ${quizData[this.currentQuestion][correctAnswer]}`;
      this.errorEl.style.color = 'var(--danger)';
    }

    // Move to next question after delay
    setTimeout(() => {
      this.currentQuestion++;
      if (this.currentQuestion < quizData.length) {
        this.loadQuestion();
      } else {
        this.showResults();
      }
    }, 2000);
  }

  nextQuestion() {
    if (this.currentQuestion < quizData.length - 1) {
      this.currentQuestion++;
      this.loadQuestion();
    }
  }

  previousQuestion() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
      this.loadQuestion();
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.quizTime--;
      
      const minutes = Math.floor(this.quizTime / 60);
      const seconds = this.quizTime % 60;
      
      this.timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      if (this.quizTime <= 0) {
        clearInterval(this.timerInterval);
        this.showResults();
      }
    }, 1000);
  }

  showResults() {
    clearInterval(this.timerInterval);
    
    const percentage = (this.score / quizData.length) * 100;
    const scoreCircle = document.querySelector('.score-circle');
    
    // Update score circle
    scoreCircle.style.setProperty('--percentage', `${percentage}%`);
    document.querySelector('.score-text').textContent = `${this.score}/${quizData.length}`;
    
    // Show results container
    document.querySelector('.quiz-container').style.display = 'none';
    document.querySelector('.results-container').style.display = 'block';
    
    // Add detailed results
    this.showDetailedResults();
  }

  showDetailedResults() {
    const detailsContainer = document.getElementById('resultsDetails');
    detailsContainer.innerHTML = '';
    
    quizData.forEach((question, index) => {
      const userAnswer = this.userAnswers[index];
      const isCorrect = userAnswer === question.correct;
      
      const detailItem = document.createElement('div');
      detailItem.className = 'result-item';
      detailItem.innerHTML = `
        <h4>Question ${index + 1}</h4>
        <p><strong>Q:</strong> ${question.question}</p>
        <p class="${isCorrect ? 'correct' : 'incorrect'}">
          <strong>Your Answer:</strong> ${userAnswer ? question[userAnswer] : 'Not answered'}
        </p>
        ${!isCorrect ? `<p class="correct"><strong>Correct Answer:</strong> ${question[question.correct]}</p>` : ''}
        <p><em>${question.explanation}</em></p>
      `;
      
      detailsContainer.appendChild(detailItem);
    });
  }
}

// Contact Form Handling
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    if (this.form) {
      this.setupForm();
    }
  }

  setupForm() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(this.form);
      const button = this.form.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      
      // Show loading state
      button.innerHTML = '<span class="loading"></span> Sending...';
      button.disabled = true;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      alert('Thank you for your message! We\'ll get back to you soon.');
      
      // Reset form
      this.form.reset();
      button.textContent = originalText;
      button.disabled = false;
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize quiz if on quiz page
  if (document.getElementById('quiz')) {
    new ModernQuiz();
  }
  
  // Initialize contact form if exists
  new ContactForm();
  
  // Set active nav link
  setActiveNavLink();
  
  // Add animations
  addAnimations();
});

// Set active navigation link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.navbar a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

// Add scroll animations
function addAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe elements with animation class
  document.querySelectorAll('.feature-card, .hero-content').forEach(el => {
    observer.observe(el);
  });
}
