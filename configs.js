async function loadJSON() {
    const response = await fetch('WORDS.json');
    const data = await response.json();
    return data;
}



let WORDS = null;
let ATTEMPTS = 1;
let currentWord = null;
let currentTip = null;
let currentDiv = null;



function generateDivId() {
    return Math.random().toString(16).slice(2);
}

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS.splice(randomIndex, 1).pop();
}

function createInput() {
    const input = document.createElement("input");

    input.id = "letter";
    input.type = "text";
    input.maxLength = 1;
    input.autocomplete = "off";
    input.classList.add("_letter");

    return input;
}

function createDivLetterContainer() {
    const div = document.createElement("div");
    div.classList.add("_letter_container");
    div.id = generateDivId();
    return div;
}


function startGame(randomWord=false) {
    const inputContainer = document.getElementById("input_container");
    const totalWords = document.getElementById("about_word");
    const totalAttempts = document.getElementById("attempts");
    const divLetterContainer = createDivLetterContainer();
    
    if (randomWord) {
        const word = getRandomWord();
        currentWord = word['word'];
        currentTip = word['tip'];
        ATTEMPTS = 1;
    }

    totalWords.textContent = currentTip;
    totalAttempts.textContent = ATTEMPTS;

    for (let i = 0; i < currentWord.length; i++) {
        const input = createInput();
        divLetterContainer.appendChild(input);
    }

    inputContainer.appendChild(divLetterContainer);

    setDiv(divLetterContainer);
}


function addNextInputEvent(div) {
    const btn_check = document.getElementById('check_word');
    const inputs = div.querySelectorAll('input');

    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === input.maxLength) {
                const nextInput = inputs[index + 1];
                if (nextInput) {
                    // input.disabled = true;
                    nextInput.focus();
                }
            }

            if (inputs.length - 1 === index) {
                // input.disabled = true;
                btn_check.focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value === '') {
                const prevInput = inputs[index - 1];
                if (prevInput) {
                    prevInput.focus();
                }
            }
        });
    });
}


function setDiv(div) {
    currentDiv = div;
    addNextInputEvent(div);
}

function getInputedWord(inputs) {
     const word = [];
     inputs.forEach(input => {
        word.push(input.value);
     });

     return word.join("");
}


function block_inputs(div) {
    div.querySelectorAll('input').forEach(input => {
        input.disabled = true;
    });
}


function compare_words(inputs, currentWord) {
    const userWord = getInputedWord(inputs);
    return normalizeLetter(currentWord.toLocaleUpperCase()) === normalizeLetter(userWord.toLocaleUpperCase());
}

function add_color_reference(inputs, currentWord) {
    const letterCounts = {};
    const usedLetterCounts = {};
    let wordArray = Array.from(currentWord);
    
    
    // Conta a frequência de cada letra na palavra
    wordArray = wordArray.map(letter => {
        letter = normalizeLetter(letter)
        letterCounts[letter] = (letterCounts[letter] || 0) + 1;

        return letter;
    });

    inputs.forEach((input, index) => {
        const letter = normalizeLetter(input.value.toLowerCase());
        const correctLetter = normalizeLetter(wordArray[index]);

        if (letter === correctLetter) {
            input.classList.add('right');
            usedLetterCounts[letter] = (usedLetterCounts[letter] || 0) + 1;
        } 
        else if (wordArray.includes(letter)) {
            usedLetterCounts[letter] = (usedLetterCounts[letter] || 0) + 1;
            
            if (usedLetterCounts[letter] > (letterCounts[letter] || 0)) {
                input.classList.add('wrong');
            } else {
                input.classList.add('almost');
            }
        } else {
            input.classList.add('wrong');
        }
    });
}

function normalizeLetter(letter) {
    return letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}


function check_game(inputs, currentWord) {
    if (compare_words(inputs, currentWord)) {
        alert('Parabéns!!\nVocê adivinhou a palavra!');
        clearScreen();
        startGame(true); 
    } else {
        if (ATTEMPTS < 4) {
            ATTEMPTS++;
            startGame();
        }
        else {
            alert(`VOCÊ PERDEU!`);
            location.reload();
        }
    }
}

function check() {
    const inputs = currentDiv.querySelectorAll('input');
    block_inputs(currentDiv);
    add_color_reference(inputs, currentWord);
    check_game(inputs, currentWord);
}

function clearScreen() {
    const container = document.getElementById("input_container");
    while(container.lastElementChild) {
        container.removeChild(container.lastElementChild);
    }
}

(async () => {
    WORDS = await loadJSON(); 
    startGame(true); 
})();