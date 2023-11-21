var Wordle = {

    wordsCount: () => document.getElementById("wordCountSelect").value,
    output: document.getElementById("wordsOutput"),

    words: function() {
        const words = [];
        
        for (let i = 1; ; i++) {
            const inputId = 'inputWord' + i;
            const field = document.getElementById(inputId);
            if (!field) {
                break;
            }
            const word = field.value.toLowerCase();
            if (word.length > 0) {
                words.push(WordManager.normalize(word));
            }
        }
        return words;
    },

    updateWordCount: function() {
        const values = Wordle.words();
        
        const wordInputsContainer = document.getElementById("wordInputs");
        wordInputsContainer.innerHTML = "";
        
        for (var i = 1; i <= Wordle.wordsCount(); i++) {
            var inputLabel = document.createElement("label");
            inputLabel.setAttribute("for", `inputWord${i}`);
            inputLabel.textContent = "# " + i + ":";
            
            var inputElement = document.createElement("input");
            inputElement.classList.add("wordinput", "form-control");
            inputElement.setAttribute("type", "text");
            inputElement.setAttribute("id", `inputWord${i}`);
            inputElement.setAttribute("oninput", `Wordle.updateSquares(${i})`);
            inputElement.maxLength=10;
            if (values[i-1]) {
                inputElement.value = values[i-1];
            }
                            
            var squaresContainer = document.createElement("div");
            squaresContainer.setAttribute("id", "squaresContainer" + i);
            
            var lineContainer = document.createElement("div");
            lineContainer.classList.add("line", "form-label");
            lineContainer.appendChild(inputLabel);
            lineContainer.appendChild(inputElement);
            lineContainer.appendChild(document.createElement("div")); // Espaço em branco
            lineContainer.appendChild(squaresContainer);
            
            wordInputsContainer.appendChild(lineContainer);
            
            this.updateSquares(i);
        }
        
    },

    updateSquares: function(index) {
        const inputId = `inputWord${index}`;
        const squaresContainerId = `squaresContainer${index}`;
        
        const input = document.getElementById(inputId).value.toLowerCase();
        
        const squaresContainer = document.getElementById(squaresContainerId);
        squaresContainer.innerHTML = '';
        
        let squares = 0;
        for (let i = 0; i < input.length && squares++ < 5; i++) {
            const square = document.createElement('div');
            square.classList.add('letter');
            square.setAttribute("onclick", `Wordle.changeQualifier(${index},${i})`);
            square.textContent = input[i];
            
            const next = (input.length == (i+1) ? '' : input[i+1]);
            
            if (next === '!') {
                square.classList.add('right');
                i++;
            } else if (next === '?') {
                square.classList.add('place');
                i++;
            } else {
                square.classList.add('wrong');
                
            }
            
            squaresContainer.appendChild(square);
        }
    },

    changeQualifier: function(index, position) {
        const inputId = `inputWord${index}`;
        const input = document.getElementById(inputId);

        let current = input.value[position+1];
        
        if (current == "!") {
            input.value = input.value.substring(0, position+1) + input.value.substring(position+2);
        } else if (current == "?") {
            input.value = input.value.substring(0, position+1) + "!" + input.value.substring(position+2);
        } else {
            input.value = input.value.substring(0, position+1) + "?" + input.value.substring(position+1);
        }

        this.updateSquares(index);
    },

    check: function(words, validWord) {
        for (let word of words) {
            let position = 0;
            for (let i = 0; i < word.length; i++) {
                if (word[i+1] == "!") {
                    if (validWord[position] != word[i]) {
                        return false;
                    }
                    i++;
                } else if (word[i+1] == "?") {
                    
                    if (validWord[position] == word[i]) {
                        console.debug(`${validWord} fails on position ${position} is not expected ${word[i]} because ${word[i]}`);
                        return false;
                    }
                    if (!validWord.includes(word[i])) {
                        console.debug(`${validWord} fails on position ${position} does not have ${word[i]} because ${word[i]}`);
                        return false;
                    }
                    let count = 0;
                    let index = -1;
                    while ((index = validWord.indexOf(word[i], index+1)) >= 0) {
                        count++;
                    }
                    
                    index = -1;
                    while ((index = word.indexOf(word[i], index+1)) >= 0) {
                        if (word[index+1] == '!' || word[index+1] == '?') {
                            count--;
                        }
                    }
                    
                    if (count < 0) {
                        console.debug(`${validWord} fails on position ${position} does not have as many ${word[i]} as expected in ${word}`);
                        return false;
                    }
                    
                    i++;
                } else {
                    let count = 0;
                    let index = -1;
                    
                    while ((index = validWord.indexOf(word[i], index+1)) >= 0) {
                        count++;
                    }
                    
                    index = -1;
                    while ((index = word.indexOf(word[i]+"?", index+1)) >= 0) {
                        count--;
                    }
                    
                    index = -1;
                    while ((index = word.indexOf(word[i]+"!", index+1)) >= 0) {
                        count--;
                    }
                    
                    if (count > 0) {
                        console.debug(`${validWord} fails on position ${position} has more ${word[i]} as expected in ${word}`);
                        return false;
                    }
                }
                position++;
            }
        }
        return true;
    }, 

    search: function() {
        const words = this.words();
        
        console.debug(`checking entries ${words.join(", ")}`);
        
        let matchWords = [];
        for (let validWord of WordManager.validWords) {
            if (this.check(words, WordManager.normalize(validWord))) {
                matchWords.push(validWord);
            }
        }
        
        output(this.output, matchWords);
    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    Wordle.updateWordCount();
});