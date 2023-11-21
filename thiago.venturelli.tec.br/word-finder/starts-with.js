const StartsWith = {
    input: document.getElementById("startsWith"),
    output: document.getElementById("startsWithOutput"),

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

        var matchWords = [];
        for (word of WordManager.validWords) {
            if (WordManager.normalize(word).startsWith(searchValue)) {
                matchWords.push(word);
            }
        }
        
        output(this.output, matchWords);
    },
    populateLinks: function() {
        const startsWithFast = document.getElementById("startsWithFast");
        for (let char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')) {
            startsWithFast.innerHTML += `<a class="a" onclick="StartsWith.searchFor('${char}')">${char}</a> `;
        }
    
    }
        
}

document.addEventListener("DOMContentLoaded", function(event) { 
    StartsWith.populateLinks();

    StartsWith.input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            StartsWith.search();
        }
    });
});