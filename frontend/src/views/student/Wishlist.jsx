import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import Sidebar from './Partials/Sidebar';
import Header from './Partials/Header';
import useAxios from '../../utils/useAxios';
import { API } from '../../utils/apiRoutes';
import useCartStore from '../../store/cart';
import Swal from 'sweetalert2';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = useAxios();
    const { addToCart } = useCartStore();

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const res = await api.get(API.STUDENT_WISHLIST);
            setWishlist(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching wishlist", error);
            setLoading(false);
        }
    };

    const removeFromWishlist = async (courseId) => {
        try {
            await api.post(API.STUDENT_WISHLIST, { course_id: courseId });
            // Remove from local state
            setWishlist(prev => prev.filter(item => item.course.id !== courseId));
            Swal.fire({
                toast: true,
                icon: 'success',
                title: 'Removed from Wishlist',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not remove course.'
            });
        }
    };

    const handleAddToCart = (course) => {
        addToCart(course);
        Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Added to Cart',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <>
            <BaseHeader />

            <section className="pt-5 pb-5">
                <div className="container">
                    <Header />
                    <div className="row mt-0 mt-md-4">
                        <Sidebar />
                        <div className="col-lg-9 col-md-8 col-12">
                            <h4 className="mb-0 mb-4"> <i className='fas fa-heart'></i> Wishlist </h4>

                            {loading && <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>}

                            {!loading && wishlist.length === 0 && (
                                <div className="alert alert-info">Your wishlist is empty.</div>
                            )}

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                                        {wishlist.map((item) => {
                                            const course = item.course;
                                            return (
                                                <div className="col" key={item.id}>
                                                    <div className="card h-100 card-hover border-0 shadow-sm">
                                                        <Link to={`/course-detail/${course.slug}/`}>
                                                            <img
                                                                src={course.image}
                                                                alt={course.title}
                                                                className="card-img-top"
                                                                style={{height: '160px', objectFit: 'cover'}}
                                                            />
                                                        </Link>
                                                        <div className="card-body">
                                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                                <span className="badge bg-info">{course.level}</span>
                                                                <a href="#" className="fs-5" onClick={(e) => { e.preventDefault(); removeFromWishlist(course.id); }}>
                                                                    <i className="fas fa-heart text-danger align-middle" />
                                                                </a>
                                                            </div>
                                                            <h4 className="mb-2 text-truncate-line-2 ">
                                                                <Link to={`/course-detail/${course.slug}/`} className="text-inherit text-decoration-none text-dark fs-5">
                                                                    {course.title}
                                                                </Link>
                                                            </h4>
                                                            <small className="text-muted">By: {course.teacher?.full_name || 'Instructor'}</small> <br />
                                                            <small className="text-muted">{course.students?.length || 0} Students</small> <br />
                                                            <div className="lh-1 mt-3 d-flex align-items-center">
                                                                <span className="align-text-top me-1">
                                                                    <span className="fs-6">
                                                                        <i className='fas fa-star text-warning'></i>
                                                                    </span>
                                                                </span>
                                                                <span className="text-warning fw-bold">{course.average_rating || 4.5}</span>
                                                                <span className="fs-6 ms-2 text-muted">({course.rating_count || 0})</span>
                                                            </div>
                                                        </div>
                                                        <div className="card-footer bg-white border-top-0 pt-0 pb-4">
                                                            <div className="d-flex flex-column gap-2">
                                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                                    <h5 className="mb-0 fw-bold">${course.price}</h5>
                                                                    <button onClick={() => removeFromWishlist(course.id)} className="btn btn-link text-danger p-0"><i className="fas fa-trash"></i></button>
                                                                </div>
                                                                <button onClick={() => handleAddToCart(course)} className="btn btn-primary btn-sm w-100">
                                                                    <i className="fas fa-shopping-cart me-2"></i> Enroll Now
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <BaseFooter />
        </>
    )
}

export default Wishlist