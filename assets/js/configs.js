const WORDS = [
    { "word": "abobora", "tip": "Vegetal laranja muito usado no Halloween" },
    { "word": "bicicleta", "tip": "Veículo de duas rodas movido por pedal" },
    { "word": "cachorro", "tip": "Melhor amigo do homem" },
    { "word": "dinossauro", "tip": "Gigantesco animal pré-histórico" },
    { "word": "elefante", "tip": "Grande mamífero com tromba" },
    { "word": "floresta", "tip": "Lugar com muitas árvores" },
    { "word": "girassol", "tip": "Flor que segue o movimento do sol" },
    { "word": "igreja", "tip": "Local de culto religioso" },
    { "word": "jacare", "tip": "Réptil que vive em rios e pântanos" },
    { "word": "kiwi", "tip": "Fruta marrom por fora e verde por dentro" },
    { "word": "lagosta", "tip": "Crustáceo marinho apreciado na culinária" },
    { "word": "melancia", "tip": "Fruta grande com casca verde e polpa vermelha" },
    { "word": "navio", "tip": "Grande embarcação usada para transporte" },
    { "word": "papagaio", "tip": "Ave conhecida por imitar sons" },
    { "word": "quintal", "tip": "Área aberta na parte de trás da casa" },
    { "word": "rato", "tip": "Pequeno roedor" },
    { "word": "sapato", "tip": "Calçado que cobre os pés" },
    { "word": "tartaruga", "tip": "Animal com casco duro nas costas" },
    { "word": "urubu", "tip": "Ave que se alimenta de carniça" },
    { "word": "violino", "tip": "Instrumento musical de cordas" },
    { "word": "xilofone", "tip": "Instrumento musical de percussão com teclas" },
    { "word": "zebra", "tip": "Animal listrado da savana" },
    { "word": "abacaxi", "tip": "Fruta tropical com casca espinhosa" },
    { "word": "balde", "tip": "Recipiente usado para carregar líquidos" },
    { "word": "coruja", "tip": "Ave noturna de olhos grandes" },
    { "word": "esquilo", "tip": "Pequeno roedor que adora nozes" },
    { "word": "foguete", "tip": "Veículo que vai ao espaço" },
    { "word": "guitarra", "tip": "Instrumento musical com cordas elétrico" },
    { "word": "ilha", "tip": "Porção de terra cercada por água" },
    { "word": "jiboia", "tip": "Serpente que mata por constrição" },
    { "word": "ketchup", "tip": "Molho vermelho usado em hambúrgueres" },
    { "word": "lua", "tip": "Satélite natural da Terra" },
    { "word": "morcego", "tip": "Único mamífero que pode voar" },
    { "word": "neve", "tip": "Precipitação de cristais de gelo" },
    { "word": "ocelote", "tip": "Felino selvagem encontrado nas Américas" },
    { "word": "polvo", "tip": "Animal marinho com oito tentáculos" },
    { "word": "queijo", "tip": "Alimento derivado do leite" },
    { "word": "rinoceronte", "tip": "Grande mamífero com um ou dois chifres" },
    { "word": "salto", "tip": "Ação de pular" },
    { "word": "tapioca", "tip": "Alimento feito com fécula de mandioca" },
    { "word": "ventilador", "tip": "Aparelho usado para circular o ar" },
    { "word": "xadrez", "tip": "Jogo de tabuleiro com peças brancas e pretas" },
    { "word": "amendoim", "tip": "Semente oleaginosa popular em festas juninas" },
    { "word": "borboleta", "tip": "Inseto com asas coloridas" },
    { "word": "cacto", "tip": "Planta espinhosa do deserto" },
    { "word": "escultura", "tip": "Arte de modelar materiais" },
    { "word": "fantasia", "tip": "Roupas usadas em festas temáticas" },
    { "word": "geada", "tip": "Camada de gelo que se forma sobre as superfícies" },
    { "word": "harpa", "tip": "Instrumento musical de cordas" },
    { "word": "igreja", "tip": "Edifício destinado ao culto religioso" },
    { "word": "jabuticaba", "tip": "Fruta pequena e preta típica do Brasil" },
  ];  


let ATTEMPTS = 3;
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
    const divLetterContainer = createDivLetterContainer();
    
    if (randomWord) {
        // const word = get_random_word();
        const word = WORDS[34];
        currentWord = word['word'];
        currentTip = word['tip']; 
    }

    totalWords.textContent = currentTip;

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
    return currentWord.toLocaleUpperCase() === userWord.toLocaleUpperCase();
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

        if (letter === correctLetter) {
            input.classList.add('right');
            usedLetterCounts[letter] = (usedLetterCounts[letter] || 0) + 1;
        } else if (wordArray.includes(letter)) {
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

function check_game(inputs, currentWord) {
    if (compare_words(inputs, currentWord)) {
        alert('Parabéns!!\nVocê adivinhou a palavra!');
        location.reload();
    } else {
        if (ATTEMPTS > 0) {
            ATTEMPTS--;
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

(() => { create_inputs(true) })()