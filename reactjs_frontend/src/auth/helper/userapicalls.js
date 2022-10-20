import { useContext } from 'react';
import { API } from '../../backend';
import UserContext from '../user-context';

export const get_user_data = (token) => {
    return fetch(`${API}user/user-data/?token=${token}`, {
        method: "GET",
    }).then(data => {
        return data.json();
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const signin = (user) => {
    const { username, password } = user;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return fetch(`${API}user/signin/`, {
        method: "POST",
        body: formData

    }).then(data => {
        let x = getCookie('csrftoken')
        console.log(x, ...data.headers);
        return data.json()
    });
}

export const signout = () => {
    //http://127.0.0.1:8000/api/user/signout/

    const token = localStorage.getItem('token');

    const formData = new FormData();

    formData.append('token', token);
    localStorage.removeItem('token');

    return fetch(`${API}user/signout/`, {
        method: "POST",
        body: formData

    }).then(data => data.json());
}

//http://127.0.0.1:8000/api/user/user-data/?token=1rjss9u8feicjfv4o40j
// {
//     "first_name": "tes1t",
//     "last_name": "test",
//     "email": "1@ass.com",
//     "username": "admin",
//     "old_password":"admin11",
//     "password":"admin11",
//     "phone":"010111123333",
//     "gender":"male"
// }

// username: '',
//         first_name: '',
//         last_name: '',
//         image: '',
//         email: '',
//         phone: '',
//         gender: '',
//         password: '',
//         password2: ''
export const updateUserData = (user) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('token', token);
    formData.append("first_name", user.first_name)
    formData.append("last_name", user.last_name)
    formData.append("email", user.email)
    formData.append("username", user.username)
    formData.append("old_password", user.password)
    console.log(user.password);
    formData.append("password", user.password2)
    console.log(user.password2);
    formData.append("phone", user.phone)
    formData.append("gender", user.gender)
    formData.append('image', user.image)

    return fetch(`${API}user/user-data/?token=${token}`, {
        method: "POST",
        body: formData
    }).then(data => data.json());
};

// {
//     "first_name": "omar",
//     "last_name": "khaled",
//     "email": "ok@ok.com",
//     "username": "ok",
//     "password": "ok123",
//     "phone": "0101",
//     "gender": "Male",
//     "token": null
// }
export const signup = (user) => {
    const formData = new FormData();
    formData.append('first_name', user.first_name)
    formData.append('last_name', user.last_name)
    formData.append('username', user.username)
    formData.append('email', user.email)
    formData.append('password', user.password)
    formData.append('gender', user.gender)
    formData.append('phone', user.phone)
    formData.append('token', null)


    return fetch(`${API}user/signup/`, {
        method: "POST",
        body: formData
    }).then(data => data.json());
}