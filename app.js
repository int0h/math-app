/**
 * Generates random int from min to max INCLUDING (min and max values)
 * @param {number} min
 * @param {number} max
 */
function rnd(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function generate() {
    const sum = rnd(2, 10);
    const a = rnd(1, sum - 1);
    const b = sum - a;
    const action = '+';
    // const action = Math.random() > 0.5 ? '+' : '-';
    return {a, b, sum, action};
}

let currentEq = {
    a: 0,
    b: 0,
    sum: 0,
    action: '+',
};

/** @type {Record<string, HTMLDivElement>} */
const dom = {
    left: document.querySelector('#eq-left'),
    status: document.querySelector('.status'),
    buttons: document.querySelector('.buttons'),
    streak: document.querySelector('.streak'),
    right: document.querySelector('.right'),
    wrong: document.querySelector('.wrong'),
};

function check(guess) {
    const correct = currentEq.action === '+'
        ? currentEq.sum === guess
        : currentEq.b === guess;
    if (correct) {
        score.right++;
        score.streak++;
        updateScore();
        updateStatus('🎉');
        setupEq(generate());
        dom.right.value = '';
    } else {
        score.wrong++;
        score.streak = 0;
        updateScore();
        updateStatus('😡');
    }
}

function setupEq(eq) {
    currentEq = eq;
    dom.left.textContent = currentEq.action === '+'
        ? `${eq.a} + ${eq.b} = ?`
        : `${eq.sum} - ${eq.a} = ?`;
}

function updateStatus(emoji) {
    dom.status.textContent = emoji;
    dom.status.style.transition = '';
    dom.status.style.opacity = '1';
    setTimeout(() => {
        dom.status.style.opacity = '0';
        dom.status.style.transition = 'ease-out 2s opacity';
    }, 1);
}

function genButtons() {
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.onclick = () => {
            check(i);
        };
        dom.buttons.appendChild(btn);
    }
}

let score = {streak: 0, right: 0, wrong: 0};
const saved = localStorage.getItem('score');
if (saved) {
    score = JSON.parse(saved);
    score.right = score.right || 0;
    score.wrong = score.wrong || 0;
    score.streak = score.streak || 0;
} else {
    localStorage.setItem('score', JSON.stringify(score));
}

function updateScore() {
    localStorage.setItem('score', JSON.stringify(score));
    dom.streak.textContent = `Streak: ${score.streak}`;
    dom.right.textContent = `Right: ${score.right}`;
    dom.wrong.textContent = `Wrong: ${score.wrong}`;
}

updateScore();

genButtons();

setupEq(generate());
