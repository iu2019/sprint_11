
class PopupHolder {
    constructor (initState, type, template) {

      this.initState = initState;
      this.type = type;
      this.template = template;

      // div popup элемент темплейта
      this.popupEl = this.template.cloneNode(true).querySelector('.popup');
      this.formVal = formValidator(this.popupEl, this.initState);

      document.querySelector('.root').appendChild(this.popupEl);

    }


    openPopupFlag = () => {
      // задаем попапу модификатор "открыт" и обнуляем сообщения ошибок ввода
      this.popupEl.classList.add('popup_is-opened');
      this.popupEl.querySelectorAll('.popup__error-message').forEach(item => item.classList.remove('popup__error-message_show'));
    }

    
    closePopupFlag = () => {
      // удаляем у попапа модификатор "открыт" и обнуляем сообщения ошибок ввода
      this.popupEl.classList.remove('popup_is-opened');
      this.popupEl.querySelectorAll('.popup__error-message').forEach(item => item.classList.remove('popup__error-message_show'));
    }

    
    close = (event) => {
      event.preventDefault();
      // см. выше
      this.closePopupFlag();
      // обнуляем поля ввода
      this.popupEl.querySelectorAll('input').forEach(item => item.textContent = "");
      // снимаем слушатели
      this.formVal.resetEventListeners (this);
    }


    open = (openInitValues) => {
      this.formVal.popup.querySelectorAll('input').forEach((item, index) => this.formVal.popupValidation[index] = this.initState);

      // записываем в поля формы начальные значения
      this.popupEl.querySelectorAll('input').forEach((item, index) => {
        item.value = openInitValues[index];
      });

      // в зависимости от вида формы устанавливаем начальное состояние кнопки submit: для addCard - неактивна, для author - активна
      this.formVal.setSubmitButtonState(this.initState, this.popupEl.querySelector('.popup__button'));

      //задаем попапу модификатор "открыт"
      this.openPopupFlag();
      // вешаем слушатели попапа
      this.formVal.setEventListeners(this);

    }
  }