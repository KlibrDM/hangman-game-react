export default function GameImage(props) {
  return (
    <div id="game-hangman-image-box">
      <img id="game-hangman-image" src={require("../images/hangman"+(6-props.livesLeft)+".png")} alt={"Hangman: "+props.livesLeft+" lives left"}/>
    </div>
  );
}