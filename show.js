let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const submitBtn = document.getElementById('submit-btn');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');

function loadQuiz() {
  const quiz = quizData[currentQuiz];
  questionEl.textContent = quiz.question;
  choicesEl.innerHTML = '';
  quiz.choices.forEach((choice, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <label>
        <input type="radio" name="choice" value="${idx + 1}">
        ${choice}
      </label>
    `;
    choicesEl.appendChild(li);
  });
  resultEl.textContent = '';
  submitBtn.disabled = false;
}

function showScore() {
  scoreEl.textContent = `점수: ${score} / ${quizData.length}`;
}

submitBtn.addEventListener('click', () => {
  const selected = document.querySelector('input[name="choice"]:checked');
  if (!selected) {
    resultEl.textContent = '정답을 선택하세요!';
    return;
  }
  const answer = parseInt(selected.value);
  if (answer === quizData[currentQuiz].answer) {
    resultEl.textContent = '정답입니다!';
    score++;
  } else {
    resultEl.textContent = `오답입니다. 정답: ${quizData[currentQuiz].answer}번`;
  }
  submitBtn.disabled = true;
  showScore();
  setTimeout(() => {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      questionEl.textContent = '퀴즈가 끝났습니다!';
      choicesEl.innerHTML = '';
      submitBtn.style.display = 'none';
      resultEl.textContent = `최종 점수: ${score} / ${quizData.length}`;
    }
  }, 1200);
});

// 초기화
window.onload = function() {
  loadQuiz();
  showScore();
};