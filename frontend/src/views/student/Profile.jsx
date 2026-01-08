import React, { useState, useEffect } from 'react'
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import useAxios from '../../utils/useAxios'
import { setUser } from '../../utils/auth'
import Swal from 'sweetalert2'

function Profile() {
  const [profileData, setProfileData] = useState({
    image: '',
    full_name: '',
    about: '',
    country: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('user/profile/update/');
      setProfileData({
        image: res.data.image,
        full_name: res.data.user.full_name,
        about: res.data.about,
        country: res.data.country,
      });
      setImagePreview(res.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('full_name', profileData.full_name);
    formData.append('about', profileData.about);
    formData.append('country', profileData.country);
    if (profileData.image instanceof File) {
      formData.append('image', profileData.image);
    }

    try {
        const res = await axios.patch('user/profile/update/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        setProfileData({
          image: res.data.image,
          full_name: res.data.user.full_name,
          about: res.data.about,
          country: res.data.country,
        });
        setImagePreview(res.data.image);
        await setUser(); // Refresh accessible user info if stored in cookies/localstorage
        
        Swal.fire({
            icon: 'success',
            title: 'Profile Updated',
            text: 'Your profile has been updated successfully.'
        });
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong. Please try again.'
        });
    } finally {
        setLoading(false);
    }
  };

  return (
    <>
      <BaseHeader />

      <section className="pt-5 pb-5">
        <div className="container">
          {/* Header Here */}
          <Header />
          <div className="row mt-0 mt-md-4">
            {/* Sidebar Here */}
            <Sidebar />
            <div className="col-lg-9 col-md-8 col-12">
              {/* Card */}
              <div className="card">
                {/* Card header */}
                <div className="card-header">
                  <h3 className="mb-0">Profile Details</h3>
                  <p className="mb-0">
                    You have full control to manage your own account setting.
                  </p>
                </div>
                {/* Card body */}
                <form className="card-body" onSubmit={handleSubmit}>
                  <div className="d-lg-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center mb-4 mb-lg-0">
                      <img
                        src={imagePreview || "https://eduport.webestica.com/assets/images/avatar/09.jpg"}
                        id="img-uploaded"
                        className="avatar-xl rounded-circle"
                        alt="avatar"
                        style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
                      />
                      <div className="ms-3">
                        <h4 className="mb-0">Your avatar</h4>
                        <p className="mb-0">
                          PNG or JPG no bigger than 800px wide and tall.
                        </p>
                        <input type="file" className='form-control mt-3' name="image" onChange={handleFileChange} />
                      </div>
                    </div>
                  </div>
                  <hr className="my-5" />
                  <div>
                    <h4 className="mb-0">Personal Details</h4>
                    <p className="mb-4">Edit your personal information and address.</p>
                    {/* Form */}
                    <div className="row gx-3">
                      {/* First name */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="fname">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fname"
                          name="full_name"
                          className="form-control"
                          placeholder="Full Name"
                          value={profileData.full_name}
                          onChange={handleInputChange}
                        />
                        <div className="invalid-feedback">Please enter first name.</div>
                      </div>
                      {/* Last name */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="about">
                          About Me
                        </label>
                        <textarea 
                            name="about" 
                            id="about" 
                            cols="30" 
                            rows="5" 
                            className='form-control'
                            value={profileData.about}
                            onChange={handleInputChange}
                        ></textarea>
                        <div className="invalid-feedback">Please enter last name.</div>
                      </div>

                      {/* Country */}
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="country">
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          className="form-control"
                          placeholder="Country"
                          value={profileData.country}
                          onChange={handleInputChange}
                        />
                        <div className="invalid-feedback">Please choose country.</div>
                      </div>
                      <div className="col-12">
                        {/* Button */}
                        <button className="btn btn-primary" type="submit" disabled={loading}>
                          {loading ? 'Updating...' : 'Update Profile'} <i className='fas fa-check-circle'></i>
                        </button>
                      </div>
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

export default Profile