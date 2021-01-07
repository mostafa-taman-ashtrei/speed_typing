const quoteDisplay = document.getElementById('quoteDisplay');
const quoteInput= document.getElementById('quoteInput');
const btn = document.getElementById('next');
const cl = document.getElementById('correctLetters');
const icl = document.getElementById('incorrectLetters');


const getQuote = () => {
    return fetch('http://api.quotable.io/random')
    .then(res => res.json())
    .then(res => res.content.toLowerCase());
}

const renderQuote = async () => {
    const quote = await getQuote();
    quoteDisplay.innerHTML = '';

    quote.split('').forEach(c => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = c;
        quoteDisplay.appendChild(characterSpan);
    });
    quoteInput.value = null;
}

const handleInput = () => {
    const arrayQuote = quoteDisplay.querySelectorAll('span');
    const arrayValue = quoteInput.value.split('');
    let end = 0
    let correctLetters = 0
    let incorrectLetters = 0


    arrayQuote.forEach((char_span, index) => {
        const char = arrayValue[index];
        end ++

        if (char == null) {
            char_span.classList.remove('correct');
            char_span.classList.remove('incorrect');

        } else if (char === char_span.innerText){
            char_span.classList.add('correct');
            char_span.classList.remove('incorrect');
            correctLetters ++
        } else {
            char_span.classList.remove('correct');
            char_span.classList.add('incorrect');
            incorrectLetters ++
        }

    });

    if(end === arrayValue.length) renderQuote();

    cl.innerHTML = `You got ${correctLetters} characters right`;
    icl.innerHTML = `You got ${incorrectLetters} characters wrong`;
};

const init = () => {
    btn.addEventListener('click', renderQuote);
    quoteInput.addEventListener('input', handleInput);
    renderQuote();
};

init();






