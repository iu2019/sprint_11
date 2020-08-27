export const renderLoading = (isLoading, popup, normalText)=> {
    if (isLoading) {
        popup.popupEl.querySelector('.popup__button').textContent = "Загрузка"
    }
    else {
        popup.popupEl.querySelector('.popup__button').textContent = normalText
    }
  }