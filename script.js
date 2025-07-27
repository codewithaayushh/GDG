const display = document.getElementById('display');
const buttonContainer = document.getElementById('buttonContainer');
const themeToggle = document.getElementById('themeToggle');
const modeLabel = document.getElementById('modeLabel');
const historyBtn = document.getElementById('historyBtn');
const historyPanel = document.getElementById('historyPanel');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');

let history = [];

const buttons = [
  'Rad', 'Deg', 'Inv', 'sin', 'cos',
  'tan', '√', 'ln', 'log', 'π',
  'xʸ', 'x!', 'EXP', 'e', '%',
  'log₂', 'g', 'AC', 'DEL', 'Ans',
  '(', ')', '/', '*', '-',
  '7', '8', '9', '+', '=',
  '4', '5', '6', '.', '±',
  '1', '2', '3', '0', ''
];

function renderButtons() {
  buttonContainer.innerHTML = '';
  buttons.forEach(label => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.disabled = label === '';
    btn.addEventListener('click', () => handleButtonClick(label));
    buttonContainer.appendChild(btn);
  });
}

function handleButtonClick(value) {
  switch (value) {
    case 'AC': display.value = ''; break;
    case 'DEL': display.value = display.value.slice(0, -1); break;
    case '=':
      try {
        const result = eval(replaceConstants(display.value));
        addToHistory(`${display.value} = ${result}`);
        display.value = result;
      } catch { display.value = 'Error'; }
      break;
    case 'π': display.value += Math.PI.toFixed(8); break;
    case 'e': display.value += Math.E.toFixed(8); break;
    case '√': display.value = Math.sqrt(parseFloat(display.value)); break;
    case 'x!': display.value = factorial(parseInt(display.value)); break;
    case 'Ans': display.value += history.length ? history.at(-1).split('=')[1].trim() : ''; break;
    case 'sin': display.value = Math.sin(toRadians(display.value)); break;
    case 'cos': display.value = Math.cos(toRadians(display.value)); break;
    case 'tan': display.value = Math.tan(toRadians(display.value)); break;
    case 'ln': display.value = Math.log(display.value); break;
    case 'log': display.value = Math.log10(display.value); break;
    case 'log₂': display.value = Math.log2(display.value); break;
    case 'xʸ': display.value += '**'; break;
    case 'EXP': display.value += 'e+'; break;
    case '±': display.value = parseFloat(display.value) * -1; break;
    default: display.value += value;
  }
}

function replaceConstants(str) {
  return str.replace(/π/g, Math.PI).replace(/e/g, Math.E);
}

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

function addToHistory(entry) {
  history.push(entry);
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.appendChild(li);
}

// ✅ Light/Dark toggle with label change
themeToggle.addEventListener('change', () => {
  const isLight = themeToggle.checked;
  document.body.classList.toggle('light', isLight);
  modeLabel.childNodes[2].textContent = isLight ? 'Dark Mode' : 'Light Mode';
});

// History toggle
historyBtn.addEventListener('click', () => {
  historyPanel.style.display = historyPanel.style.display === 'block' ? 'none' : 'block';
});

// Clear history
clearHistoryBtn.addEventListener('click', () => {
  history = [];
  historyList.innerHTML = '';
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const allowed = '0123456789+-*/().%';
  if (allowed.includes(e.key)) display.value += e.key;
  if (e.key === 'Enter') handleButtonClick('=');
  if (e.key === 'Backspace') display.value = display.value.slice(0, -1);
});

// Init
renderButtons();
modeLabel.childNodes[2].textContent = themeToggle.checked ? 'Dark Mode' : 'Light Mode';
