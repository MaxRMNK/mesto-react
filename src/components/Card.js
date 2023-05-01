// import './Card.css';

function Card({ card, onCardClick }) { // createdAt, likes, link, name, owner

  const handleCardClick = () => {
    onCardClick(card); // или props.onCardClick({ link, name })
  };

  // console.log('Card:', props);

  return (
    // <></>
    <article className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      <div className="element__caption">
        <h2 className="element__header">{card.name}</h2>
        <div className="element__like-container">
          <button className="element__like" type="button" aria-label="Нравится"></button>
          <span className="element__like-counter">0</span>
        </div>
      </div>
      <button className="element__delete" type="button" aria-label="Удалить"></button>
    </article>
  );
}

export default Card;
