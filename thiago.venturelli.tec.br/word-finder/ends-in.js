const EndsIn = {
    input: document.getElementById("endsIn"),
    output: document.getElementById("endsInOutput"),

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
            if (WordManager.normalize(word).endsWith(searchValue)) {
                matchWords.push(word);
            }
        }
        
        output(this.output, matchWords);
    },

    populateLinks: function() {
        const endsInFast = document.getElementById("endsInFast");
        for (let char of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')) {
            endsInFast.innerHTML += `<a class="a" onclick="EndsIn.searchFor('${char}')">${char}</a> `;
            
        }
    }
}

document.addEventListener("DOMContentLoaded", function() { 
    EndsIn.populateLinks();
    EndsIn.input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            EndsIn.search();
        }
    });
});