import { useEffect, useReducer, useState } from "react";
import UserContext from "./user-context";
import { get_user_data, signout } from "./helper/userapicalls";

const defaultUserState = {
    username: '',
    first_name: '',
    last_name: '',
    image: null,
    email: '',
    phone: '',
    gender: '',
    token: '',
    updateData: (userData) => { },
    fetchData: (token) => { },
    updateToken: (token) => { },
    isAuthenticated: () => { }
}

const ContextProvider = (props) => {
    const [userState, setUserState] = useState(defaultUserState);

    const updateData = (userData) => {

    }

    const updateToken = (token) => {
        if (token === '0') {
            signout();
            setUserState({
                ...defaultUserState
            })
        } else {
            setUserState({
                ...userState,
                token: token
            });
        }
    }

    const fetchData = (token) => {
        get_user_data(token).then((data) => {
            if (data.code === '1') {
                const user_data = data.user;
                setUserState({
                    ...userState,
                    username: user_data.username,
                    first_name: user_data.first_name,
                    last_name: user_data.last_name,
                    image: user_data.image,
                    email: user_data.email,
                    phone: user_data.phone,
                    gender: user_data.gender,
                    token: token
                })
            }
        });
        localStorage.setItem('token', token);
    };

    useEffect(() => {
        if (localStorage.getItem('token') !== '' || localStorage.getItem('token') !== '0' || localStorage.getItem('token') !== null ||
            localStorage.getItem('token') !== undefined) {
            const token = localStorage.getItem('token');
            fetchData(token);
        }
    },[])

    const isAuthenticated = () => {
        if (userState.token === '0' || userState.token === '') {
            return false;
        }
        return true;
    }

    const getUserData = () => {
        return userState;
    }

    const userContext = {
        username: userState.username,
        first_name: userState.first_name,
        last_name: userState.last_name,
        image: userState.image,
        email: userState.email,
        phone: userState.phone,
        gender: userState.gender,
        token: userState.token,
        updateData: updateData,
        fetchData: fetchData,
        updateToken: updateToken,
        isAuthenticated: isAuthenticated
    };

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    );
}

export default ContextProvider;