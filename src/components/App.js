import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page">
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={setIsEditProfilePopupOpen}
          onAddPlace={setIsAddPlacePopupOpen}
          onEditAvatar={setIsEditAvatarPopupOpen}
          onCardClick={setSelectedCard}
        />
        <Footer />
        <PopupWithForm
          name='edit-profile'
          title='Редактировать профиль'
          textButton='Сохранить'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="text"
            name="name"
            id="name-input"
            placeholder="Введите имя"
            className="popup__input popup__input_type_name"
            required minLength="2"
            maxLength="40" />
          <span className="popup__input-error name-input-error"></span>
          <input
            type="text"
            name="about"
            id="name-status"
            placeholder="Введите статус"
            className="popup__input popup__input_type_status"
            required minLength="2"
            maxLength="200" />
          <span className="popup__input-error name-status-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name='add-card'
          title='Новое место'
          textButton='Создать'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type="text"
            name="name"
            defaultValue=""
            placeholder="Название"
            className="popup__input popup__input_type_place-name"
            id="place-name"
            required minLength="2"
            maxLength="30" />
          <span className="popup__input-error place-name-error"></span>
          <input
            type="url"
            name="link"
            defaultValue=""
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_place-image"
            id="place-image"
            required minLength="2"
            maxLength="200" />
          <span className="popup__input-error place-image-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name='edit-avatar'
          title='Обновить аватар'
          textButton='Сохранить'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <input
            type="url"
            name="avatar"
            defaultValue=""
            placeholder="Вставьте ссылку на новый аватар"
            className="popup__input popup__input_type_avatar-link"
            id="avatar"
            required minLength="2"
            maxLength="200" />
          <span className="popup__input-error avatar-error"></span>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </div>
    </div>
  );
}

export default App;
