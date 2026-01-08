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
  const [completedLessons, setCompletedLessons] = useState([]); // Array of IDs
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
      setCompletedLessons(response.data.completed_lessons || []);
      
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

  // Helper to flatten curriculum for easier navigation
  const getAllLessons = () => {
      if (!course?.curriculum) return [];
      return course.curriculum.flatMap(variant => variant.variant_items || []);
  };

  const handleNextLesson = () => {
      const allLessons = getAllLessons();
      const currentIndex = allLessons.findIndex(l => l.id === activeLesson?.id);
      if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
          setActiveLesson(allLessons[currentIndex + 1]);
      }
  };

  const handlePrevLesson = () => {
      const allLessons = getAllLessons();
      const currentIndex = allLessons.findIndex(l => l.id === activeLesson?.id);
      if (currentIndex > 0) {
          setActiveLesson(allLessons[currentIndex - 1]);
      }
  };

  const markLessonAsCompleted = async (variantItemId) => {
      try {
          const res = await axiosInstance.post(API.STUDENT_COURSE_COMPLETED_LESSON, {
              course_id: course.id,
              variant_item_id: variantItemId
          });
          
          const { status, message } = res.data;

          if (status === 'marked') {
              setCompletedLessons(prev => [...prev, variantItemId]);
              Swal.fire({
                toast: true,
                icon: 'success',
                title: 'Lesson Completed!',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
          } else if (status === 'unmarked') {
              setCompletedLessons(prev => prev.filter(id => id !== variantItemId));
              Swal.fire({
                toast: true,
                icon: 'info',
                title: 'Lesson Unmarked',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
          }

      } catch (error) {
          console.error("Error marking lesson as completed", error);
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Could not update lesson status.'
          });
      }
  };


  if (loading) {
    return (
        <>
            <BaseHeader />
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
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
              <div className="card shadow rounded-2 mb-4">
                  <div className="card-body p-0">
                      <div className="bg-dark rounded-top position-relative" style={{minHeight: "400px"}}>
                        <div className="d-flex justify-content-center align-items-center h-100">
                            {activeLesson ? (
                                <div className="w-100" style={{maxWidth: "100%"}}>
                                    <ReactPlayer
                                        url={activeLesson.file}
                                        width="100%"
                                        height="500px"
                                        controls={true}
                                        playing={false}
                                        onEnded={() => markLessonAsCompleted(activeLesson.id)}
                                    />
                                </div>
                            ) : (
                                <h3 className="text-white">Select a lesson to start watching</h3>
                            )}
                        </div>
                      </div>
                      <div className="p-4">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                              <h3 className="mb-0">{activeLesson?.title}</h3>
                              <div>
                                  <button onClick={() => markLessonAsCompleted(activeLesson?.id)} className={`btn btn-sm me-2 ${completedLessons.includes(activeLesson?.id) ? 'btn-success' : 'btn-outline-success'}`} disabled={!activeLesson}>
                                      <i className="fas fa-check-circle me-1"></i> {completedLessons.includes(activeLesson?.id) ? 'Completed' : 'Mark as Completed'}
                                  </button>
                              </div>
                          </div>
                           <div className="d-flex justify-content-between align-items-center mb-4">
                                <div></div>
                                <div>
                                    <button onClick={handlePrevLesson} className="btn btn-outline-secondary btn-sm me-2" disabled={!activeLesson || getAllLessons().findIndex(l => l.id === activeLesson.id) === 0}>
                                        <i className="fas fa-chevron-left me-1"></i> Prev
                                    </button>
                                    <button onClick={handleNextLesson} className="btn btn-primary btn-sm" disabled={!activeLesson || getAllLessons().findIndex(l => l.id === activeLesson.id) === getAllLessons().length - 1}>
                                        Next <i className="fas fa-chevron-right ms-1"></i>
                                    </button>
                                </div>
                           </div>

                          <p className="text-secondary">{activeLesson?.description || "No description available for this lesson."}</p>
                      </div>
                  </div>
              </div>
            </div>

            {/* Sidebar / Curriculum */}
            <div className="col-lg-4 col-md-4 col-12 mt-4 mt-md-0">
                <div className="card shadow rounded-2" style={{maxHeight: '800px', display: 'flex', flexDirection: 'column'}}>
                    <div className="card-header border-bottom px-4 pt-3 pb-3">
                        <h5 className="mb-0">Course Content</h5>
                        <p className="mb-0 small text-muted">{getAllLessons().length} Lectures • {completedLessons.length} Completed</p>
                    </div>
                    <div className="card-body p-0" style={{overflowY: 'auto', flex: 1}}>
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
                                            style={{backgroundColor: '#f8f9fa'}}
                                        >
                                            <span className="fw-bold">{variant.title}</span>
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
                                                        className={`list-group-item list-group-item-action cursor-pointer border-0 ${activeLesson?.id === item.id ? "bg-primary-subtle border-start border-4 border-primary" : ""}`}
                                                        onClick={() => setActiveLesson(item)}
                                                        style={{cursor: 'pointer'}}
                                                    >
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="text-truncate" style={{maxWidth: '220px'}}>
                                                                {completedLessons.includes(item.id) ? (
                                                                     <i className="fas fa-check-circle text-success me-2"></i>
                                                                ) : (
                                                                    <i className={`fas ${activeLesson?.id === item.id ? "fa-circle-play text-primary" : "fa-play-circle text-muted"} me-2`}></i>
                                                                )}
                                                                <span className={activeLesson?.id === item.id ? "fw-semibold text-primary" : "text-dark"}>{item.title}</span>
                                                            </div>
                                                            <small className="text-muted">{item.duration || item.content_duration || '0m'}</small>
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