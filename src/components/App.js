import React from 'react';
// import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from "./Footer";
// import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup' ;
import ConfirmDeletePopup from './ConfirmDeletePopup';

import ImagePopup from "./ImagePopup";
// import Card from './Card';
import { api } from '../utils/Api';
import defaultAvatar from "../images/default-avatar.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {

  // const defaultUserInfo = {
  //   name: 'Жак-Ив Кусто',
  //   about: 'Исследователь океана',
  //   avatar: defaultAvatar,
  // }
  // Стейт данных пользователя.
  // setcurrentUser следит за состоянием "объекта", и при его изменении перезаписывает currentUser (раньше - userInfo)
  // const [currentUser, setCurrentUser] = React.useState(defaultUserInfo);
  const [currentUser, setCurrentUser] = React.useState({ name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: defaultAvatar });
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false); // Стейт надписи на кнопке popup

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [cardDelete, setCardDelete] = React.useState(null);

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
    isConfirmDeletePopupOpen && setIsConfirmDeletePopupOpen(false);
    // cardDelete && setCardDelete(null);
  }



  // Загрузка с сервера данных карточек и профиля пользователя
  React.useEffect(() => {
    api.getAllPageData()
    .then((result) => {
      // console.log(result);
      const [ apiUser, apiCards ] = result;
      setCurrentUser(apiUser);
      setCards(apiCards);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }, []);
  // Второй аргумент - [] - массив зависимостей. Если значения прописанные в этом массиве изменились,
  // тогда этот эффект будет выполняться. Если нет - логика внутри useEffect вызываться не будет.


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }


  // Перенес функционал в handleCardDeleteConfirm
  function handleCardDelete(card) {
    setCardDelete(card);
    // console.log('Запрос на подтверждение удаления');
    setIsConfirmDeletePopupOpen(true);

    // // Было:
    // api.deleteCard(card._id)
    //   .then(() => {
    //     // обновите стейт cards с помощью метода filter: создайте копию массива, исключив из него удалённую карточку
    //     const newCards = cards.filter((item) => {
    //       return item._id !== card._id;
    //     });
    //     setCards(newCards);
    //   }).catch((err) => {
    //     console.log(err); // выведем ошибку в консоль
    //   });
  }

  // Удаление после подтверждения
  function handleCardDeleteConfirm() {
    setIsLoading(true);
    api.deleteCard(cardDelete._id)
      .then(() => {
        // обновите стейт cards с помощью метода filter: создайте копию массива, исключив из него удалённую карточку
        const newCards = cards.filter((item) => {
          return item._id !== cardDelete._id;
        });
        setCards(newCards);
        setCardDelete(null);
      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  function handleUpdateUser(userInfo) {
    // console.log(userInfo);
    setIsLoading(true);
    api.setUserInfo(userInfo.name, userInfo.about)
      .then(() => {
        setCurrentUser( userInfo );
        // setCurrentUser({ // Изменил метод т.к. пропадала часть информации из userInfo
        //   name: userInfo.name,
        //   about: userInfo.about,
        //   avatar: currentUser.avatar,
        // });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(userAvatar) {
    // console.log(userAvatar);
    setIsLoading(true);
    api.setAvatar(userAvatar.avatar)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          avatar: userAvatar.avatar,
        });
        // setCurrentUser({
        //   name: currentUser.name,
        //   about: currentUser.about,
        //   avatar: userAvatar.avatar,
        // });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(inputData) {
    setIsLoading(true);
    api.addCardInDb(inputData)
      // Затем, если предыдущая операция была успешной, обновляется информация на странице
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }



  return (
<CurrentUserContext.Provider value={currentUser}>

  <Header />

  <Main
    onEditAvatar={handleEditAvatarClick}
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    cards={cards}
    onCardClick={setSelectedCard}
    onCardLike={handleCardLike}
    onCardDelete={handleCardDelete}
  />

  <Footer />

  <EditProfilePopup
    isOpen={isEditProfilePopupOpen}
    onClose={closeAllPopups}
    onUpdateUser={handleUpdateUser}
    isLoading={isLoading}
  />

  <EditAvatarPopup
    isOpen={isEditAvatarPopupOpen}
    onClose={closeAllPopups}
    onUpdateAvatar={handleUpdateAvatar}
    isLoading={isLoading}
  />

  <AddPlacePopup
    isOpen={isAddPlacePopupOpen}
    onClose={closeAllPopups}
    onAddPlace={handleAddPlaceSubmit}
    isLoading={isLoading}
  />

  <ConfirmDeletePopup
    isOpen={isConfirmDeletePopupOpen}
    onClose={closeAllPopups}
    onCardDeleteConfirm={handleCardDeleteConfirm}
    // card={card}
    isLoading={isLoading}
  />

  <ImagePopup
    card={selectedCard}
    onClose={closeAllPopups}
  />

</CurrentUserContext.Provider>

  );
}

export default App;
