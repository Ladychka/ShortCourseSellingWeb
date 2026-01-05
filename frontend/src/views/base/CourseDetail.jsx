import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import useAxios from '../../utils/useAxios';
import { API } from '../../utils/apiRoutes';
import useCartStore from '../../store/cart';
import Swal from 'sweetalert2';

function CourseDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const api = useAxios();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCartStore();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await api.get(API.COURSE_DETAIL + slug + '/');
                setCourse(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [slug]);

    const handleAddToCart = () => {
        if (course) {
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
        }
    };

    const handleEnroll = () => {
        if (course) {
            addToCart(course);
            navigate('/cart/');
        }
    };

    if (loading) {
        return (
             <>
                <BaseHeader />
                <div className="container py-5 text-center" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                   <h3>Course not found</h3>
                   <Link to="/" className="btn btn-primary mt-3">Go Home</Link>
               </div>
               <BaseFooter />
           </>
       );
    }

    return (
        <>
            <BaseHeader />

            <section className="pt-5 pb-5 position-relative" style={{ marginTop: '50px', background: 'linear-gradient(135deg, rgba(var(--primary-hue), 80, 80, 0.05) 0%, rgba(var(--primary-hue), 80, 80, 0.1) 100%)' }}>
                <div className="container pt-5">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <span className="badge bg-primary rounded-pill mb-3 px-3 py-2 fw-bold shadow-sm">
                                {course.category?.title || 'Course'}
                            </span>
                            <h1 className="mb-3 display-4 fw-bold">{course.title}</h1>
                            <p className="mb-4 lead text-secondary col-lg-10">
                                {course.description?.substring(0, 150)}...
                            </p>
                            
                            <div className="d-flex flex-wrap gap-4 mb-4">
                                <div className="d-flex align-items-center">
                                    <div className="d-flex text-warning small align-items-center">
                                        <span className="fw-bold fs-5 text-dark me-2">{course.average_rating ? Number(course.average_rating).toFixed(1) : '0.0'}</span>
                                        <i className="fas fa-star me-1"></i>
                                    </div>
                                    <span className="text-secondary ms-2 small">({course.rating_count || 0} reviews)</span>
                                </div>
                                <div className="d-flex align-items-center text-secondary">
                                    <i className="fas fa-user-graduate me-2 text-primary"></i>
                                    {course.students?.length || 0} Enrolled
                                </div>
                                <div className="d-flex align-items-center text-secondary">
                                    <i className="fas fa-signal me-2 text-success"></i>
                                    {course.level}
                                </div>
                                <div className="d-flex align-items-center text-secondary">
                                    <i className="fas fa-globe me-2 text-info"></i>
                                    {course.language}
                                </div>
                            </div>

                            <div className="d-flex align-items-center gap-3">
                                <div className="avatar me-3">
                                    <img 
                                        className="avatar-img rounded-circle border border-2 border-white shadow" 
                                        src={course.teacher?.image || '/default-user.jpg'} 
                                        alt={course.teacher?.full_name} 
                                        style={{width: 48, height: 48, objectFit: 'cover'}} 
                                        onError={(e) => { e.target.onerror = null; e.target.src = "/default-user.jpg" }}
                                    />
                                </div>
                                <div>
                                    <div className="small text-secondary fw-semibold text-uppercase">Created by</div>
                                    <div className="fw-bold text-dark">{course.teacher?.full_name || 'Instructor'}</div>
                                </div>
                                <div className='ms-4 text-secondary small'>
                                    <i className='fas fa-calendar-alt me-1'></i> Last updated {new Date(course.date).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                             {/* Enrollment Card */}
                             <div className='card shadow border-0'>
                                <img 
                                    src={course.image} 
                                    className='card-img-top' 
                                    alt={course.title} 
                                    style={{ height: '240px', objectFit: 'cover' }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = "/course-placeholder.png" }} 
                                />
                                <div className='card-body p-4'>
                                    <div className='d-flex justify-content-between align-items-center mb-4'>
                                        <h2 className='mb-0 fw-bold display-6'>${course.price}</h2>
                                        {/* <span className='text-decoration-line-through text-muted'>$199.00</span> */}
                                    </div>
                                    <div className='d-grid gap-2'>
                                        <button onClick={handleAddToCart} className='btn btn-outline-primary btn-lg'>
                                            <i className='fas fa-shopping-cart me-2'></i> Add to Cart
                                        </button>
                                        <button onClick={handleEnroll} className='btn btn-primary btn-lg shadow-sm'>
                                            Enroll Now
                                        </button>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="pb-5 pt-4">
                <div className="container">
                    <div className="row">
                        {/* Main content START */}
                        <div className="col-lg-8">
                            <div className="card shadow-sm border-0 glass p-0 mb-4">
                                {/* Tabs START */}
                                <div className="card-header border-bottom px-4 py-3 bg-transparent">
                                    <ul className="nav nav-pills gap-2" id="course-pills-tab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active rounded-pill px-4" id="course-pills-tab-1" data-bs-toggle="pill" data-bs-target="#course-pills-1" type="button" role="tab" aria-controls="course-pills-1" aria-selected="true">
                                                Overview
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link rounded-pill px-4" id="course-pills-tab-2" data-bs-toggle="pill" data-bs-target="#course-pills-2" type="button" role="tab" aria-controls="course-pills-2" aria-selected="false">
                                                Curriculum
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link rounded-pill px-4" id="course-pills-tab-3" data-bs-toggle="pill" data-bs-target="#course-pills-3" type="button" role="tab" aria-controls="course-pills-3" aria-selected="false">
                                                Instructor
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link rounded-pill px-4" id="course-pills-tab-4" data-bs-toggle="pill" data-bs-target="#course-pills-4" type="button" role="tab" aria-controls="course-pills-4" aria-selected="false">
                                                Reviews
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                {/* Tabs END */}
                                
                                {/* Tab contents START */}
                                <div className="card-body p-4">
                                    <div className="tab-content pt-2" id="course-pills-tabContent">
                                        
                                        {/* Overview Tab */}
                                        <div className="tab-pane fade show active" id="course-pills-1" role="tabpanel" aria-labelledby="course-pills-tab-1">
                                            <h5 className="mb-3">Course Description</h5>
                                            <div dangerouslySetInnerHTML={{__html: course.description}} className="mb-4 text-secondary lh-lg" />
                                            
                                            {/* Note: "What you will learn" is hidden as backend doesn't support it yet */}
                                        </div>

                                        {/* Curriculum Tab */}
                                        <div className="tab-pane fade" id="course-pills-2" role="tabpanel" aria-labelledby="course-pills-tab-2">
                                            <div className="accordion accordion-icon accordion-bg-light" id="accordionExample2">
                                                {course.curriculum?.map((variant, index) => (
                                                    <div className="accordion-item mb-3" key={variant.id}>
                                                        <h6 className="accordion-header font-base" id={`heading-${index}`}>
                                                            <button
                                                                className={`accordion-button fw-bold rounded d-sm-flex d-inline-block ${index === 0 ? '' : 'collapsed'}`}
                                                                type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target={`#collapse-${index}`}
                                                                aria-expanded={index === 0}
                                                                aria-controls={`collapse-${index}`}
                                                            >
                                                                {variant.title}
                                                                <span className="small ms-0 ms-sm-2 text-muted fw-normal">
                                                                    ({variant.variant_items?.length || 0} Lectures)
                                                                </span>
                                                            </button>
                                                        </h6>
                                                        <div
                                                            id={`collapse-${index}`}
                                                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                                            aria-labelledby={`heading-${index}`}
                                                            data-bs-parent="#accordionExample2"
                                                        >
                                                            <div className="accordion-body mt-3">
                                                                {variant.variant_items?.map((item, i) => (
                                                                    <div key={item.id}>
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <div className="position-relative d-flex align-items-center">
                                                                                <div className={`btn btn-round btn-sm mb-0 position-static ${item.preview ? 'btn-primary-soft' : 'btn-danger-soft'}`}>
                                                                                    {item.preview ? <i className="fas fa-play me-0"></i> : <i className="fas fa-lock me-0"></i>}
                                                                                </div>
                                                                                <span className="d-inline-block text-truncate ms-2 mb-0 h6 fw-light w-100px w-sm-200px w-md-400px">
                                                                                    {item.title}
                                                                                </span>
                                                                            </div>
                                                                            <p className="mb-0 text-muted small">{item.content_duration || '0m'}</p>
                                                                        </div>
                                                                        {i < variant.variant_items.length - 1 && <hr />}
                                                                    </div>
                                                                ))}
                                                                {(!variant.variant_items || variant.variant_items.length === 0) && (
                                                                    <p className="text-muted small fst-italic">No lectures in this section yet.</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {(!course.curriculum || course.curriculum.length === 0) && (
                                                    <div className="text-center py-4">
                                                        <i className="fas fa-book-open text-muted fs-1 mb-3"></i>
                                                        <p className="text-muted">Curriculum pending...</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Instructor Tab */}
                                        <div className="tab-pane fade" id="course-pills-3" role="tabpanel" aria-labelledby="course-pills-tab-3">
                                            <div className="card mb-0 mb-md-4 border-0">
                                                <div className="row g-0 align-items-center">
                                                    <div className="col-md-5">
                                                        <img
                                                            src={course.teacher?.image || '/default-user.jpg'}
                                                            className="img-fluid rounded-3 shadow-sm w-100"
                                                            alt={course.teacher?.full_name}
                                                            onError={(e) => { e.target.onerror = null; e.target.src = "/default-user.jpg" }}
                                                        />
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="card-body">
                                                            <h3 className="card-title mb-1">{course.teacher?.full_name}</h3>
                                                            <p className="mb-3 text-muted">{course.teacher?.bio || 'Instructor'}</p>
                                                            <p className="mb-0">{course.teacher?.about}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reviews Tab */}
                                        <div className="tab-pane fade" id="course-pills-4" role="tabpanel" aria-labelledby="course-pills-tab-4">
                                            <div className="row mb-4">
                                                <h5 className="mb-4">Student Reviews</h5>
                                                {course.reviews?.length > 0 ? (
                                                    course.reviews.map((review) => (
                                                        <div className="d-md-flex my-4 border-bottom pb-4" key={review.id}>
                                                            <div className="avatar avatar-xl me-4 flex-shrink-0">
                                                                <img
                                                                    className="avatar-img rounded-circle"
                                                                    src={review.profile?.image || '/default-user.jpg'}
                                                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                                    alt={review.profile?.full_name}
                                                                    onError={(e) => { e.target.onerror = null; e.target.src = "/default-user.jpg" }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="d-sm-flex mt-1 mt-md-0 align-items-center">
                                                                    <h5 className="me-3 mb-0">{review.profile?.full_name || 'Student'}</h5>
                                                                    <ul className="list-inline mb-0 text-warning">
                                                                        {[...Array(5)].map((_, i) => (
                                                                            <i key={i} className={`fas fa-star ${i < review.rating ? '' : 'text-muted opacity-25'}`} />
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                                <p className="small mb-2 text-muted">{new Date(review.date).toLocaleDateString()}</p>
                                                                <p className="mb-2">{review.review}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="col-12 text-center py-5">
                                                        <i className="far fa-comment-dots fs-1 text-muted mb-3"></i>
                                                        <p className="text-muted">No reviews yet. Be the first to review this course!</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

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

export default CourseDetail;