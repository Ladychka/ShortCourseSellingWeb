import { useEffect, useState } from "react";
import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import { Link } from 'react-router-dom';
import apiInstance from "../../utils/axios";


function ForgotPassword() {
const [email, setEmail] = useState("");
const [isLoading, setIsLoading] = useState(false);

const handleEmailChange = async(e) => {
  e.preventDefault();

  try {
    await apiInstance.get(`user/password-reset/${email}/`).then((res) => {
      console.log(res.data);
      setIsLoading(false);
      alert("Password reset link has been sent to your email address.");
    });
  } catch (error) {
    console.log("error: ", error);
    setIsLoading(false);
  }
};

  return (
    <>
      <BaseHeader />

      <section className="container d-flex flex-column vh-100 align-items-center justify-content-center" style={{ marginTop: "100px" }}>
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xxl-5">
            <div className="card shadow border-0" style={{borderRadius: '20px'}}>
              <div className="card-body p-5">
                <div className="mb-4">
                  <h1 className="mb-1 fw-bold display-6" style={{color: '#1f2937'}}>Forgot Password</h1>
                  <span className="text-muted">
                    Let's help you get back into your account
                  </span>
                </div>
                <form className="needs-validation" noValidate="" onSubmit={handleEmailChange}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-medium text-dark">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="lala@gmail.com"
                      required=""
                      style={{backgroundColor: '#eef2f6', border: 'none', padding: '12px'}}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="d-grid">
                      {isLoading === true && (
                        <button type="button" className="btn btn-primary btn-lg" disabled>
                          Sending...
                        </button>
                      )}
                      {!isLoading && (
                        <button type="submit" className="btn btn-primary btn-lg" style={{backgroundColor: '#4b5563', borderColor: '#4b5563'}}>
                          Reset Password <i className='fas fa-arrow-right ms-2'></i>
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  )
}

export default ForgotPassword