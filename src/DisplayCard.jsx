
import './DisplayCard.css';

function Displaycard({item, handleChoice, flipped}) {

    const handleClick = () => {
        handleChoice(item)
    }


  return (
    <div className="card">
      <div className={flipped ? "flipped": ""}>
        <img className="front" src={item.image} alt="open card"/>
        <img
          className="back"
          src="https://deckofcardsapi.com/static/img/X1.png"
          onClick={handleClick}
          alt="closed Card"
        />
      </div>
    </div>
  );
}

export default Displaycard;
