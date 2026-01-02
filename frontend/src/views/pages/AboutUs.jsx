import React from 'react';
import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';

function AboutUs() {
    return (
        <>
            <BaseHeader />
            
            <section className="py-7 py-lg-8 hero-gradient" style={{ marginTop: '80px' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h1 className="display-4 fw-bold mb-3">Empowering Learners Worldwide</h1>
                            <p className="lead text-muted mb-0">We believe in adequate education for everyone. Join us in our journey to democratize learning.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <div className="pe-lg-5">
                                <h2 className="mb-4 fw-bold">Our Mission</h2>
                                <p className="mb-4">
                                    Our mission is to make high-quality education accessible to everyone, everywhere. 
                                    We are building a platform that connects learners with the best instructors 
                                    around the globe, fostering a community of growth and innovation.
                                </p>
                                <p>
                                    Whether you want to learn a new skill, advance your career, or just explore a hobby, 
                                    we provide the tools and resources you need to succeed.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src="/about-us-hero.png" alt="About Us" className="img-fluid rounded-3 shadow-lg" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-12 mb-5">
                            <h2 className="fw-bold">Our Impact</h2>
                            <p className="text-muted">Trusted by learners and instructors worldwide.</p>
                        </div>
                    </div>
                    <div className="row g-4 justify-content-center">
                        <div className="col-6 col-md-3">
                            <div className="card shadow-sm border-0 h-100 py-4">
                                <div className="card-body text-center">
                                    <h2 className="display-4 fw-bold text-primary mb-1">16</h2>
                                    <span className="text-muted">Instructors</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card shadow-sm border-0 h-100 py-4">
                                <div className="card-body text-center">
                                    <h2 className="display-4 fw-bold text-primary mb-1">16</h2>
                                    <span className="text-muted">Courses</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card shadow-sm border-0 h-100 py-4">
                                <div className="card-body text-center">
                                    <h2 className="display-4 fw-bold text-primary mb-1">16</h2>
                                    <span className="text-muted">Students</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-md-3">
                            <div className="card shadow-sm border-0 h-100 py-4">
                                <div className="card-body text-center">
                                    <h2 className="display-4 fw-bold text-primary mb-1">16</h2>
                                    <span className="text-muted">Countries</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BaseFooter />
        </>
    );
}

export default AboutUs;
