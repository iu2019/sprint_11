
const editProfile = (popup, event) => {
    
    event.preventDefault();
    userInfo.setUserInfo (popup, event);
    // userInfo.updateUserInfo();
    // event.target.reset();
    // popup.close();
  
  }

const  renderLoading = (isLoading, popup, normalText)=> {
    if (isLoading) {
        popup.popupEl.querySelector('.popup__button').textContent = "Загрузка"
    }
    else {
        popup.popupEl.querySelector('.popup__button').textContent = normalText
    }
  }
