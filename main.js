document.addEventListener("DOMContentLoaded", () => {
    createTiles();
    let guessedWords = [[]];
    let availableSpace = 1;
    let word = 'doggy';
    let guessedWordCount = 0;
    // Letter Input



    function getCurrentWordArr() {
        const numGuessedWords = guessedWords.length;
        return guessedWords[numGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceTile = document.getElementById(availableSpace);
            availableSpace = availableSpace + 1; 
            availableSpaceTile.textContent = letter;
        }
    
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(58, 58, 60)";
        }

        const letterInPos = word.charAt(index)
        const isCorrectPos = (letter === letterInPos);

        if (isCorrectPos) {
            return  "rgb(83, 141, 78)";
        }

        return "rgb(181, 159, 59)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5) {
            window.alert("Word Must Be 5 Letters");
            return;
        }

        const currentWord = currentWordArr.join('');


        const firstLetterID = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
            const tileColor = getTileColor(letter, index);
            const letterID = firstLetterID + index;
            const letterTile = document.getElementById(letterID);
            letterTile.classList.add("animate__bounceIn");
            letterTile.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
        });

        guessedWordCount += 1;

        if (currentWord === word) {
            window.alert("Correct");
            document.removeEventListener("keydown");
        }

        if(guessedWords.length === 6) {
            window.alert('sorry you lost');
            document.removeEventListener("keydown");
        }

        guessedWords.push([]);
    }

    // Creates the tile
    function createTiles() {
        const gameBoard = document.getElementById("board");

        for (let i=0;i<30;i++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.classList.add("animate__animated");
            tile.setAttribute("id", i+1);
            gameBoard.appendChild(tile);
        }
    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr()
        const removedLetter = currentWordArr.pop();
        
        guessedWords[guessedWords.length - 1] = currentWordArr;

        const lastLetterTile = document.getElementById(String(availableSpace - 1))
        
        lastLetterTile.textContent = '';
        availableSpace = availableSpace - 1;
        console.log("av space:", availableSpace);
        console.log("guessword.len", guessedWords.length);
    }

    
    document.addEventListener("keydown", (event) => {
        var key = event.key;
        // .keyCode depreciated, find a better way, maybe regex.
        var code = event.keyCode;

        if (key === 'Enter'){
            handleSubmitWord();
            return;
        }

        if (key === 'Backspace'){
            if (availableSpace > (guessedWords.length - 1) * 5 + 1){
            handleDeleteLetter();
            //return;
            //}
            return;
            }
        }
        //console.log(key);
        //console.log(code);
        if (code >= 65 && code <= 90 ) {
        updateGuessedWords(key);
        }
        
    });
});