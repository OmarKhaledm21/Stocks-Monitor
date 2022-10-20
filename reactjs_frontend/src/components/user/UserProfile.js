import { useContext, useEffect, useRef, useState } from "react";
import { updateUserData } from "../../auth/helper/userapicalls";
import UserContext from "../../auth/user-context";
import Base from "../../Base";
import { BACKEND_MEDIA } from "../../backend";

const UserProfile = (props) => {
    const userFormData = useContext(UserContext);
    const [errorList, setErrorList] = useState([])
    const [updated, setUpdated] = useState(false)
    const [userState, setUserState] = useState({
        username: '',
        first_name: '',
        last_name: '',
        image: null,
        email: '',
        phone: '',
        gender: '',
        password: '',
        password2: ''
    });

    useEffect(() => {
        setUserState({ ...userFormData });
    }, [userFormData])

    const hasErrors = errorList.length > 0;

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
        updateUserData(userState).then(data => {
            if (data.code === '0') {
                setErrorList(data.errors)
            } else if (data.code === '1') {
                setUpdated(true)
            }
        });
    }

    useEffect(() => {
        if (updated === true) {
            setTimeout(() => {
                setUpdated(false)
            }, 3000)
        }

    }, [updated])

    let image_url = `${BACKEND_MEDIA}${userState.image}`;
    const hasImage = () => {

        if (userState.image !== null && userState.image !== '') {

            console.log(image_url)
            return true;
        } else {
            return false;
        }
    }

    const error_list = errorList.map((error, id) => {
        return <div key={id} className="alert text-center col-4 alert-danger"> {error}</div>
    })

    return (
        <Base>

            <div className="bg-white">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img className="rounded-circle mt-5"
                                width="150px"
                                src={hasImage() ? image_url : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"}
                            />
                            <span
                                className="font-weight-bold">{`${userState.first_name} ${userState.last_name}`}
                            </span>
                            <span
                                className="text-black-50">@{`${userState.username}`}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-5 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Profile Settings</h4>
                            </div>
                            {hasErrors &&
                                <div className="alert alert-danger my-3 text-center" role="alert">
                                    {errorList}
                                </div>
                            }
                            {
                                updated &&
                                <div className="alert alert-success my-3 text-center" role="alert">
                                    Updated!
                                </div>
                            }
                            <form encType="multipart/form-data" onSubmit={onSubmitHandler}>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label className="labels">First Name</label>
                                        <input type="text"
                                            className="form-control" placeholder="first name" name="first_name"
                                            value={userState.first_name}
                                            onChange={firstNameChangeHandler}
                                        />
                                    </div>
                                    <div className="col-md-6"><label className="labels">Last Name</label>
                                        <input type="text"
                                            className="form-control" name="last_name" value={userState.last_name}
                                            placeholder="last_name"
                                            onChange={lastNameChangeHandler}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <label className="labels">Mobile Number</label>
                                        <input type="text"
                                            className="form-control" placeholder="enter phone number" name="phone"
                                            value={userState.phone}
                                            onChange={phoneChangeHandler}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Email</label>
                                        <input type="text"
                                            className="form-control" placeholder="enter email id" name="email" value={userState.email}
                                            onChange={emailChangeHandler} />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Gender</label>
                                        <input type="text"
                                            className="form-control" placeholder="gender" name="gender"
                                            value={userState.gender}
                                            onChange={genderChangeHandler} />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels">Old Password</label>
                                        <input type="password"
                                            className="form-control" placeholder="old password" name="password" value={userState.password}
                                            onChange={passwordChangeHandler} /></div>
                                    <div className="col-md-12">
                                        <label className="labels">New Password</label>
                                        <input type="password"
                                            className="form-control" placeholder="new password" name="retype_password"
                                            onChange={passwordNewChangeHandler}
                                            value={userState.password2} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label">Image</label>
                                        <input className="form-control" type="file" name="image" accept="image/*" id="id_image"
                                            onChange={imageChangeHandler} />
                                    </div>
                                </div>
                                <div className="mt-1 text-center">
                                    <button className="btn btn-primary profile-button" type="submit">Save Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Base>
    );
}

export default UserProfile;