export default class Api {
    constructor () {
        this.token = 'f6900d89-354c-4fff-a461-d00c77a9e45d';
        this.group = 'cohort12';
        this.me = 'IU';
        this.serverUrl = NODE_ENV === 'development' ? 'http://nomoreparties.co' : 'https://nomoreparties.co';

    }

    getInfo (field) {

        return fetch(`${this.serverUrl}/${this.group}/${field}`, {

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

        return fetch(`${this.serverUrl}/${this.group}/${field}`, {

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

        return fetch(`${this.serverUrl}/${this.group}/${field}`, {

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
        return fetch(`${this.serverUrl}/${this.group}/${field}`, {

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

        return fetch(`${this.serverUrl}/${this.group}/${field}`, {

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

    

}