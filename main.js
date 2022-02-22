document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("stateAlert").style.visibility = "hidden";
    
    let word = 'pikachu';
    getImg();
    createTiles();
    let guessedWords = [[]];
    let availableSpace = 1;
    
    console.log(word.length);
    let guessedWordCount = 0;
    // Letter Input



    function getImg(){
        imgDiv = document.getElementById("pokeimg");
        pokeImg = document.createElement("img");
        pokeImg.setAttribute("id", "imgfile");
        pokeImg.src = 'https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png';

        imgDiv.appendChild(pokeImg);
    }

    function getCurrentWordArr() {
        const numGuessedWords = guessedWords.length;
        return guessedWords[numGuessedWords - 1];
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr && currentWordArr.length < word.length) {
            currentWordArr.push(letter);

            const availableSpaceTile = document.getElementById(availableSpace);
            availableSpace = availableSpace + 1; 
            availableSpaceTile.textContent = letter;
        }
    
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "rgba(255, 255, 255, 0.8)";
        }

        const letterInPos = word.charAt(index)
        const isCorrectPos = (letter === letterInPos);

        if (isCorrectPos) {
            return  "rgba(83, 141, 78, 0.8)";
        }

        return "rgba(181, 159, 59, 0.8)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        const firstLetterID = guessedWordCount * word.length + 1;
        const interval = 200;
        if (currentWordArr.length !== word.length) {
            startTile = (guessedWords.length - 1) * word.length + 1
            for (let i=startTile;i < startTile + word.length;i++) {
                const letterTile = document.getElementById(i);
                letterTile.classList.add("animate__shakeX");
                setTimeout(() => { letterTile.classList.remove("animate__shakeX"); }, 700);      
            }
            

            popUpAnim(`word must be ${word.length} letters long`, false);
            

            console.log(startTile);
            //window.alert("Word Must Be 5 Letters");
            return;
        }



        const currentWord = currentWordArr.join('');

        
        
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
            //window.alert("Correct");
            popUpAnim('You Won!', true);
            document.removeEventListener("keydown");
        }

        if(guessedWords.length === 6) {
            //window.alert('sorry you lost');
            popUpAnim('You Lost!', true);
            document.removeEventListener("keydown");
        }

        guessedWords.push([]);
    }

    function popUpAnim(text, hasWonLost) {
        const alertBox = document.getElementById("stateAlert");
            
        alertBox.style.visibility = "visible";
        
        alertBox.textContent = text;
        alertBox.classList.add("animate__bounceIn");
        if (!hasWonLost) {
        setTimeout(() => {
            alertBox.classList.remove("animate__bounceIn");
            alertBox.classList.add("animate__bounceOut");
            setTimeout(() => {
                alertBox.classList.remove("animate__bounceOut");
                
                alertBox.style.visibility = "hidden";
            }, 500);
            
        }, 1000);
    }
    }

    // Creates the tile
    function createTiles() {
        const gameBoard = document.getElementById("board");
        gameBoard.setAttribute("style", `grid-template-columns: repeat(${word.length}, 1fr);`);
        for (let i=0;i<word.length * 6;i++) {
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
            if (availableSpace > (guessedWords.length - 1) * word.length + 1){
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