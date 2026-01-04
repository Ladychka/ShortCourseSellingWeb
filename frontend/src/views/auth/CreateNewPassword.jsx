import { useState } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import apiInstance from "../../utils/axios";
import { useNavigate, useSearchParams } from "react-router-dom";

function CreateNewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const otp = searchParams.get("otp");
  const uuidb64 = searchParams.get("uuidb64");
  const refresh_token = searchParams.get("refresh_token");

  const handleCreateNewPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (confirmPassword !== password) {
      alert("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const formdata = new FormData();
    formdata.append("password", password);
    formdata.append("otp", otp);
    formdata.append("uidb64", uuidb64);
    formdata.append("refresh_token", refresh_token);

    try {
      const res = await apiInstance.post("user/create-new-password/", formdata);
      console.log(res.data.message);
      setIsLoading(false);
      navigate("/login"); // optional
    } catch (error) {
      console.log("error: ", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <BaseHeader />
      <section
        className="container d-flex flex-column vh-100 align-items-center justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xxl-5">
            <div className="card shadow border-0" style={{borderRadius: '20px'}}>
              <div className="card-body p-5">
                <div className="mb-4">
                  <h1 className="mb-1 fw-bold display-6" style={{color: '#1f2937'}}>Create New Password</h1>
                  <span className="text-muted">Choose a new password for your account</span>
                </div>
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleCreateNewPassword}
                >
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-medium text-dark">
                      Enter New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="**************"
                      required
                      style={{backgroundColor: '#eef2f6', border: 'none', padding: '12px'}}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label fw-medium text-dark">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control"
                      placeholder="**************"
                      required
                      style={{backgroundColor: '#eef2f6', border: 'none', padding: '12px'}}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className="d-grid">
                    {isLoading ? (
                      <button type="submit" className="btn btn-primary btn-lg" disabled>
                        Processing <i className="fas fa-spinner fa-spin"></i>
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary btn-lg" style={{backgroundColor: '#4b5563', borderColor: '#4b5563'}}>
                        Save New Password{" "}
                        <i className="fas fa-check-circle ms-2"></i>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BaseFooter />
    </>
  );
}

export default CreateNewPassword
