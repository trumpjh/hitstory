
// 문제 데이터 (예시 문제.txt 기반)
const quizData = [
  {
    question: '1. 다음 그림을 보고 알맞지 않은 음운 구별 요소를 고르세요.<br><img src="images/01.png" alt="문제1 그림" style="max-width:180px; display:block; margin:16px auto;">',
    choices: [
      '곰, 솜 - 자음',
      '종, 공 - 자음',
      '돌, 돈 - 모음',
      '산, 선 - 모음',
      '밥, 법 - 모음'
    ],
    answer: 5
  },
  {
    question: '2. 다음 그림을 참고하여 국어의 음운에 대한 설명으로 적절하지 않은 것을 고르세요.<br><img src="images/02.png" alt="문제2 그림" style="max-width:180px; display:block; margin:16px auto;">',
    choices: [
      '음운의 종류에는 자음과 모음이 있다.',
      '말의 뜻을 구별해 주는 소리의 단위이다.',
      '모음은 공기가 그대로 흘러나오는 소리이다.',
      '자음은 모음 없이 홀로 소리 낼 수 있는 음운이다.',
      '음운에 따라 소리 낼 때의 느낌이 달라질 수 있다.'
    ],
    answer: 4
  },
  {
    question: '3. 말의 뜻을 구별해 주는 소리의 가장 작은 단위는?',
    choices: [
      '음운',
      '음절',
      '단어',
      '문장',
      '형태소'
    ],
    answer: 1
  },
  {
    question: "4. '돌'의 음운 중 하나를 골라 다른 음운으로 바꾼 단어가 아닌 것은?",
    choices: [
      '솔',
      '달',
      '덕',
      '돈',
      '독'
    ],
    answer: 3
  },
  {
    question: '5. 음운에 대한 설명으로 알맞지 않은 것은?',
    choices: [
      '단어의 음운을 바꾸어 쓰면 의미가 달라진다.',
      '우리말의 음운은 자음과 모음으로 이루어진다.',
      '자음은 공기가 방해를 받으며 나오는 소리이다.',
      '말의 뜻을 구별해 주는 소리의 가장 작은 단위이다.',
      '모음은 홀로 소리 낼 수 없어 자음을 만나야만 소리를 낼 수 있다.'
    ],
    answer: 5
  }
  ,
  // 추가 문제 1
  {
    question: '6. 단어에 사용된 음운의 개수가 잘못 연결된 것은?',
    choices: [
      '누나 - 4개',
      '까꿍 - 6개',
      '동생 - 6개',
      '외삼촌 - 7개',
      '할머니 - 7개'
    ],
    answer: 3
  },
  // 추가 문제 2
  {
    question: '2. 다음 중 국어의 자음에 대한 설명으로 적절하지 않은 것은?',
    choices: [
      '자음의 개수는 모두 19개이다.',
      '모음을 만나야 소리 낼 수 있다.',
      '공기가 방해를 받으며 나오는 소리이다.',
      '입안의 공명 현상을 거쳐서 나온다는 특징이 있다.',
      '말의 뜻을 구별해 주는 소리의 가장 작은 단위에 속한다.'
    ],
    answer: 4
  }
];

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
