import React from "react";

function PopupWithForm({ name, title, textButton, handleButtonClick, isOpen, onClose, children }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_${name}`}>
        <form action="#" name="editProfileForm" className={`popup__form popup__form_${name}`} noValidate>
          <button className={`popup__close popup__close_${name} `} onClick={onClose} name="popupButtonExit" type="button"
            aria-label="Закрыть" ></button>
          <h3 className={`popup__title popup__title_${name}`}>{title}</h3>
          {children}
          <button type="submit" name="popupButton" className={`popup__submit popup__submit_${name}`}
            aria-label="Сохранить изменения" onClick={handleButtonClick}>{textButton}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;