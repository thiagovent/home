const WithLetter = {
    input: document.getElementById("withLetters"),
    output: document.getElementById("withLettersOutput"),

    search: function() {
        var searchValue = WordManager.normalize(this.input.value).trim();
        
        if (!searchValue) {
            alert("Digite algo para buscar");
            return;
        }
        
        this.searchFor(searchValue);
    },

    searchFor: function(searchValue) {
        searchValue = searchValue.toLowerCase();

        const letters = [];
        for (const l of searchValue) {
            if (letters[l]) {
                letters[l]++;
            } else {
                letters[l] = 1;
            }
        }

        let matchWords = [];
        for (word of WordManager.validWords) {
            const w = WordManager.normalize(word);
            let valid = true;

            for (const l in letters) {
                let index = -1;
                for (let i = letters[l]; i > 0; i--) {
                    index = w.indexOf(l, index);
                    if (index < 0) {
                        valid = false;
                        break;
                    }
                    index++;
                }
                if (!valid) {
                    break;
                }
            }
            if (valid) {
                matchWords.push(word);
            }
        }
        
        output(this.output, matchWords);
    },

    
}

document.addEventListener("DOMContentLoaded", function(event) { 
    WithLetter.input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            WithLetter.search();
        }
    });
});