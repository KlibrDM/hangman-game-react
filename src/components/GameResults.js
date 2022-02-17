export default function GameResults(props) {
  if(props.display === true){
    //Set the title message based on results
    //Assuming that the player lost
    let resultsMessage = (
      <>
        <h2>Ohh no!</h2>
        <h2>You lost!</h2>
      </>
    );

    //If player won, change message
    if(props.results === "win"){
      resultsMessage = (
        <>
          <h2>Congratulations!</h2>
          <h2>You won!</h2>
        </>
      );
    }
    
    return (
      <div id="game-result">
        {resultsMessage}
        <p>The word was: {props.word}</p>
        <p>You had {(6 - props.livesLeft)} mistake(s)</p>
        <button id="play-again-button" onClick={() => props.passedFunction()}>Play again</button>
      </div>
    );
  }
  //Don't return anything if results screeen is not shown
  else{
    return (<></>);
  }
}