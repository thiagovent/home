var ThemeManager = {
    themes: {
        'wordle': {
            default: '#fff',
            right: '#fff',
            wrong: 'gray',
            place: '#c9b458',
            rightBackground: '#6aaa64'
        },
        'term': {
            default: '#fff',
            right: '#fff',
            wrong: '#312a2c',
            place: '#d3ad69',
            rightBackground: '#3aa394'
        },
        'dito': {
            default: '#fff',
            right: '#000',
            wrong: '#9da3ae',
            place: '#84add4',
            rightBackground: '#d7f24c'
        }
    },

    updateColors: function () {
        var theme = document.getElementById("colors").value;
        var selectedTheme = this.themes[theme];

        document.documentElement.style.setProperty("--letter-color", selectedTheme.default);
        document.documentElement.style.setProperty("--right-foreground", selectedTheme.right);
        document.documentElement.style.setProperty("--wrong-background", selectedTheme.wrong);
        document.documentElement.style.setProperty("--place-background", selectedTheme.place);
        document.documentElement.style.setProperty("--right-background", selectedTheme.rightBackground);
    }
};
ThemeManager.updateColors();