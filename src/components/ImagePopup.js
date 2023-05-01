// import './ImagePopup.css';
import defaultImage from "../images/default.jpg";

// Попап картинки
function ImagePopup({ card, onClose}) { //{ card, onClose}

  // console.log(onClose);

  // Для картинок можно сделать проверку ссылки является ли она ссылкой на
  // картинку (с помощью includes проверять вхождение расширений, или через рег.выражение)
  // Если ссылка на картинку не рабочая - выводить дефолтное изображение {card ? card.link : defaultImage}
  return (

    // <></>
    <div className={`popup popup_image ${card ? 'popup_is-opened' : ''}`}>
      <div className="popup__container popup__container_image">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <figure className="popup__illustration">
          <img className="popup__large-image" src={card && card.link} alt={card && card.name} />
          <figcaption className="popup__caption-image">{card && card.name}</figcaption>
        </figure>
      </div>
    </div>

    // <div className={`popup popup_image ${props.card ? 'popup_is-opened' : ''}`}>
    // <div className="popup__container popup__container_image">
    //   <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
    //   <figure className="popup__illustration">
    //     <img className="popup__large-image" src={props.card && props.card.link} alt={props.card && props.card.name} />
    //     <figcaption className="popup__caption-image">{props.card && props.card.name}</figcaption>
    //   </figure>
    // </div>
    // </div>

  );
}

export default ImagePopup;
