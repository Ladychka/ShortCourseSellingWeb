import React, { useEffect, useState } from "react";
import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link, useParams, useNavigate } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import { API } from "../../utils/apiRoutes";
import Swal from "sweetalert2";

function CourseEdit() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const api = useAxios();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    level: "",
    category: null, 
    image: null,
    file: null, // for image upload
  });
  
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
      try {
        const [courseRes, catRes] = await Promise.all([
            api.get(`${API.INSTRUCTOR_COURSE_DETAIL}${slug}/`),
            api.get(API.CATEGORY_LIST)
        ]);
        
        const c = courseRes.data;
        setCourse({
            ...c,
            description: c.description || "",
            price: c.price || "",
            level: c.level || "Beginner", 
            category: c.category?.id || c.category, 
            file: null 
        });
        setImagePreview(c.image);
        setCategories(catRes.data);
      } catch (error) {
        console.error("Failed to fetch course", error);
        Swal.fire({ title: "Error", text: "Could not fetch course details", icon: "error" });
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const createSection = async () => {
      const { value: title } = await Swal.fire({
          title: "New Section",
          input: "text",
          inputLabel: "Section Title",
          inputPlaceholder: "Enter section title",
          showCancelButton: true
      });

      if (title) {
          try {
              await api.post(API.COURSE_VARIANT_CREATE, { course_id: course.id, title });
              fetchData();
              Swal.fire("Success", "Section created", "success");
          } catch (e) {
              Swal.fire("Error", "Failed to create section", "error");
          }
      }
  };

  const deleteSection = async (id) => {
      const result = await Swal.fire({
          title: "Are you sure?",
          text: "This will delete the section and all its lessons!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
          try {
              await api.delete(`${API.COURSE_VARIANT_DELETE}${id}/`);
              fetchData();
              Swal.fire("Deleted!", "Section has been deleted.", "success");
          } catch (current) {
               Swal.fire("Error", "Failed to delete section", "error");
          }
      }
  };

  const createLesson = async (variantId) => {
    const { value: formValues } = await Swal.fire({
        title: 'Add New Lesson',
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Lesson Title">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Description">' +
            '<div class="my-3"><label>Video File</label><input type="file" id="swal-input3" class="form-control"></div>' +
            '<div class="form-check text-start"><input class="form-check-input" type="checkbox" id="swal-input4"><label class="form-check-label" for="swal-input4">Free Preview</label></div>',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').files[0],
                document.getElementById('swal-input4').checked
            ]
        }
    });

    if (formValues) {
        const [title, description, file, preview] = formValues;
        if (!title) return Swal.fire("Error", "Title is required", "error");

        const formData = new FormData();
        formData.append("variant_id", variantId);
        formData.append("title", title);
        formData.append("description", description);
        if (file) formData.append("file", file);
        formData.append("preview", preview);

        try {
            await api.post(API.COURSE_VARIANT_ITEM_CREATE, formData, { headers: { "Content-Type": "multipart/form-data" } });
            fetchData();
            Swal.fire("Success", "Lesson added", "success");
        } catch (e) {
            Swal.fire("Error", "Failed to add lesson", "error");
        }
    }
  };

  const deleteLesson = async (itemId) => {
      const result = await Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
          try {
              await api.delete(`${API.COURSE_VARIANT_ITEM_DELETE}${itemId}/`);
              fetchData();
              Swal.fire("Deleted!", "Lesson has been deleted.", "success");
          } catch (e) {
              Swal.fire("Error", "Failed to delete lesson", "error");
          }
      }
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
    
    // Use FormData for file uploads
    const formData = new FormData();
    formData.append("title", course.title);
    formData.append("description", course.description);
    formData.append("price", course.price);
    formData.append("level", course.level);
    if (course.category) formData.append("category", course.category); // Assuming backend expects ID
    if (course.file) formData.append("image", course.file);

    try {
        await api.put(`${API.INSTRUCTOR_COURSE_DETAIL}${slug}/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        Swal.fire({ title: "Success", text: "Course updated successfully", icon: "success" });
        // Optionally update the slug if title changed, but that's complex as URL changes.
        // For now, assume slug stays stable or we redirect.  
    } catch (error) {
        console.error("Update failed", error);
        Swal.fire({ title: "Error", text: "Failed to update course", icon: "error" });
    } finally {
        setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

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
                            <h1 className="text-white mb-1">Update Course</h1>
                            <p className="mb-0 text-white lead fw-bold">
                              {course.title || "Untitled Course"}
                            </p>
                          </div>
                          <div>
                            <Link
                              to="/instructor/courses/"
                              className="btn"
                              style={{ backgroundColor: "white" }}
                            >
                              {" "}
                              <i className="fas fa-arrow-left"></i> Back to Courses
                            </Link>
                            <button
                              type="submit"
                              className="btn btn-dark ms-2"
                              disabled={saving}
                            >
                              {saving ? "Saving..." : "Save"} <i className="fas fa-check-circle"></i>
                            </button>
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
                      <label htmlFor="courseThumbnail" className="form-label">
                        Thumbnail Preview
                      </label>
                      <img
                        style={{
                          width: "100%",
                          height: "330px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                        className="mb-4"
                        src={imagePreview || "https://via.placeholder.com/750x422"}
                        alt=""
                      />
                      <div className="mb-3">
                        <label htmlFor="courseThumbnail" className="form-label">
                          Course Thumbnail
                        </label>
                        <input
                          id="courseThumbnail"
                          className="form-control"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="courseTitle" className="form-label">
                          Title
                        </label>
                        <input
                          id="courseTitle"
                          className="form-control"
                          type="text"
                          name="title"
                          value={course.title}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Course Category</label>
                        <select 
                            className="form-select" 
                            name="category"
                            value={course.category || ""}
                            onChange={handleChange}
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
                          className="form-control"
                          rows="6"
                            value={course.description}
                            onChange={handleChange}
                        ></textarea>
                      </div>
                      <label htmlFor="coursePrice" className="form-label">
                        Price ($)
                      </label>
                      <input
                        id="coursePrice"
                        className="form-control"
                        type="number"
                        name="price"
                        value={course.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Curriculum Section */}
                  <div className="card mb-3">
                    <div className="card-header border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
                      <h4 className="mb-0">Curriculum</h4>
                      <button type="button" className="btn btn-primary btn-sm" onClick={createSection}>
                        <i className="fas fa-plus"></i> Add Section
                      </button>
                    </div>
                    <div className="card-body">
                        {course.curriculum?.map((variant) => (
                            <div key={variant.id} className="border p-3 rounded mb-3 bg-light">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="mb-0">{variant.title}</h5>
                                    <div>
                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteSection(variant.id)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="list-group list-group-flush mb-3">
                                    {variant.variant_items?.map((item) => (
                                        <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-white rounded my-1 shadow-sm">
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-play-circle text-primary me-2"></i>
                                                <div>
                                                    <span className="fw-bold">{item.title}</span>
                                                    {item.preview && <span className="badge bg-info ms-2">Preview</span>}
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-outline-danger btn-sm border-0" onClick={() => deleteLesson(item.id)}>
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    ))}
                                    {(!variant.variant_items || variant.variant_items.length === 0) && (
                                        <div className="text-center p-2 text-muted small">No lessons yet</div>
                                    )}
                                </div>

                                <button type="button" className="btn btn-outline-secondary btn-sm w-100" onClick={() => createLesson(variant.id)}>
                                    <i className="fas fa-plus"></i> Add Lesson
                                </button>
                            </div>
                        ))}
                    </div>
                  </div>

                  <button
                    className="btn btn-lg btn-success w-100 mt-2"
                    type="submit"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"} <i className="fas fa-check-circle"></i>
                  </button>
                </section>
              </form>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default CourseEdit;