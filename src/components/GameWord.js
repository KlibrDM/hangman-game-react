export default function GameWord(props) {
  return (
    <div id="game-word">
      {/*Iterate through each letter*/}
      {props.word.map((letter, index) => (
        <p id={"letter_" + index} key={index}>{letter}</p>
      ))}
    </div>
  );
}