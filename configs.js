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



function generate_div_id() {
    return Math.random().toString(16).slice(2);
}

function get_random_word() {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
}

function create_input() {
    const input = document.createElement("input");

    input.type = "text";
    input.maxLength = 1;
    input.autocomplete = "off";
    input.id = "letter";
    input.classList.add("_letter");

    return input;
}

function createDivLetterContainer() {
    const div = document.createElement("div");
    div.classList.add("_letter_container");
    div.id = generate_div_id();
    return div;
}


function create_inputs(randomWord=false) {
    const inputContainer = document.getElementById("input_container");
    const totalWords = document.getElementById("about_word");
    const totalAttempts = document.getElementById("attempts");
    const divLetterContainer = createDivLetterContainer();
    
    if (randomWord) {
        const word = get_random_word();
        currentWord = word['word'];
        currentTip = word['tip']; 
    }

    totalWords.textContent = currentTip;
    totalAttempts.textContent = ATTEMPTS;

    for (let i = 0; i < currentWord.length; i++) {
        const input = create_input();
        divLetterContainer.appendChild(input);
    }

    inputContainer.appendChild(divLetterContainer);

    setWord(currentWord, divLetterContainer);
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


function setWord(word, div) {
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

function getAllIndexes(word, letter) {
    const indexes = [];
    for(let i = 0; i < word.length; i++)
        if (word[i] === letter)
            indexes.push(i);
    return indexes;
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
    const wordArray = Array.from(currentWord);

    const letterCounts = {};
    const usedLetterCounts = {};

    // Conta a frequência de cada letra na palavra
    wordArray.forEach(letter => {
        letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    });


    // Mantém o controle das letras já usadas pelo usuário
    inputs.forEach((input, index) => {
        const letter = input.value.toLowerCase();
        const correctLetter = wordArray[index];

        if (normalizeLetter(letter) === normalizeLetter(correctLetter)) {
            input.classList.add('right');
            usedLetterCounts[letter] = (usedLetterCounts[letter] || 0) + 1;
        } else if (wordArray.includes((letterIn) => normalizeLetter(letterIn) === normalizeLetter(letter))) {
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
        location.reload();
    } else {
        if (ATTEMPTS < 4) {
            ATTEMPTS++;
            create_inputs();
        }
        else {
            alert(`VOCÊ PERDEU!\nA palavra era ${currentWord}!`);
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

(async () => {
    WORDS = await loadJSON(); 
    create_inputs(true); 
})();