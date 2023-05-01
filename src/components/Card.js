// import './Card.css';

function Card(props) { // createdAt, likes, link, name, owner

  const handleCardClick = () => {
    props.onCardClick(props.card); // или props.onCardClick({ link, name })
  };

  // console.log(props);
  return (
    // <></>
    <article className="element">
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
      <div className="element__caption">
        <h2 className="element__header">{props.card.name}</h2>
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
