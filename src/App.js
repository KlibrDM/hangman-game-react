import React, { useState, useEffect } from 'react';
import { Words } from './components/config';
import GameButtons from './components/GameButtons';
import GameWord from './components/GameWord';
import GameResults from './components/GameResults';
import GameImage from './components/GameImage';

export default function App() {
  const [category, setCategory] = useState("");
  const [word, setWord] = useState("");
  const [wordShown, setWordShown] = useState([]);
  const [wordLength, setWordLength] = useState(999);
  const [livesLeft, setLivesLeft] = useState(6);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [results, setResults] = useState('lose');
  const [resultsShown, setResultsShown] = useState(false);

  //When component loads, set random category and words
  useEffect(() => {
    setNewWord();
  }, []);

  function setNewWord(){
    let categories = [];
    let wordList = [];

    //Parse the categories and add them to a list
    Object.keys(Words).forEach((category) => {
      categories.push(category);
    });

    //Choose random category
    let randomCategory = Math.floor((Math.random() * categories.length));
    let chosenCategory = categories[randomCategory];

    //Parse the words from the chosen category and add them into a list
    Words[chosenCategory].forEach((word) => {
      wordList.push(word);
    });

    //Choose random word
    let randomWord = Math.floor((Math.random() * wordList.length));
    let chosenWord = wordList[randomWord];

    //Set values
    setCategory(chosenCategory);
    setWord(chosenWord);

    //Set the word shown to the user (initially underscores[_])
    let tempWordShown = chosenWord.replace(/[a-zA-Z]/g, "_");
    tempWordShown = tempWordShown.split("");
    tempWordShown.forEach((letter, index) => {
      //Use &nbsp; (\u00A0) so HTML leaves empty space
      if(letter === " "){
        tempWordShown[index] = "\u00A0";
      }
    });
    setWordShown(tempWordShown);

    //Get length without spaces and special chars
    let tempWord = chosenWord;
    tempWord = tempWord.replace(/\s|-|&/g, "");
    setWordLength(tempWord.length);
  }

  //Check if the letter exists in the word
  //Called by pressing a letter button
  let checkLetter = (letter) => {
    if(!(word.toUpperCase()).includes(letter)){
        //If letter is not in the word, lose a life
        setLivesLeft(livesLeft - 1);
    }
    else{
        //If we have a match, look for the letter(s) 
        //And replace the underscore(_) with the corresponding letters
        let tempWordShown = wordShown;

        //We 100% have a first index otherwise we wouldn't have been in the else
        let indexesFound = 0;
        let lastIndex = 0;
        let index = (word.toUpperCase()).indexOf(letter, lastIndex);
        while(index !== -1){
            //Change the _ to the right letter
            tempWordShown[index] = letter;

            //Get next index
            indexesFound++;
            lastIndex = index + 1;
            index = (word.toUpperCase()).indexOf(letter, lastIndex);
        }

        //Increase correct guesses with the numeber of results found
        setCorrectGuesses(correctGuesses + indexesFound);

        //Set the new word shown to the user (with less _)
        setWordShown(tempWordShown);
    }
  }

  //Set everything to initial values and get a new word
  let resetGame = () => {
    setLivesLeft(6);
    setCorrectGuesses(0);
    setResultsShown(false);
    setNewWord();
  }

  //If correct guesses reaches the word length, player won
  useEffect(() => {
    if(correctGuesses === wordLength){
      setResults("win");
      setResultsShown(true);
    }
  }, [correctGuesses, wordLength]);

  //If player lives reaches 0, player lost
  useEffect(() => {
    if(livesLeft === 0){
      setResults("lose");
      setResultsShown(true);
    }
  }, [livesLeft]);

  return (
    <div className="App" id="app">
      <section id="play-area">
          {/*Paragraphs are too simple, no need to separate them into components*/}
          <h1 id="game-title">HANGMAN</h1>
          <p id="game-category">Category: {category}</p>
          <p id="game-length">Word length: {wordLength} letters</p>

          {/*Word Area*/}
          <GameWord word={wordShown}/>

          {/*Hangman Image*/}
          <GameImage livesLeft={livesLeft}/>

          <p id="game-lives">{livesLeft} lives left</p>

          {/*Buttons with the letters*/}
          <GameButtons passedFunction={checkLetter} allDisabled={resultsShown}/>

          {/*Results screen*/}
          <GameResults display={resultsShown} results={results} word={word} livesLeft={livesLeft} passedFunction={resetGame}/>
      </section>
    </div>
  );
}