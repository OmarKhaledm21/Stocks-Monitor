import styles from './Footer.module.css';

const Footer = () => {
    return (
        // < !--Footer -- >
        <footer className="text-center text-lg-start mt-2 main_color">
            {/* <!-- Section: Social media --> */}
            <section className="d-flex justify-content-center  p-4 sec_color">
                {/* <!-- Left --> */}
                <div className="me-5 d-none d-lg-block main_text">
                    <span>Get connected with us on social networks:</span>
                </div>
                {/* <!-- Left --> */}

                {/* <!-- Right --> */}
                <div className="main_text">

                    <a href="https://www.linkedin.com/in/omarkhaledm21/" className="me-4 text-reset">
                        <i className="fa fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/OmarKhaledm21" className="me-4 text-reset">
                        <i className="fa fa-github"></i>
                    </a>
                </div>
                {/* <!-- Right --> */}
            </section>
            {/* <!-- Section: Social media --> */}

            {/* <!-- Section: Links  --> */}
            <section className="main_text">
                <div className="container text-center text-md-start mt-5">
                    {/* <!-- Grid row --> */}
                    <div className="row mt-3">
                        {/* <!-- Grid column --> */}
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            {/* <!-- Content --> */}
                            <h6 className="text-uppercase fw-bold mb-4">
                                Project Idea
                            </h6>
                            <p>
                                This project is a simple social application where users are able to join some
                                community consisting of people with same interests, users can share posts in this community and only users
                                that are members of this community can view posts.<br />
                                User can be part of many community and see posts from all communities on his home page.
                            </p>
                        </div>
                        {/* <!-- Grid column --> */}

                        {/* <!-- Grid column --> */}
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            {/* <!-- Links --> */}
                            <h6 className="text-uppercase fw-bold mb-4">
                                Projects
                            </h6>
                            <p>
                                <a href="https://github.com/OmarKhaledm21/E-Commerce-Website-Fullstack-project" className="text-reset">
                                    E-Commerce Fullstack Online Store
                                </a>
                            </p>
                            <p>
                                <a href="https://github.com/OmarKhaledm21/EarthQuakeReport_AndroidNative-API-JSON" className="text-reset">
                                    Earth Quake Report Android Application</a>
                            </p>
                            <p>
                                <a href="https://github.com/OmarKhaledm21/Disk-Scheduling-Algorithms" className="text-reset">Disk Scheduling Algorithms + Visualizer</a>
                            </p>
                            <p>
                                <a href="https://github.com/OmarKhaledm21/Blog-Project-Python-Django-" className="text-reset">Personal Blog</a>
                            </p>
                        </div>
                        {/* <!-- Grid column --> */}



                        {/* <!-- Grid column --> */}
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            {/* <!-- Links --> */}
                            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                            <p><i className="fa fa-home me-3"></i> Cairo, Egypt</p>
                            <p>
                                <i className="fa fa-envelope me-3"></i>
                                omarkhaledm21@gmail.com
                            </p>
                            <p><i className="fa fa-phone me-3"></i> + 02 101 366 5215</p>
                            <a href="https://drive.google.com/file/d/1_8ALxjB290GBuU9Pj2X9sRTyiaBVRonG/view?usp=sharing"
                                style={{ color: 'black' }}>
                                <p><i className="fa fa-print me-3"></i>Check CV</p>

                            </a>
                        </div>
                        {/* <!-- Grid column --> */}
                    </div>
                    {/* <!-- Grid row --> */}
                </div>
            </section>
            {/* <!-- Section: Links  --> */}

            {/* <!-- Copyright --> */}
            <div className={`text-center p-4 main_text ${styles.bottom_section}`}>
                Check source code for this project here &nbsp;
                <a className="text-reset fw-bold" href="https://github.com/OmarKhaledm21/Readit-Social-App">Github Repo</a>
            </div>
            {/* <!-- Copyright --> */}
        </footer>
    );
}

export default Footer;    