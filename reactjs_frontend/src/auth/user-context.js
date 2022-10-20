import React from 'react';

const UserContext = React.createContext({
    username: '',
    first_name: '',
    last_name: '',
    image: null,
    email: '',
    phone: '',
    gender: '',
    token: '',
    updateToken: (token) => { },
    updateData: (userData) => { },
    fetchData: (tokens) => { },
    isAuthenticated: () => { }
});

export default UserContext;