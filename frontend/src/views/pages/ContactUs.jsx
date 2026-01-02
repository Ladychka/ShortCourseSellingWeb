import React from 'react';
import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';

function ContactUs() {
    return (
        <>
            <BaseHeader />
            
            <section className="py-7 py-lg-8 hero-gradient" style={{ marginTop: '80px' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h1 className="display-4 fw-bold mb-3">Get in Touch</h1>
                            <p className="lead text-muted mb-0">Have questions or feedback? We'd love to hear from you.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6">
                            <h2 className="fw-bold mb-4">Send us a message</h2>
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-control" placeholder="John Doe" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email Address</label>
                                        <input type="email" className="form-control" placeholder="john@example.com" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Subject</label>
                                        <input type="text" className="form-control" placeholder="How can we help?" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Message</label>
                                        <textarea className="form-control" rows="5" placeholder="Your message here..."></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary rounded-pill px-4" onClick={(e) => e.preventDefault()}>Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6">
                            <div className="ps-lg-5">
                                <h2 className="fw-bold mb-4">Contact Information</h2>
                                <p className="mb-4 text-muted">Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.</p>
                                
                                <div className="d-flex mb-4">
                                    <div className="flex-shrink-0 btn-light-primary btn-icon rounded-circle me-3">
                                        <i className="fas fa-map-marker-alt fs-4 text-primary p-2"></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <h5 className="fw-bold mb-1">Our Location</h5>
                                        <p className="text-muted mb-0">Hanoi Street, Phnom Penh, Cambodia</p>
                                    </div>
                                </div>

                                <div className="d-flex mb-4">
                                    <div className="flex-shrink-0 btn-light-primary btn-icon rounded-circle me-3">
                                        <i className="fas fa-envelope fs-4 text-primary p-2"></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <h5 className="fw-bold mb-1">Email Us</h5>
                                        <p className="text-muted mb-0">support@codesprout.com</p>
                                        <p className="text-muted mb-0">ladychkatheceo@codesprout.com</p>
                                    </div>
                                </div>

                                <div className="d-flex">
                                    <div className="flex-shrink-0 btn-light-primary btn-icon rounded-circle me-3">
                                        <i className="fas fa-phone-alt fs-4 text-primary p-2"></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <h5 className="fw-bold mb-1">Call Us</h5>
                                        <p className="text-muted mb-0">(+855)719 692 900</p>
                                    </div>
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

export default ContactUs;
