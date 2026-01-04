import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import useAxios from "../../utils/useAxios";
import { API } from "../../utils/apiRoutes";
import Swal from "sweetalert2";

function StudentCourseLectureDetail() {
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const axiosInstance = useAxios();

  useEffect(() => {
    fetchCourse();
  }, [slug]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API.STUDENT_COURSE_DETAIL + slug + "/");
      setCourse(response.data);
      
      // Set initial active lesson (first lesson of first section)
      if (response.data.curriculum && response.data.curriculum.length > 0) {
        const firstVariant = response.data.curriculum[0];
        if (firstVariant.variant_items && firstVariant.variant_items.length > 0) {
            setActiveLesson(firstVariant.variant_items[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.detail || "Failed to load course content. Are you enrolled?",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
        <>
            <BaseHeader />
            <div className="container py-5 text-center">
                <h2>Loading course content...</h2>
            </div>
            <BaseFooter />
        </>
    );
  }

  if (!course) {
      return (
          <>
            <BaseHeader />
            <div className="container py-5 text-center">
                <h2>Course not found or access denied.</h2>
            </div>
            <BaseFooter />
          </>
      )
  }

  return (
    <>
      <BaseHeader />

      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row mt-0 mt-md-4">
            
            {/* Main Video Area */}
            <div className="col-lg-8 col-md-8 col-12">
              <section className="bg-dark py-5 rounded position-relative" style={{minHeight: "400px"}}>
                <div className="container d-flex justify-content-center align-items-center h-100">
                    {activeLesson ? (
                        <div className="w-100" style={{maxWidth: "100%"}}>
                            <ReactPlayer
                                url={activeLesson.file}
                                width="100%"
                                height="500px"
                                controls={true}
                                playing={true}
                            />
                            <div className="mt-3 text-white">
                                <h3>{activeLesson.title}</h3>
                                <p>{activeLesson.description}</p>
                            </div>
                        </div>
                    ) : (
                        <h3 className="text-white">Select a lesson to start watching</h3>
                    )}
                </div>
              </section>
            </div>

            {/* Sidebar / Curriculum */}
            <div className="col-lg-4 col-md-4 col-12 mt-4 mt-md-0">
                <div className="card shadow rounded-2">
                    <div className="card-header border-bottom px-4 pt-3 pb-3">
                        <h5 className="mb-0">Course Content</h5>
                    </div>
                    <div className="card-body p-0">
                        <div className="accordion accordion-flush" id="accordionCurriculum">
                            {course.curriculum?.map((variant, index) => (
                                <div className="accordion-item" key={variant.id}>
                                    <h2 className="accordion-header" id={`heading-${variant.id}`}>
                                        <button
                                            className={`accordion-button ${index === 0 ? "" : "collapsed"}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse-${variant.id}`}
                                            aria-expanded={index === 0 ? "true" : "false"}
                                            aria-controls={`collapse-${variant.id}`}
                                        >
                                            {variant.title}
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse-${variant.id}`}
                                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                                        aria-labelledby={`heading-${variant.id}`}
                                        data-bs-parent="#accordionCurriculum"
                                    >
                                        <div className="accordion-body p-0">
                                            <ul className="list-group list-group-flush">
                                                {variant.variant_items?.map((item) => (
                                                    <li 
                                                        key={item.id} 
                                                        className={`list-group-item list-group-item-action cursor-pointer ${activeLesson?.id === item.id ? "bg-light fw-bold text-primary" : ""}`}
                                                        onClick={() => setActiveLesson(item)}
                                                        style={{cursor: 'pointer'}}
                                                    >
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <i className={`fas ${activeLesson?.id === item.id ? "fa-play-circle" : "fa-circle-play"} me-2 opacity-50`}></i>
                                                                {item.title}
                                                            </div>
                                                            <small className="text-muted">{item.duration}</small>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
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

export default StudentCourseLectureDetail;