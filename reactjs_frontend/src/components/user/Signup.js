import { useContext, useEffect, useRef, useState } from "react";
import { updateUserData } from "../../auth/helper/userapicalls";
import Base from "../../Base";
import { signup } from "../../auth/helper/userapicalls";

const Signup = (props) => {
    const [errorList, setErrorList] = useState([])
    const [updated, setUpdated] = useState(false)
    const [userState, setUserState] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        gender: '',
        password: '',
        password2: ''
    });

    const errorStatus = errorList.length > 0
    const firstNameChangeHandler = (event) => {
        setUserState({
            ...userState,
            first_name: event.target.value,
        })
    }

    const lastNameChangeHandler = (event) => {
        setUserState({
            ...userState,
            last_name: event.target.value,
        })
    }

    const usernameChangeHandler = (event) => {
        setUserState({
            ...userState,
            username: event.target.value,
        })
    }

    const phoneChangeHandler = (event) => {
        setUserState({
            ...userState,
            phone: event.target.value,
        })
    }

    const emailChangeHandler = (event) => {
        setUserState({
            ...userState,
            email: event.target.value,
        })
    }

    const imageChangeHandler = (e) => {
        setUserState({
            ...userState,
            image: e.target.files[0]
        })
    };


    const genderChangeHandler = (event) => {
        setUserState({
            ...userState,
            gender: event.target.value,
        })
    }

    const passwordChangeHandler = (event) => {
        setUserState({
            ...userState,
            password: event.target.value,
        })
    }

    const passwordNewChangeHandler = (event) => {
        setUserState({
            ...userState,
            password2: event.target.value,
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (userState.password === userState.password2) {
            signup(userState).then(data => {
                if (data.code === '0') {
                    setErrorList(data.errors)
                } else if (data.code === '1') {
                    setUpdated(true)
                }
            });
        } else {
            setErrorList(["Passwords don't match!"])
        }
    }

    useEffect(() => {
        if (updated === true) {
            setTimeout(() => {
                setUpdated(false)
            }, 3000)
        }

    }, [updated])

    const errors_list = errorList.map((error, id) => {
        return <div key={id} className="alert text-center col-4 alert-danger"> {error}</div>
    })

    return (
        <Base>
            <div className="row m-5 justify-content-center">
                {errorStatus && <div className="row justify-content-center">
                    {errors_list}
                </div>}
                {
                    updated &&
                    <div className="alert alert-success my-3 text-center" role="alert">
                        Registered Successfully!
                    </div>
                }
                <form onSubmit={onSubmitHandler}>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <label className="labels m-1">First Name</label>
                            <input type="text"
                                className="form-control" placeholder="first_name" name="first_name"
                                value={userState.first_name}
                                onChange={firstNameChangeHandler}
                            />
                        </div>
                        <div className="col-md-8"><label className="labels m-1">Last Name</label>
                            <input type="text"
                                className="form-control" name="last_name" value={userState.last_name}
                                placeholder="last_name"
                                onChange={lastNameChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="row mt-3 justify-content-center">

                        <div className="col-md-8">
                            <label className="labels m-1">Username</label>
                            <input type="text"
                                className="form-control" placeholder="username" name="username"
                                value={userState.username}
                                onChange={usernameChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="row mt-3 justify-content-center">
                        <div className="col-md-8">
                            <label className="labels m-1">Mobile Number</label>
                            <input type="text"
                                className="form-control" placeholder="enter phone number" name="phone"
                                value={userState.phone}
                                onChange={phoneChangeHandler}
                            />
                        </div>
                        <div className="col-md-8">
                            <label className="labels m-1">Email</label>
                            <input type="text"
                                className="form-control" placeholder="enter email id" name="email" value={userState.email}
                                onChange={emailChangeHandler} />
                        </div>
                        <div className="col-md-8">
                            <label className="labels m-1">Gender</label>
                            <input type="text"
                                className="form-control" placeholder="gender" name="gender"
                                value={userState.gender}
                                onChange={genderChangeHandler} />
                        </div>
                        <div className="col-md-8">
                            <label className="labels m-1">Password</label>
                            <input type="password"
                                className="form-control" placeholder="new password" name="password" value={userState.password}
                                onChange={passwordChangeHandler} /></div>
                        <div className="col-md-8">
                            <label className="labels m-1">Retype Password</label>
                            <input type="password"
                                className="form-control" placeholder="new password" name="retype_password"
                                onChange={passwordNewChangeHandler}
                                value={userState.password2} />
                        </div>

                    </div>
                    <div className="row justify-content-center">
                        <div className="mt-1 col-6  text-center">
                            <button className="btn form-control btn-primary profile-button mt-2" type="submit">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </Base>

    );
}

export default Signup;