// import './ConfirmDeletePopup.css';
import React from 'react';
import PopupWithForm from "./PopupWithForm";


function ConfirmDeletePopup({ isOpen, onClose, onCardDeleteConfirm, isLoading }) {

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onCardDeleteConfirm();
  }

  return (
    <PopupWithForm
      title='Вы уверены?'
      name='confirm'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Удаление..." : "Да"}
    />
  );
}

export default ConfirmDeletePopup;
