const output = function(div, matchWords) {
    // loading simulates to user knows that result will change
    div.innerHTML = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;
    
    let html = '';
    if (matchWords && matchWords.length) {
        html = `<div class='row'>`;
        for (word of matchWords) {
            html += `<div class="col-4"><a href="https://dicionario.priberam.org/${word}" target="_blank">${word}</a></div>`;
        }
        html += `</div>`;
    } else {
        html = "Nenhuma palavra encontrada";
    }
    setTimeout(() => {
        div.innerHTML = html;
    }, 120);
    
}