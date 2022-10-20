import React, { useContext } from 'react';
import UserContext from '../../auth/user-context';
import styles from './Header.module.css';
import { Link, withRouter } from "react-router-dom";
import logo from '../../assets/Stocks Monitor-logos_transparent.png';
const Header = () => {
    const userCtx = useContext(UserContext);

    const logoutHandler = () => {
        userCtx.updateToken('0');
    }

    return (
        // <!-- Navbar -->
        <nav className="navbar navbar-expand-lg navbar-light main_color">
            {/* <!-- Container wrapper --> */}
            <div className="container-fluid">
                {/* <!-- Toggle button --> */}
                <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>

                {/* <!-- Collapsible wrapper --> */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* <!-- Navbar brand --> */}
                    <a className="navbar-brand" >
                        <img src={logo} height="80px" width="200px"
                            alt="" loading="lazy" />
                    </a>
                    {/* <!-- Left links --> */}
                    <ul className="navbar-nav">
                        <li className={`${styles.item} nav-item`}>
                            <Link className={`${styles.main_text}  nav-link m-3 main_text nav_btn`} to="/">Latest News </Link>
                        </li>
                        {
                            userCtx.isAuthenticated() &&
                            <React.Fragment>
                                <li className={`${styles.item} nav-item`}>
                                    <Link className={`${styles.main_text}  nav-link m-3  main_text nav_btn`} to="/user-stocks">My Stocks</Link>
                                </li>

                                <li className={`${styles.item} nav-item`}>
                                    <Link className={`${styles.main_text} nav-link m-3  main_text nav_btn`} to="/add_stock">Add Favourite Stocks</Link>
                                </li>
                            </React.Fragment>
                        }

                    </ul>
                    {/* <!-- Left links --> */}
                </div>
                {/* <!-- Collapsible wrapper --> */}

                {/* <!-- Right elements --> */}
                <div className="d-flex align-items-center">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            userCtx.isAuthenticated() &&
                            <React.Fragment>
                                <li className={`${styles.item} nav-item`}>
                                    <Link className={`${styles.main_text} nav-link  m-3 main_text nav_btn`} to="/user_profile">My Profile</Link>
                                </li>


                                <li className={`${styles.item} nav-item`}>
                                    <Link className={`${styles.main_text} nav-link  m-3 main_text nav_btn`} to="/" onClick={logoutHandler}>Signout</Link>
                                </li>
                            </React.Fragment>
                        }
                        {
                            !userCtx.isAuthenticated() &&
                            <React.Fragment>

                                <li className={`${styles.item} nav-item`}>
                                    <Link className={`${styles.main_text} nav-link  m-3 main_text nav_btn`} to="/signin">Signin</Link>
                                </li>
                                <li className={`${styles.item} nav-item`}>
                                    <Link className={`${styles.main_text} nav-link m-3 main_text nav_btn`} to="/signup">Signup</Link>
                                </li>
                            </React.Fragment>
                        }

                    </ul>
                    <a className="d-flex align-items-center mx-3" href="#"
                        id="navbarDropdownMenuAvatar" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                        <img
                            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                            className="rounded-circle" height="25"
                            alt="Black and White Portrait of a Man"
                            loading="lazy" />
                    </a>
                </div>
                {/* <!-- Right elements --> */}
            </div>
            {/* <!-- Container wrapper --> */}
        </nav>
        // <!-- Navbar -->
    );
}

export default Header;