const words = [
    "paçoca",
    "bolo",
    "molhadinho",
    "brigadeiro",
    "polar",
    "oculos",
    "contrabaixo",
    "guitarra",
    "violao",
    "viagem",
    "anime",
    "vilarejo",
    "casca",
    "bala"
];

let userWord = [];
let currentWord = null;
let currentDiv = null;

function generate_div_id() {
    return Math.random().toString(16).slice(2);
}

function get_random_word() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
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


function create_inputs() {
    const inputContainer = document.getElementById("input_container");
    const totalWords = document.getElementById("total_words");
    const divLetterContainer = createDivLetterContainer();
    
    currentWord = get_random_word()

    totalWords.textContent = currentWord.length;

    for (let i = 0; i < currentWord.length; i++) {
        const input = create_input();
        divLetterContainer.appendChild(input)
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

function getInputsValue(div) {
     const word = [];
     const inputs = div.querySelectorAll('input');

     inputs.forEach(input => {
        word.push(input.value);
     });

     return word;
}

function check_same_word(currentWord, userWord) {
    return currentWord.toLowerCase() === userWord.toLowerCase();
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


function add_color_reference(div, wordFound) {
    const inputs = div.querySelectorAll('input');
    const wordArray = Array.from(wordFound);

    inputs.forEach((input, index) => {
        const letter = input.value;
        const correctLetter = wordArray[index];

        if (letter === correctLetter) {
            input.classList.add('right');
        } else if (wordArray.includes(letter)) {
            input.classList.add('almost');
        } else {
            input.classList.add('wrong');
        }
    });
}

function check() {
    block_inputs(currentDiv);
    console.log('WORD: ', currentWord)
    
    add_color_reference(currentDiv, currentWord);
}

(() => { create_inputs() })()