// import avatar from "../images/cousteau.jpg";
// import avatar from "../images/default-avatar.png";
// import './Main.css';
import Card from './Card';


function Main(props) {
  // onEditAvatar={handleEditAvatarClick}
  // onEditProfile={handleEditProfileClick}
  // onAddPlace={handleAddPlaceClick}

  // console.log('Main', props.cards);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-button"
          type="button"
          aria-label="Редактировать"
          onClick={props.onEditAvatar}
        >
          <div className="profile__avatar" style={{ backgroundImage: `url(${props.userAvatar})` }} ></div>
          {/* <img src={props.userAvatar} className="profile__avatar" alt="Аватар пользователя" /> */}
        </button>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__name">{props.userName}</h1>
            <p className="profile__job">{props.userDescription}</p>
          </div>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {/* {props.children} */}
        {
          // В4.
          props.cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} />
          ))
        }
      </section>
    </main>
  );
}

export default Main;
