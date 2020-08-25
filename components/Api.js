class Api {
    constructor () {
        this.token = 'f6900d89-354c-4fff-a461-d00c77a9e45d';
        this.group = 'cohort12';
        this.me = 'IU';
    }

    getInfo (field) {

        return fetch(`https://praktikum.tk/${this.group}/${field}`, {

        method: 'GET',

        headers: {

            'Authorization': this.token

            }
        })
        .then(res => {
            if (!res.ok) {
              return Promise.reject(res.status);
            } else {
              return res.json();
            }
          })
      }


    patchInfo (field, body) {

        return fetch(`https://praktikum.tk/${this.group}/${field}`, {

        method: 'PATCH',

        headers: {

            'Authorization': this.token,
            'Content-Type': 'application/json'

            },
        body: body
        })
        .then(res => {
            if (!res.ok) {
              return Promise.reject(res.status);
            } else {
              return res.json();
            }
          })
    }

    postInfo (field, body) {

        return fetch(`https://praktikum.tk/${this.group}/${field}`, {

        method: 'POST',

        headers: {

            'Authorization': this.token,
            'Content-Type': 'application/json'

            },
        body: body
        })
        .then(res => {
            if (!res.ok) {
              return Promise.reject(res.status);
            } else {
              return res.json();
            }
          })
    }

    putInfo (field) {
        return fetch(`https://praktikum.tk/${this.group}/${field}`, {

        method: 'PUT',

        headers: {

            'Authorization': this.token,

            }

        })
        .then(res => {
            if (!res.ok) {
              return Promise.reject(res.status);
            } else {
              return res.json();
            }
          })
    }


    deleteInfo (field) {

        return fetch(`https://praktikum.tk/${this.group}/${field}`, {

        method: 'DELETE',

        headers: {

            'Authorization': this.token,
            'Content-Type': 'application/json'

            }
        })
        .then(res => {
            if (!res.ok) {
              return Promise.reject(res.status);
            } else {
              return res.json();
            }
          })
    }

    /*REVIEW. Надо исправить. В соответствии с тем с тем, что сказано в предыдущем комментарии, методы, содержащие обработку ответа сервера
    не должны быть методами класса Api. */
    // transmitUser () {
    //     this.renderLoading(true, popupAuthor, "Сохранить");
    //     this.patchInfo ('users/me', JSON.stringify({
    //         name: userInfo.retrieveUserInfo().name,
    //         about: userInfo.retrieveUserInfo().about
    //           }) )

    //     .then (res => res.json())
    //     .then (json => {
    //         // console.log(json);
    //         userInfo.assignUserInfo (json.name, json.about, json.avatar);
    //         userInfo.updateUserInfo ();

/*REVIEW Хотя метод transmitUser Вы должны будете убрать из класса Api, и сделать обработку ответа сервера, полученного с помощью метода patchInfo, в файле другого
класса, структура обработки должна быть примерно такой же, как сейчас у Вас и есть. Поэтому я даю комментарий, что ещё надо будет сделать при обработке
ответа сервера при этом запросе здесь.

В этом же методе then, нужно произвести закрытие формы профиля, (и нигде в другом месте при сабмите формы инструкции её закрытия
быть не должно), так как форма должна закрыться только после прихода успешного ответа от сервера и заполнения элементов страницы информацией (не раньше).

Если придёт неуспешный ответ (информация на сервере не сохранилась) форма вообще не должна закрываться - пользователь может выйти из формы по крестику,
когда Вы ему сообщите о неуспешности, или попробовать ещё раз.
Инструкция закрытия формы должна быть именно в методе then обработки ответа сервера, так как взаимодействие с сервером является асинхронной операцией.
Если же Вы поместите вызов метода закрытия в другом месте, закрытие произойдёт заведомо раньше, чем придёт какой-либо ответ от сервера (успешный, или неуспешный).
Асинхронность означает, что все команды проекта, находящиеся вне метода then обработки ответа от сервера, выполнятся (которые могут выполниться
в это время ожидания ответа в соответствии с очередью) раньше, чем придёт ответ от сервера. И, если Вы хотите, чтобы какие-то команды не выполнялись до
прихода ответа, их нужно поместить в методы then, или catch обработки ответа сервера.
Необходимо проверить закрытие всех Ваших форм после сабмита и сделать их закрытие правильным, если оно не таково.
*/
    //     })
    //     .catch (err=>console.log('Ошибка ', err))
    //     .finally (() => this.renderLoading(false, popupAuthor, "Сохранить"));
    // }

    // renderLoading (isLoading, popup, normalText) {
    //     if (isLoading) {
    //         popup.popupEl.querySelector('.popup__button').textContent = "Загрузка"
    //     }
    //     else {
    //         popup.popupEl.querySelector('.popup__button').textContent = normalText
    //     }
    //   }



    // ИУ: исправил






}