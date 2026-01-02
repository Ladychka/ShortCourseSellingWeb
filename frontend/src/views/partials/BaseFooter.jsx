import React from 'react';
import { Link } from 'react-router-dom';

function BaseFooter() {
  return (
    <footer className="pt-5 pb-3 mt-5" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)', backdropFilter: 'blur(10px)' }}>
      <div className="container">
        <div className="row g-4">
          
          <div className="col-lg-4 col-md-6">
            <div className="mb-4">
              <h3 className="fw-bold mb-3 text-gradient">Code Sprout</h3>
              <p className="text-muted small mb-4">
                 Code Sprout provides high-quality components and a beautiful Bootstrap UIKit for developers, built for the modern web.
              </p>
              
              <div className="d-flex gap-3">
                <a href="https://www.facebook.com/gvechika" className="text-muted hover-primary transition">
                  <i className="bi bi-facebook fs-5"></i>
                 </a>
                 <a href="https://github.com/Ladychka" className="text-muted hover-primary transition">
                  <i className="bi bi-github fs-5"></i>
                 </a>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="fw-bold mb-3 text-main">Company</h5>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/pages/about-us/" className="text-muted text-decoration-none hover-primary">About</Link></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none hover-primary">Pricing</a></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none hover-primary">Blog</a></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none hover-primary">Careers</a></li>
              <li className="mb-2"><Link to="/pages/contact-us/" className="text-muted text-decoration-none hover-primary">Contact</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="fw-bold mb-3 text-main">Support</h5>
            <ul className="list-unstyled small">
               <li className="mb-2"><a href="#" className="text-muted text-decoration-none hover-primary">Help & Support</a></li>
               <li className="mb-2"><a href="#" className="text-muted text-decoration-none hover-primary">Become Instructor</a></li>
               <li className="mb-2"><a href="#" className="text-muted text-decoration-none hover-primary">Get the App</a></li>
               <li className="mb-2"><a href="#" className="text-muted text-decoration-none hover-primary">FAQ's</a></li>
               <li className="mb-2"><a href="#" className="text-muted text-decoration-none hover-primary">Tutorial</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12">
            <h5 className="fw-bold mb-3 text-main">Get in Touch</h5>
            <ul className="list-unstyled small text-muted">
                <li className="mb-3 d-flex align-items-start">
                    <i className="bi bi-geo-alt me-2 mt-1 text-primary"></i>
                    <span>Hanoi Street, Phnom Penh, Cambodia</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                    <i className="bi bi-envelope me-2 text-primary"></i>
                    <a href="mailto:support@codesprout.com" className="text-muted text-decoration-none">support@codesprout.com</a>
                </li>
                 <li className="mb-3 d-flex align-items-center">
                    <i className="bi bi-envelope me-2 text-primary"></i>
                    <span>CEO: <a href="mailto:ladychkatheceo@codesprout.com" className="text-muted text-decoration-none">ladychkatheceo@codesprout.com</a></span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                    <i className="bi bi-telephone me-2 text-primary"></i>
                    <span>(+855) 719 692 900</span>
                </li>
            </ul>
            
            <div className="d-flex gap-2">
                <a href="#" className="btn btn-outline-primary btn-sm d-inline-flex align-items-center">
                    <i className="bi bi-apple me-2"></i> App Store
                </a>
                 <a href="#" className="btn btn-outline-primary btn-sm d-inline-flex align-items-center">
                    <i className="bi bi-google-play me-2"></i> Play Store
                </a>
            </div>

          </div>
        </div>

        <hr className="my-5 border-secondary opacity-25" />

        <div className="row align-items-center medium">
           <div className="col-md-6 text-center text-md-start">
              <p className="small text-muted mb-0">&copy; {new Date().getFullYear()} Code Sprout. All Rights Reserved.</p>
           </div>
           <div className="col-md-6 text-center text-md-end">
              <ul className="list-inline mb-0 small">
                  <li className="list-inline-item"><a href="#" className="text-muted text-decoration-none hover-primary">Privacy Policy</a></li>
                  <li className="list-inline-item ms-3"><a href="#" className="text-muted text-decoration-none hover-primary">Cookie Notice</a></li>
                   <li className="list-inline-item ms-3"><a href="#" className="text-muted text-decoration-none hover-primary">Terms of Use</a></li>
              </ul>
           </div>
        </div>

      </div>
    </footer>
  );
}

export default BaseFooter;