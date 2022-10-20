import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../auth/user-context";
import { signin } from '../../auth/helper/userapicalls';
import { Link, Redirect } from "react-router-dom"
import Base from "../../Base";
const Signin = (props) => {
    const userCtx = useContext(UserContext);

    const [errorStatus, setErrorStatus] = useState(false);
    const [errorState, setErrorState] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    const usernameRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        let mounted = true;
        if (userInfo !== null) {
            signin(userInfo).then(data => {
                if (mounted && data.code === '1') {
                    userCtx.updateToken(data.token)
                    userCtx.fetchData(data.token);
                } else if (mounted && data.code === '0') {
                    setErrorStatus(true);
                    setErrorState([data['error']]);
                }
            });
        };
        return () => mounted = false;
    }, [userInfo])

    const performRedirect = () => {
        if (userCtx.isAuthenticated()) {
            return <Redirect to="/" />
        } else {
            return <br />
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (usernameRef.current.value.trim().length > 0 && passwordRef.current.value.trim().length > 0) {
            setErrorState([])
            setErrorStatus(false);
            setUserInfo({
                username: usernameRef.current.value.trim(),
                password: passwordRef.current.value.trim()
            });
        } else {
            setErrorState(['No empty fields allowed!']);
            setErrorStatus(true);
        }
    }

    const errors_list = errorState.map((error, id) => {
        return <div key={id} className="alert text-center col-4 alert-danger"> {error}</div>
    })

    return (
        <Base>
            <div className="row m-5 justify-content-center">
                {errorStatus && <div className="row justify-content-center">
                    {errors_list}
                </div>}
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-3 row justify-content-center">
                        <div className="d-block text-center">
                            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Username</label>
                        </div>
                        <div className="col-6">
                            <input type="text" className="form-control" id="username" ref={usernameRef} />
                        </div>
                    </div>
                    <div className="mb-3 row justify-content-center text-center">
                        <div className="d-block">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                        </div>
                        <div className="col-6">
                            <input type="password" className="form-control" id="password" ref={passwordRef} />
                        </div>
                    </div>

                    <div className="mb-3 row justify-content-center">
                        <div className="col-3 d-grid gap-2">
                            <button className="btn btn-secondary" type="submit">Signin</button>
                        </div>
                    </div>
                </form>
            </div>
            {performRedirect()}
        </Base>

    );
}

export default Signin;