import React from "react";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";

const Base = (props) => {
    return (
        <React.Fragment>
            <Header />
            {props.children}
            <Footer />
        </React.Fragment>
    );
}

export default Base;