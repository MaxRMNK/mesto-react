import React from 'react';
// import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
// import Card from './Card';
import { api } from '../utils/Api';
import defaultAvatar from "../images/default-avatar.png";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  // Стейт данных пользователя.
  // setUserInfo следит за состоянием "объекта", и при его изменении перезаписывает userInfo
  // const [userInfo, setUserInfo] = React.useState({name: '', about: '', avatar: ''});
  const [userInfo, setUserInfo] = React.useState({name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: {defaultAvatar}});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    // const popupElement = document.querySelector('.popup_add-card');
    // popupElement.classList.add('popup_is-opened');
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(false);
    isEditProfilePopupOpen && setIsEditProfilePopupOpen(false);
    isAddPlacePopupOpen && setIsAddPlacePopupOpen(false);
    selectedCard && setSelectedCard(null);
  }

  // Загрузка с сервера данных карточек и профиля пользователя
  React.useEffect(() => {
    api.getAllPageData()
    .then((result) => {
      // console.log(result);
      const [ apiUser, apiCards ] = result;
      setUserInfo(apiUser);
      setCards(apiCards);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }, []);
  // Второй аргумент - [] - массив зависимостей. Если значения прописанные в этом массиве изменились,
  // тогда этот эффект будет выполняться. Если нет - логика внутри useEffect вызываться не будет.

  return (
<>

  <Header />

  <Main
    onEditAvatar={handleEditAvatarClick}
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    userName={userInfo.name}
    userDescription={userInfo.about}
    userAvatar={userInfo.avatar}
    cards={cards}
    onCardClick={setSelectedCard}
  />

  <Footer />

  <PopupWithForm
    title='Обновить аватар'
    name='edit-profile'
    isOpen={isEditAvatarPopupOpen}
    onClose={closeAllPopups}
    buttonText='Сохранить'
  >
    <input
      type="url"
      className="popup__input popup__input_type_avatar"
      id="input-avatar"
      name="editAvatar"
      placeholder="Ссылка на картинку"
      required />
    <span className="popup__error input-avatar-error"></span>
  </PopupWithForm>

  <PopupWithForm
    title='Редактировать профиль'
    name='edit-profile'
    isOpen={isEditProfilePopupOpen}
    onClose={closeAllPopups}
    buttonText='Сохранить'
  >
    <input
      type="text"
      className="popup__input popup__input_type_name"
      id="input-name"
      name="editName"
      placeholder="Имя"
      minLength="2"
      maxLength="40"
      required />
    <span className="popup__error input-name-error"></span>
    <input
      type="text"
      className="popup__input popup__input_type_job"
      id="input-job"
      name="editJob"
      placeholder="Профессия"
      minLength="2"
      maxLength="200"
      required />
    <span className="popup__error input-job-error"></span>
  </PopupWithForm>

  <PopupWithForm
    title='Новое место'
    name='add-card'
    isOpen={isAddPlacePopupOpen}
    onClose={closeAllPopups}
    buttonText='Сохранить'
  >
    <input
      type="text"
      className="popup__input popup__input_type_add-title"
      id="input-add-title"
      name="addCardTitle"
      placeholder="Название"
      minLength="2"
      maxLength="30"
      required />
    <span className="popup__error input-add-title-error"></span>
    <input
      type="url"
      className="popup__input popup__input_type_add-link"
      id="input-add-link"
      name="addCardLink"
      placeholder="Ссылка на картинку"
      required />
    <span className="popup__error input-add-link-error"></span>
  </PopupWithForm>

  <ImagePopup
    card={selectedCard}
    onClose={closeAllPopups}
  />

</>

  );
}

export default App;
