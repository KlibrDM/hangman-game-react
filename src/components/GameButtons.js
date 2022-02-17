import React, { useState, useEffect } from 'react';
import { LetterListRow } from './config';

export default function GameButtons(props) {
  //A string that contains the letter of each button pressed
  const [disabledButtons, setDisabledButtons] = useState('');

  function disableButton(letter){
    //Concatenate letter to the string
    setDisabledButtons(disabledButtons + letter);
  }

  useEffect(() => {
    if(props.allDisabled){
      setDisabledButtons("QWERTYUIOPASDFGHJKLZXCVBNM");
    }
    else{
      setDisabledButtons("");
    }
  }, [props.allDisabled]);

  return (
    <div id="game-buttons">

      {/*Iterate through each row*/}
      {LetterListRow.map((row, index) => (
        <div id={"game-buttons-row-" + index} key={index}>

          {/*Iterate through each letter*/}
          {row.map((letter, index) => (
            <button 
            disabled={(disabledButtons.includes(letter))} 
            className="letter-button" 
            id={"letter-button_" + letter} 
            key={index} 
            onClick={() => {
              props.passedFunction(letter); 
              disableButton(letter);
            }}>
              {letter}
            </button>
          ))}

        </div>
      ))}

    </div>
  );
}