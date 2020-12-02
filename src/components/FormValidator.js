export default class FormValidator {
    constructor (popup, initState, eventListener, toBind) { 
      // eventListener - заготовка для действительной функции eventListener, в зависимости от вида попапа
      // toBind нужен только в случае popup.type === 'addCard', в других двух случаях он приходит 'undefined' и не используется
      // оба параметра добавлены в проекте 11 для развязывания зависимостей
      this.popup = popup;
      this.initState = initState;     
      this.popupValidation = [];
      this.func = 'undefined';
      this.eventListener = eventListener;
      this.toBind = toBind;
      
      popup.querySelectorAll('input').forEach((item, index) => this.popupValidation[index] = this.initState);
    }
  
    getInput = (event) => {
      const inputField = event.target;
      const button = event.target.closest('.popup__form').querySelector('.popup__button');
      const result = this.checkFieldValidity(inputField);
      const popup = event.target.closest('.popup');
      const fieldNum = Array.from(popup.querySelectorAll('input')).findIndex(item => (item === inputField));
      this.popupValidation[fieldNum] = result;
      if (this.popupValidation.every(item => (item === true))) {
        this.setSubmitButtonState(true, button);
      }
      else {
        this.setSubmitButtonState(false, button);
      }
    }
    
    is_url = str => {
        const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        return Boolean(regexp.test(str));
      }
    
    checkFieldValidity = (inputField) => {
        // Поле ошибки
        const inputErrField = inputField.closest('.popup__block').querySelector('.popup__error-message');
      
        if (inputField.type.toLowerCase() === 'text') {
      
          if (inputField.value.length === 0) {
            inputErrField.textContent = "Это обязательное поле";
            inputErrField.classList.add('popup__error-message_show');
            return false;
          }
          if (inputField.value.length < 2 || inputField.value.length > 30) {
            inputErrField.textContent = "Должно быть от 2 до 30 символов";
            inputErrField.classList.add('popup__error-message_show');
            return false;
          }
          inputErrField.classList.remove('popup__error-message_show');
          return true;
        }
      
        else if (inputField.type.toLowerCase() === 'url') {
          if (inputField.value.length === 0) {
            inputErrField.textContent = "Это обязательное поле";
            inputErrField.classList.add('popup__error-message_show');
            return false;
          }
          if (! this.is_url(inputField.value)) {
            inputErrField.textContent = "Здесь должна быть ссылка";
            inputErrField.classList.add('popup__error-message_show');
            return false;
          }
          inputErrField.classList.remove('popup__error-message_show');
          return true;
        }
      
    }
  
    checkInputValidity = () => {
      this.popupValidation.every(item => (item === true));
    }
  
    setSubmitButtonState = (key, button) => {
        switch (key) {
          case true:
            button.classList.add('popup__button_active');
            button.disabled = false;
            break;
          case false:
            button.classList.remove('popup__button_active');
            button.disabled = true;
        }
      }
    
    setEventListeners = (popup) => {
        const popupForm = popup.popupEl.querySelector('.popup__form');
        // слушатель ввода
        popupForm.addEventListener('input', this.getInput);
        // слушатель кнопки закрытия
        popup.popupEl.querySelector('.popup__close').addEventListener('click', popup.close, {once:true});
        // выбор колбэка submit
        switch (popup.type) {
          case 'addCard':
            this.func = this.eventListener.bind(this.toBind);
            break;
          case 'author':
            this.func = this.eventListener.bind(event,popup);
            break;
          case 'newAvatar':
            this.func = this.eventListener.bind(event, popup);
        }
        
        // слушатель кнопки submit
        popupForm.addEventListener('submit', this.func 
        );
        
      }
  
    resetEventListeners = (popup) => {
        const popupForm = popup.popupEl.querySelector('.popup__form');
        popupForm.removeEventListener('input', this.getInput);
        popup.popupEl.querySelector('.popup__close').removeEventListener('click', popup.close  
        );
        
        // слушатель кнопки submit
        popupForm.removeEventListener('submit', this.func 
        );
      }
        
    }

    
    
  