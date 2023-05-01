// import avatar from "../images/cousteau.jpg";
// import avatar from "../images/default-avatar.png";
// import './Main.css';
import Card from './Card';


function Main({
    onAddPlace,
    onEditAvatar,
    onEditProfile,
    userName,
    userDescription,
    userAvatar,
    cards,
    onCardClick,
  }) {

  // console.log('Main', props);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-button"
          type="button"
          aria-label="Редактировать"
          onClick={onEditAvatar}
        >
          <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} ></div>
          {/* <img src={props.userAvatar} className="profile__avatar" alt="Аватар пользователя" /> */}
        </button>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__job">{userDescription}</p>
          </div>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {/* {props.children} */}
        {
          // В4.
          cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))
        }
      </section>
    </main>
  );
}

export default Main;
