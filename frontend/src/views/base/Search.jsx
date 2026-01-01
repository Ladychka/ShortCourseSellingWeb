import React, { useState, useEffect } from "react";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link, useSearchParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import { API } from "../../utils/apiRoutes";
import useCartStore from "../../store/cart";
import Swal from 'sweetalert2';

function Search() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const api = useAxios();
  const { addToCart } = useCartStore();

  const handleAddToCart = (course) => {
      addToCart(course);
      Swal.fire({
          icon: 'success',
          title: 'Added to Cart',
          text: 'Course has been added to your cart!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
      });
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`${API.SEARCH_COURSES}?q=${query || ''}`);
        setCourses(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [query]);

  return (
    <>
      <BaseHeader />

      <section className="section-padding" style={{ marginTop: "80px" }}>
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="mb-2 h1 fw-bold text-gradient">
                {query ? `Results for "${query}"` : "Explore Courses"}
              </h2>
              <p className="lead text-muted">Discover the best courses to elevate your skills</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {isLoading ? (
                  <div className="col-12 text-center py-5">
                      <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
                          <span className="visually-hidden">Loading...</span>
                      </div>
                  </div>
                ) : courses.length > 0 ? (
                  courses.map((course) => (
                    <div className="col" key={course.id}>
                      <div className="card h-100 border-0 shadow-sm glass overflow-hidden">
                        <Link to={`/course-detail/${course.slug}/`} className="position-relative">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="card-img-top"
                            style={{
                              width: "100%",
                              height: "220px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="position-absolute top-0 end-0 m-3">
                            <span className="badge bg-white text-primary shadow-sm px-3 py-2 rounded-pill fw-bold">
                                {course.level}
                            </span>
                          </div>
                        </Link>
                        <div className="card-body p-4 d-flex flex-column">
                          <div className="mb-2 d-flex justify-content-between align-items-center">
                              <small className="text-primary fw-bold text-uppercase">{course.category?.title || 'Course'}</small>
                              <div className="d-flex align-items-center small text-warning">
                                  <i className="fas fa-star me-1"></i>
                                  <span className="fw-bold text-dark">{course.average_rating || 0}</span>
                                  <span className="text-muted ms-1">({course.rating_count || 0})</span>
                              </div>
                          </div>
                          <h5 className="card-title mb-3 flex-grow-1">
                            <Link
                              to={`/course-detail/${course.slug}/`}
                              className="text-decoration-none text-main fw-bold"
                            >
                              {course.title}
                            </Link>
                          </h5>
                          <div className="d-flex align-items-center mb-4">
                              <div className="avatar me-2 bg-primary rounded-circle text-white d-flex align-items-center justify-content-center" style={{width: 32, height: 32}}>
                                {(course.teacher?.full_name || 'I').charAt(0)}
                              </div>
                              <small className="text-muted">By {course.teacher?.full_name || 'Instructor'}</small>
                          </div>
                          
                          <div className="d-flex align-items-center justify-content-between pt-3 border-top border-light">
                              <h4 className="mb-0 fw-bold text-primary">${course.price}</h4>
                              <div className="d-flex gap-2">
                                <button
                                    className="btn btn-light rounded-circle text-primary d-flex align-items-center justify-content-center p-0"
                                    style={{width: 38, height: 38}}
                                    onClick={() => handleAddToCart(course)}
                                >
                                    <i className="fas fa-shopping-cart"></i>
                                </button>
                                <Link
                                    to={`/course-detail/${course.slug}/`}
                                    className="btn btn-primary px-3 py-2 rounded-pill btn-sm d-flex align-items-center"
                                >
                                    Enroll <i className="fas fa-arrow-right ms-2"></i>
                                </Link>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <div className="mb-3">
                        <i className="fas fa-search fa-3x text-muted opacity-25"></i>
                    </div>
                    <h4 className="text-muted">No courses found matching "{query}".</h4>
                    <p className="text-muted">Try adjusting your search terms or browse all courses.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BaseFooter />
    </>
  );
}

export default Search;
