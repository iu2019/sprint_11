class UserInfo {
    constructor (userInfoName, userInfoJob, userInfoAvatar, popupAuthor) {
      this.name = userInfoName;
      this.job = userInfoJob;
      this.avatar = userInfoAvatar;
      this.popupAuthor = popupAuthor;

      this.input_name = "";
      this.input_job = "";
      this.input_avatar = "";
    }


    // записать данные о пользователе в хранилище
    assignUserInfo = (name,job,avatar) => {

      this.name = name;
      this.job = job;
      this.avatar = avatar;

    }

    inputUserInfo = (name,job,avatar) => {

      this.input_name = name;
      this.input_job = job;
      this.input_avatar = avatar;

    }

    // отдать из хранилища данные, введенные в форму popup
    retrieveUserInfo () {
      return ({name:this.input_name,about:this.input_job, avatar:this.input_avatar});
    }

    retrieveUser () {
      return ({name:this.name,about:this.job, avatar:this.avatar});
    }

    // взять данные из полей ввода и верстки (аватар), записать в хранилище полей ввода и передать на сервер, получить ответ, записать в локальное хранилище актуальных значений и отобразить. Закрыть попап.
    setUserInfo (popupAuthor, event) {
      const authorName = popupAuthor.popupEl.querySelector('input.author-name');
      const authorJob = popupAuthor.popupEl.querySelector('input.job');
      const authorAvatar = document.querySelector('.user-info__photo').style.backgroundImage.slice(5, -2);
      this.inputUserInfo (authorName.value, authorJob.value, authorAvatar);
      this.transmitUser(popupAuthor, event);
    }

    setUserAvatar (popupAvatar, event) {

      const authorAvatar = popupAvatar.popupEl.querySelector('.url');

      this.inputUserInfo (this.name, this.job, authorAvatar.value);
      this.transmitAvatar(popupAvatar, event);
    }

    // отразить данные из хранилища в окне
    updateUserInfo() {
      const userInfoName = document.querySelector('.user-info__name');
      const userInfoJob = document.querySelector('.user-info__job');
      const userInfoAvatar = document.querySelector('.user-info__photo');
      [userInfoName.textContent, userInfoJob.textContent, userInfoAvatar.style.backgroundImage] = [this.name, this.job, `url(${this.avatar}`];

    }

    // загрузить с сервера и отобразить исходные данные пользователя

    renderUser () {
      api.getInfo ('users/me')
      .then (res => {
          // console.log(res);
          this.assignUserInfo(res.name, res.about, res.avatar);
          this.updateUserInfo();
      })
      .catch (err => {console.log('Ошибка ', err)});
    }

    // взять данные аватара из поля ввода, записать в хранилище и передать на сервер

    newAvatar = (popup, event) => {
      event.preventDefault();
      this.setUserAvatar (popup, event);

      event.target.reset();
      // popup.close();

    }



    transmitUser (popup, event) {
      renderLoading(true, popupAuthor, "Сохранить");
      api.patchInfo ('users/me', JSON.stringify({
          name: this.retrieveUserInfo().name,
          about: this.retrieveUserInfo().about
            }) )

      .then (json => {
          // console.log(json);
          this.assignUserInfo (json.name, json.about, json.avatar);
          this.updateUserInfo ();
          popup.close(event);

        })
        .catch (err=>console.log('Ошибка ', err))
        .finally (() => renderLoading(false, popupAuthor, "Сохранить"));
    }

    transmitAvatar = (popup, event) => {
      api.patchInfo ('users/me/avatar', JSON.stringify({
          avatar: this.retrieveUserInfo().avatar
      }) )

      .then (json => {
          // console.log(json);
          this.assignUserInfo (this.name, this.job, json.avatar);
          this.updateUserInfo();
          popup.close(event);

      })
      .catch (err=>console.log('Ошибка ', err))
  }

}


