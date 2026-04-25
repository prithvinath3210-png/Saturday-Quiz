const quizData = [
    // --- C Programming (Normal) ---
    { q: "What is the correct extension of a C file?", options: [".java", ".c", ".cpp", ".py"], answer: 1 },
    { q: "Which function is used to print output in C?", options: ["print()", "echo()", "printf()", "display()"], answer: 2 },
    { q: "What is the size of int in C (generally)?", options: ["2 bytes", "4 bytes", "8 bytes", "1 byte"], answer: 1 },
    { q: "Which symbol is used for comments in C?", options: ["//", "<!-- -->", "##", "%%"], answer: 0 },
    { q: "Which keyword is used to declare a variable in C?", options: ["var", "let", "int", "define"], answer: 2 },
    
    // --- Digital Marketing (Normal) ---
    { q: "What does SEO stand for?", options: ["Search Engine Optimization", "Social Engine Optimization", "Search Easy Option", "Site Engine Order"], answer: 0 },
    { q: "Which platform is mainly used for professional networking?", options: ["Instagram", "Facebook", "LinkedIn", "Snapchat"], answer: 2 },
    { q: "What is PPC in digital marketing?", options: ["Pay Per Click", "Post Per Content", "Pay Per Content", "Price Per Click"], answer: 0 },
    { q: "Which tool is used for website analytics?", options: ["Canva", "Google Analytics", "CapCut", "Photoshop"], answer: 1 },
    { q: "Email marketing is used to:", options: ["Play games", "Send messages to customers", "Edit videos", "Design logos"], answer: 1 },
    
    // --- AI Tools (Normal) ---
    { q: "Which of the following is an AI chatbot?", options: ["MS Word", "ChatGPT", "Excel", "PowerPoint"], answer: 1 },
    { q: "Which AI tool is used for image generation?", options: ["ChatGPT", "Midjourney", "Excel", "Notepad"], answer: 1 },
    { q: "AI stands for:", options: ["Automatic Input", "Artificial Intelligence", "Advanced Internet", "Applied Information"], answer: 1 },
    { q: "Which AI tool is used for video editing?", options: ["CapCut", "Google Docs", "Paint", "Calculator"], answer: 0 },
    { q: "Machine Learning is a part of:", options: ["Web Design", "Artificial Intelligence", "Networking", "Hardware"], answer: 1 },
    
    // --- General Tech / IT (Normal) ---
    { q: "What does URL stand for?", options: ["Uniform Resource Locator", "Unique Resource Link", "Universal Resource Line", "Uniform Reference Link"], answer: 0 },
    { q: "Which language is used for web development?", options: ["HTML", "C", "Java", "Python"], answer: 0 },
    { q: "What is a database?", options: ["A game", "A collection of data", "A software", "A virus"], answer: 1 },
    { q: "Which company developed Windows OS?", options: ["Apple", "Google", "Microsoft", "IBM"], answer: 2 },
    { q: "What is cloud computing?", options: ["Storing data on local PC", "Using internet-based services", "Hardware repairing", "Coding language"], answer: 1 },

    // --- 🔥 Advanced Level Questions (Hard) ---
    { q: "What is the output of the following C code?", code: "int x = 5;\nprintf(\"%d\", x++ + ++x);", options: ["11", "12", "10", "Undefined Behavior"], answer: 3 },
    { q: "Which of the following is NOT a valid storage class in C?", options: ["auto", "register", "volatile", "static"], answer: 2 },
    { q: "What does CTR stand for in Digital Marketing?", options: ["Click Through Rate", "Customer Tracking Ratio", "Content Target Reach", "Click Time Ratio"], answer: 0 },
    { q: "Which algorithm is commonly used in search engines ranking?", options: ["Bubble Sort", "PageRank", "Linear Search", "DFS"], answer: 1 },
    { q: "Which AI model type is used for text generation tools like ChatGPT?", options: ["CNN", "RNN", "Transformer", "Decision Tree"], answer: 2 },
    { q: "What will be the output?", code: "int a = 10;\nprintf(\"%d %d %d\", a, a++, ++a);", options: ["10 10 12", "10 11 12", "Undefined Behavior", "10 11 11"], answer: 2 },
    { q: "In SEO, what is “Backlink”?", options: ["Link from your site to another", "Link from another site to your site", "Broken link", "Internal navigation link"], answer: 1 },
    { q: "Which AI tool is commonly used for coding assistance?", options: ["Canva", "GitHub Copilot", "Photoshop", "Excel"], answer: 1 },
    { q: "What is the time complexity of Binary Search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 1 },
    { q: "Which of the following is a supervised learning algorithm?", options: ["K-Means", "Linear Regression", "PCA", "Apriori"], answer: 1 }
];

// App State
let appState = {
    user: { name: "", scholar: "", course: "" },
    questions: [],
    currentIndex: 0,
    score: 0,
    selectedOption: null
};

let timerInterval;
let timeLeft = 20;

// DOM Elements
const views = {
    auth: document.getElementById('auth-screen'),
    quiz: document.getElementById('quiz-screen'),
    result: document.getElementById('result-screen'),
    leaderboard: document.getElementById('leaderboard-screen')
};

const form = document.getElementById('registration-form');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');
const backToResultsBtn = document.getElementById('back-to-results-btn');
const leaderboardBody = document.getElementById('leaderboard-body');

const dName = document.getElementById('display-name');
const dScholar = document.getElementById('display-scholar');

const qText = document.getElementById('question-text');
const codeContainer = document.getElementById('code-snippet-container');
const codeText = document.getElementById('code-snippet-text');
const optionsContainer = document.getElementById('options-container');

const timerText = document.getElementById('timer-text');
const tracker = document.getElementById('question-tracker');
const progressFill = document.getElementById('progress-fill');

// Fisher-Yates Shuffle
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Navigation
function switchView(viewName) {
    Object.values(views).forEach(v => {
        v.classList.remove('active');
        v.classList.add('hidden');
    });
    views[viewName].classList.remove('hidden');
    views[viewName].classList.add('active');
}

// Authentication / Form Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    appState.user.name = document.getElementById('student-name').value;
    appState.user.scholar = document.getElementById('scholar-number').value;
    appState.user.course = document.getElementById('course-name').value;

    initQuiz();
});

function initQuiz() {
    appState.questions = shuffleArray(quizData);
    appState.currentIndex = 0;
    appState.score = 0;

    dName.textContent = appState.user.name;
    dScholar.textContent = appState.user.scholar;

    switchView('quiz');
    loadQuestion();
}

function loadQuestion() {
    appState.selectedOption = null;
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';
    
    // Reset Timer
    clearInterval(timerInterval);
    timeLeft = 20;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            handleTimeout();
        }
    }, 1000);

    const currentQ = appState.questions[appState.currentIndex];
    
    // Tracker update
    tracker.textContent = `Question ${appState.currentIndex + 1} / ${appState.questions.length}`;
    progressFill.style.width = `${((appState.currentIndex) / appState.questions.length) * 100}%`;

    // Render Question
    qText.textContent = currentQ.q;
    
    if (currentQ.code) {
        codeText.textContent = currentQ.code;
        codeContainer.classList.remove('hidden');
    } else {
        codeContainer.classList.add('hidden');
    }

    // Render Options
    currentQ.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = `${String.fromCharCode(65 + index)}. ${opt}`;
        
        btn.addEventListener('click', () => selectOption(btn, index));
        optionsContainer.appendChild(btn);
    });
}

function updateTimerDisplay() {
    timerText.textContent = `00:${timeLeft < 10 ? '0' + timeLeft : timeLeft}`;
    if (timeLeft <= 5) {
        timerText.classList.add('danger');
    } else {
        timerText.classList.remove('danger');
    }
}

function handleTimeout() {
    clearInterval(timerInterval);
    appState.selectedOption = -1; // timed out
    
    const currentQ = appState.questions[appState.currentIndex];
    const allBtns = optionsContainer.querySelectorAll('.option-btn');
    
    // Disable all options
    allBtns.forEach(b => b.disabled = true);
    
    // Show correct option
    allBtns[currentQ.answer].classList.add('correct');
    
    // Automatically move to the next question after 2 seconds
    setTimeout(() => {
        moveToNextQuestion();
    }, 2000);
}

function moveToNextQuestion() {
    appState.currentIndex++;
    if (appState.currentIndex < appState.questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function selectOption(btn, index) {
    if (appState.selectedOption !== null) return; // Prevent multiple clicks

    clearInterval(timerInterval); // Stop timer tick
    appState.selectedOption = index;
    const currentQ = appState.questions[appState.currentIndex];
    
    const allBtns = optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true); // Disable all

    if (index === currentQ.answer) {
        btn.classList.add('correct');
        appState.score++;
    } else {
        btn.classList.add('wrong');
        allBtns[currentQ.answer].classList.add('correct'); // Show correct one
    }

    nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
    moveToNextQuestion();
});

async function sendResultsToGoogleForm() {
    const formUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSc337ZrYj3OIpVQlt0piarAgZxvka4Q9TWWmvAPJH8NuuWJPQ/formResponse"; 
    const statusText = document.getElementById('submission-status');
    
    if (statusText) statusText.innerText = "Transmitting data...";

    const formData = new URLSearchParams();
    formData.append("entry.88117807", appState.user.name);
    formData.append("entry.1253118063", appState.user.scholar);
    formData.append("entry.825139127", appState.user.course);
    formData.append("entry.1093045113", `${appState.score}/${appState.questions.length}`);

    console.log("Preparing to send results to Google Form...");
    
    try {
        await fetch(formUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });
        console.log("Result sent successfully.");
        if (statusText) statusText.innerText = "✅ Assessment Data Recursively Logged";
    } catch (err) {
        console.error("Error sending result to Google Form", err);
        if (statusText) statusText.innerText = "❌ Data Transmission Failed";
    }
}

function showResults() {
    progressFill.style.width = `100%`;
    switchView('result');

    const total = appState.questions.length;
    const percent = Math.round((appState.score / total) * 100);

    document.getElementById('final-score-text').textContent = `${appState.score}/${total}`;
    document.getElementById('accuracy-text').textContent = `${percent}%`;

    // Feedback message
    const feedback = document.getElementById('result-feedback');
    if (percent === 100) feedback.textContent = "Flawless Execution!";
    else if (percent >= 80) feedback.textContent = "Excellent Performance!";
    else if (percent >= 50) feedback.textContent = "Assessment Passed.";
    else feedback.textContent = "Assessment Failed. Require Optimization.";

    // Animate Circle
    const circle = document.getElementById('score-circle-path');
    circle.style.strokeDasharray = `${percent}, 100`;
    
    if (percent < 50) circle.style.stroke = "var(--danger)";
    else circle.style.stroke = "var(--neon-green)";

    // Send the results logically
    sendResultsToGoogleForm();
}

restartBtn.addEventListener('click', () => {
    // Reset inputs and go back to start
    form.reset();
    switchView('auth');
    document.getElementById('score-circle-path').style.strokeDasharray = `0, 100`;
});

// Leaderboard Logic
if (viewLeaderboardBtn) {
    viewLeaderboardBtn.addEventListener('click', () => {
        switchView('leaderboard');
        fetchLeaderboard();
    });
}

if (backToResultsBtn) {
    backToResultsBtn.addEventListener('click', () => {
        switchView('result');
    });
}

async function fetchLeaderboard() {
    if (!leaderboardBody) return;
    leaderboardBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Fetching data from uplink... <span class="spinner"></span></td></tr>';
    
    const sheetCsvUrl = "https://docs.google.com/spreadsheets/d/1xFSjhb-PTwfmFuWJ6RkS2oOxMoN43cev1Ehr1CylZ9s/gviz/tq?tqx=out:csv";

    try {
        const response = await fetch(sheetCsvUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const text = await response.text();
        
        const rows = text.split('\\n').filter(row => row.trim().length > 0);
        rows.shift(); // Remove header

        let parsedData = rows.map(row => {
            const columns = row.split(',').map(item => item.replace(/(^"|"$)/g, '').trim());
            let scoreValue = 0;
            if (columns[4]) {
                const parts = columns[4].split('/');
                scoreValue = parseInt(parts[0], 10) || 0;
            }
            return {
                name: columns[1] || 'Unknown',
                course: columns[3] || '-',
                scoreStr: columns[4] || '0/30',
                scoreVal: scoreValue
            };
        });

        parsedData.sort((a, b) => b.scoreVal - a.scoreVal);

        leaderboardBody.innerHTML = '';
        if (parsedData.length === 0) {
            leaderboardBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No records found.</td></tr>';
            return;
        }

        parsedData.forEach((data, idx) => {
            const tr = document.createElement('tr');
            if (idx === 0) tr.classList.add('rank-1');
            else if (idx === 1) tr.classList.add('rank-2');
            else if (idx === 2) tr.classList.add('rank-3');

            tr.innerHTML = `
                <td>#${idx + 1}</td>
                <td>${data.name}</td>
                <td>${data.course}</td>
                <td>${data.scoreStr}</td>
            `;
            leaderboardBody.appendChild(tr);
        });
    } catch (err) {
        console.error("Error fetching leaderboard: ", err);
        leaderboardBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color: var(--danger);">Failed to connect to global network.</td></tr>';
    }
}
