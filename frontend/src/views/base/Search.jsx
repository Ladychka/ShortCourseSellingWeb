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

      <section className="mb-5" style={{ marginTop: "100px" }}>
        <div className="container mb-lg-8 ">
          <div className="row mb-5 mt-3">
            <div className="col-12">
              <div className="mb-6">
                <h2 className="mb-1 h1">
                  {query ? `Showing Results for "${query}"` : "All Courses"}
                </h2>
              </div>
            </div>
            
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {isLoading ? (
                  <div className="col-12 text-center">
                      <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                      </div>
                  </div>
                ) : courses.length > 0 ? (
                  courses.map((course) => (
                    <div className="col" key={course.id}>
                      <div className="card card-hover h-100">
                        <Link to={`/course-detail/${course.slug}/`}>
                          <img
                            src={course.image}
                            alt={course.title}
                            className="card-img-top"
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        </Link>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="badge bg-info">{course.level}</span>
                            <span className="fs-5">
                              <i className="fas fa-heart text-danger align-middle" />
                            </span>
                          </div>
                          <h4 className="mb-2 text-truncate-line-2 ">
                            <Link
                              to={`/course-detail/${course.slug}/`}
                              className="text-inherit text-decoration-none text-dark fs-5"
                            >
                              {course.title}
                            </Link>
                          </h4>
                          <small>By: {course.teacher?.full_name || 'Instructor'}</small> <br />
                          <small>{course.students?.length || 0} Students</small> <br />
                          <div className="lh-1 mt-3 d-flex">
                            <span className="align-text-top">
                              <span className="fs-6">
                                <i className="fas fa-star text-warning"></i>
                              </span>
                            </span>
                            <span className="text-warning ms-1">{course.average_rating || 0}</span>
                            <span className="fs-6 ms-2">({course.rating_count || 0})</span>
                          </div>
                        </div>
                        <div className="card-footer">
                          <div className="row align-items-center g-0">
                            <div className="col">
                              <h5 className="mb-0">${course.price}</h5>
                            </div>
                            <div className="col-auto">
                              <button
                                type="button"
                                className="text-inherit text-decoration-none btn btn-primary me-2"
                                onClick={() => handleAddToCart(course)}
                              >
                                <i className="fas fa-shopping-cart text-primary text-white" />
                              </button>
                              <Link
                                to={`/course-detail/${course.slug}/`}
                                className="text-inherit text-decoration-none btn btn-primary"
                              >
                                Enroll Now{" "}
                                <i className="fas fa-arrow-right text-primary align-middle me-2 text-white" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center text-muted">
                    <h4>No courses found.</h4>
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
