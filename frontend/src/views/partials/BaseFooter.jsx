import React from 'react';

function BaseFooter() {
  return (
    <footer className="footer bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row g-4">
          
          <div className="col-lg-4 col-md-6">
            <div className="mb-4">
              <h3 className="fw-bold mb-3 text-white">Code Sprout</h3>
              <p className="text-white-50 small mb-4">
                 Code Sprout provides high-quality components and a beautiful Bootstrap UIKit for developers, built for the modern web.
              </p>
              
              <div className="d-flex gap-3">
                <a href="https://www.facebook.com/gvechika" className="text-white-50 hover-text-white transition">
                  <i className="bi bi-facebook fs-5"></i>
                 </a>
                 <a href="https://github.com/Ladychka" className="text-white-50 hover-text-white transition">
                  <i className="bi bi-github fs-5"></i>
                 </a>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="fw-bold mb-3 text-white">Company</h5>
            <ul className="list-unstyled small">
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">About</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Pricing</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Blog</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Careers</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Contact</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h5 className="fw-bold mb-3 text-white">Support</h5>
            <ul className="list-unstyled small">
               <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Help & Support</a></li>
               <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Become Instructor</a></li>
               <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Get the App</a></li>
               <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">FAQ's</a></li>
               <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-text-white">Tutorial</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12">
            <h5 className="fw-bold mb-3 text-white">Get in Touch</h5>
            <ul className="list-unstyled small text-white-50">
                <li className="mb-3 d-flex align-items-start">
                    <i className="bi bi-geo-alt me-2 mt-1"></i>
                    <span>Hanoi Street, Phnom Penh, Cambodia</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                    <i className="bi bi-envelope me-2"></i>
                    <a href="mailto:codesprout@gmail.com" className="text-white-50 text-decoration-none">codesprout@gmail.com</a>
                </li>
                 <li className="mb-3 d-flex align-items-center">
                    <i className="bi bi-envelope me-2"></i>
                    <span>CEO: <a href="mailto:ladychka16@gmail.com" className="text-white-50 text-decoration-none">ladychka16@gmail.com</a></span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                    <i className="bi bi-telephone me-2"></i>
                    <span>(+855) 719 692 900</span>
                </li>
            </ul>
            
            <div className="d-flex gap-2">
                <a href="#" className="btn btn-outline-light btn-sm d-inline-flex align-items-center">
                    <i className="bi bi-apple me-2"></i> App Store
                </a>
                 <a href="#" className="btn btn-outline-light btn-sm d-inline-flex align-items-center">
                    <i className="bi bi-google-play me-2"></i> Play Store
                </a>
            </div>

          </div>
        </div>

        <hr className="my-5 border-secondary" />

        <div className="row align-items-center medium">
           <div className="col-md-6 text-center text-md-start">
              <p className="small text-white-50 mb-0">&copy; {new Date().getFullYear()} Code Sprout. All Rights Reserved.</p>
           </div>
           <div className="col-md-6 text-center text-md-end">
              <ul className="list-inline mb-0 small">
                  <li className="list-inline-item"><a href="#" className="text-white-50 text-decoration-none">Privacy Policy</a></li>
                  <li className="list-inline-item ms-3"><a href="#" className="text-white-50 text-decoration-none">Cookie Notice</a></li>
                   <li className="list-inline-item ms-3"><a href="#" className="text-white-50 text-decoration-none">Terms of Use</a></li>
              </ul>
           </div>
        </div>

      </div>
       <style jsx>{`
        .hover-text-white:hover {
            color: #fff !important;
        }
        .transition {
            transition: all 0.2s ease;
        }
      `}</style>
    </footer>
  );
}

export default BaseFooter;