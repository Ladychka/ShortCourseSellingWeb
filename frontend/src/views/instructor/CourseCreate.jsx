import React, { useState, useEffect } from 'react';
import Sidebar from './Partials/Sidebar';
import Header from './Partials/Header';
import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../../utils/useAxios';
import { API } from '../../utils/apiRoutes';
import Swal from 'sweetalert2';

function CourseCreate() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    level: "Beginner",
    category: "",
    image: null,
    file: null, // for image upload
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);

  const api = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get(API.CATEGORY_LIST);
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse({ ...course, file: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (!course.title || !course.category || !course.price) {
        Swal.fire({ title: "Error", text: "Please fill in all required fields", icon: "warning" });
        setSaving(false);
        return;
    }

    const formData = new FormData();
    formData.append("title", course.title);
    formData.append("description", course.description);
    formData.append("price", course.price);
    formData.append("level", course.level);
    formData.append("category", course.category);
    if (course.file) {
        formData.append("image", course.file);
        formData.append("file", course.file); // Backend might expect 'file' as well for some other logic
    }

    try {
      await api.post(API.COURSE_CREATE, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({ title: "Success", text: "Course created successfully!", icon: "success" }).then(() => {
          navigate('/instructor/courses/');
      });
    } catch (error) {
      console.error("Create failed", error);
      Swal.fire({ title: "Error", text: "Failed to create course", icon: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <BaseHeader />

      <section className="pb-5" style={{ paddingTop: "120px" }}>
        <div className="container">
          <Header />
          <div className="row mt-0 mt-md-4">
            <Sidebar />
            <div className="col-lg-9 col-md-8 col-12">
              <form onSubmit={handleSubmit}>
                <section className="py-4 py-lg-6 bg-primary rounded-3">
                  <div className="container">
                    <div className="row">
                      <div className="offset-lg-1 col-lg-10 col-md-12 col-12">
                        <div className="d-lg-flex align-items-center justify-content-between">
                          <div className="mb-4 mb-lg-0">
                            <h1 className="text-white mb-1">Add New Course</h1>
                            <p className="mb-0 text-white lead">
                              Just fill the form and create your courses.
                            </p>
                          </div>
                          <div>
                            <Link to="/instructor/courses/" className="btn" style={{ backgroundColor: "white" }}> <i className='fas fa-arrow-left'></i> Back to Courses</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="pb-8 mt-5">
                  <div className="card mb-3">
                    <div className="card-header border-bottom px-4 py-3">
                      <h4 className="mb-0">Basic Information</h4>
                    </div>
                    <div className="card-body">
                      <label htmlFor="courseThumbnail" className="form-label">Thumbnail Preview</label>
                      <img 
                        style={{ width: "100%", height: "330px", objectFit: "cover", borderRadius: "10px" }} 
                        className='mb-4' 
                        src={imagePreview || "https://via.placeholder.com/750x422"} 
                        alt="Preview" 
                      />
                      <div className="mb-3">
                        <label htmlFor="courseThumbnail" className="form-label">Course Thumbnail</label>
                        <input
                          id="courseThumbnail"
                          className="form-control"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="courseTitle" className="form-label">
                          Title <span className="text-danger">*</span>
                        </label>
                        <input
                          id="courseTitle"
                          className="form-control"
                          type="text"
                          name="title"
                          placeholder="Introduction to React"
                          value={course.title}
                          onChange={handleChange}
                          required
                        />
                        <small>Write a 60 character course title.</small>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Category <span className="text-danger">*</span></label>
                        <select 
                            className="form-select"
                            name="category"
                            value={course.category}
                            onChange={handleChange}
                            required
                        >
                          <option value="">Select Category</option>
                          {categories.map(c => (
                              <option key={c.id} value={c.id}>{c.title}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Level</label>
                        <select 
                            className="form-select"
                            name="level"
                            value={course.level}
                            onChange={handleChange}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Course Description</label>
                        <textarea 
                            name="description" 
                            className='form-control' 
                            rows="6"
                            value={course.description}
                            onChange={handleChange}
                        ></textarea>
                      </div>
                      <label htmlFor="coursePrice" className="form-label">
                        Price ($) <span className="text-danger">*</span>
                      </label>
                      <input
                        id="coursePrice"
                        className="form-control"
                        type="number"
                        placeholder="20.99"
                        name="price"
                        value={course.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                    <button 
                        className='btn btn-lg btn-success w-100 mt-2' 
                        type='submit'
                        disabled={saving}
                    >
                        {saving ? 'Creating...' : 'Create Course'} <i className='fas fa-check-circle'></i>
                    </button>
                </section>
              </form>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  )
}

export default CourseCreate
