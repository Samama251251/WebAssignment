let currentTest = null;
let timer = null;
let startTime = null;
let questions = [];
let userAnswers = {};

const testConfigs = {
    dsa: {
        title: 'Data Structures & Algorithms',
        duration: 3600, // 60 minutes in seconds
        description: 'Test your knowledge of fundamental data structures and algorithms.'
    }
};

function startTest(testType) {
    currentTest = testType;
    startTime = new Date();
    userAnswers = {};
    
    // Set up test information
    document.getElementById('testTitle').textContent = testConfigs[testType].title;
    document.getElementById('testDescription').textContent = testConfigs[testType].description;
    
    // Load questions
    loadQuestions(testType);
    
    // Start timer
    startTimer(testConfigs[testType].duration);
    
    // Show test modal
    const testModal = new bootstrap.Modal(document.getElementById('testModal'));
    testModal.show();
}

function loadQuestions(testType) {
    questions = generateDummyQuestions(testType);
    displayQuestions(questions);
}

function displayQuestions(questions) {
    const container = document.getElementById('questionContainer');
    container.innerHTML = questions.map((q, index) => `
        <div class="question-card">
            <div class="question-number">Question ${index + 1}</div>
            <div class="question-text">${q.question}</div>
            <ul class="options-list">
                ${q.options.map((option, optIndex) => `
                    <li class="option-item ${userAnswers[index] === optIndex ? 'selected' : ''}" 
                        onclick="selectOption(${index}, ${optIndex})">
                        ${option}
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

function selectOption(questionIndex, optionIndex) {
    userAnswers[questionIndex] = optionIndex;
    
    // Update UI to show selected option
    const questionCard = document.querySelectorAll('.question-card')[questionIndex];
    const options = questionCard.querySelectorAll('.option-item');
    options.forEach(opt => opt.classList.remove('selected'));
    options[optionIndex].classList.add('selected');
}

function startTimer(duration) {
    const timerDisplay = document.getElementById('timer');
    let timeLeft = duration;
    
    timer = setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            submitTest();
        }
        
        timeLeft--;
    }, 1000);
}

function submitTest() {
    clearInterval(timer);
    
    // Calculate score
    const score = calculateScore();
    const timeTaken = Math.floor((new Date() - startTime) / 1000);
    
    // Update result modal
    document.getElementById('finalScore').textContent = `${score}%`;
    document.getElementById('totalQuestions').textContent = questions.length;
    document.getElementById('correctAnswers').textContent = Math.round(questions.length * score / 100);
    document.getElementById('timeTaken').textContent = formatTime(timeTaken);
    document.getElementById('resultMessage').textContent = getResultMessage(score);
    
    // Hide test modal and show result modal
    const testModal = bootstrap.Modal.getInstance(document.getElementById('testModal'));
    testModal.hide();
    
    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
}

function calculateScore() {
    let correct = 0;
    questions.forEach((q, index) => {
        if (userAnswers[index] === q.correctAnswer) {
            correct++;
        }
    });
    return Math.round((correct / questions.length) * 100);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function getResultMessage(score) {
    if (score >= 90) return 'Excellent! Outstanding performance!';
    if (score >= 80) return 'Great job! Very good performance!';
    if (score >= 70) return 'Good work! You passed the test!';
    if (score >= 60) return 'You passed, but there\'s room for improvement.';
    return 'Keep practicing to improve your score.';
}

function generateDummyQuestions(testType) {
    return [
        {
            question: 'What is the time complexity of QuickSort in the average case?',
            options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
            correctAnswer: 1
        },
        {
            question: 'Which data structure is best suited for implementing a priority queue?',
            options: ['Array', 'Linked List', 'Binary Heap', 'Stack'],
            correctAnswer: 2
        },
        {
            question: 'What is the worst-case time complexity of Binary Search?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctAnswer: 1
        },
        {
            question: 'Which of the following is NOT a stable sorting algorithm?',
            options: ['Merge Sort', 'Bubble Sort', 'Quick Sort', 'Insertion Sort'],
            correctAnswer: 2
        },
        {
            question: 'What is the space complexity of Depth-First Search (DFS) on a binary tree?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
            correctAnswer: 1
        },
        {
            question: 'Which data structure is used for implementing a hash table?',
            options: ['Array', 'Linked List', 'Binary Tree', 'Graph'],
            correctAnswer: 0
        },
        {
            question: 'What is the time complexity of inserting an element into a binary search tree?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctAnswer: 1
        },
        {
            question: 'Which algorithm is used to find the shortest path in a weighted graph?',
            options: ['BFS', 'DFS', 'Dijkstra\'s', 'Kruskal\'s'],
            correctAnswer: 2
        },
        {
            question: 'What is the time complexity of finding the maximum element in a max heap?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctAnswer: 0
        },
        {
            question: 'Which of the following is NOT a divide and conquer algorithm?',
            options: ['Merge Sort', 'Quick Sort', 'Binary Search', 'Bubble Sort'],
            correctAnswer: 3
        }
    ];
}

function reviewTest() {
    const container = document.getElementById('questionContainer');
    container.innerHTML = questions.map((q, index) => `
        <div class="question-card">
            <div class="question-number">Question ${index + 1}</div>
            <div class="question-text">${q.question}</div>
            <ul class="options-list">
                ${q.options.map((option, optIndex) => `
                    <li class="option-item ${userAnswers[index] === optIndex ? 'selected' : ''} 
                        ${optIndex === q.correctAnswer ? 'correct' : ''}">
                        ${option}
                    </li>
                `).join('')}
            </ul>
            <div class="explanation">
                Your answer was ${userAnswers[index] === q.correctAnswer ? 'correct' : 'incorrect'}.
            </div>
        </div>
    `).join('');
    
    // Show test modal with review
    const testModal = new bootstrap.Modal(document.getElementById('testModal'));
    testModal.show();
} 