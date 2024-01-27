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
    right: document.querySelector('#eq-right'),
    btn: document.querySelector('#ok-btn'),
    status: document.querySelector('.status'),
};

dom.btn.onclick = () => {
    const guess = Number(dom.right.value.trim());
    check(guess);
};

function check(guess) {
    const correct = currentEq.action === '+'
        ? currentEq.sum === guess
        : currentEq.b === guess;
    if (correct) {
        updateStatus('🎉');
        setupEq(generate());
        dom.right.value = '';
    } else {
        updateStatus('😡');
    }
}

function setupEq(eq) {
    currentEq = eq;
    dom.left.textContent = currentEq.action === '+'
        ? `${eq.a} + ${eq.b} =`
        : `${eq.sum} - ${eq.a} =`;
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

setupEq(generate());
