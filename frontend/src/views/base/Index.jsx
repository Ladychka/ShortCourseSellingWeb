import React, { useEffect, useState } from 'react'
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import { Link } from 'react-router-dom'
import useAxios from '../../utils/useAxios';
import { API } from '../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';

function Index() {
    const api = useAxios();
    const navigate = useNavigate();
    const [featured, setFeatured] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const run = async () => {
            try {
                const [fc, rv] = await Promise.all([
                    api.get(API.HOME_FEATURED),
                    api.get(API.HOME_REVIEWS)
                ]);
                setFeatured(fc.data || []);
                setReviews(rv.data || []);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <BaseHeader />

            <section className="py-5 hero-gradient position-relative overflow-hidden">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="display-5 fw-bold mb-3">Learn. Build. Grow.</h1>
                            <p className='lead text-muted mb-4'>High‑quality courses & real student feedback. Find the right next step in seconds.</p>
                            <form onSubmit={e => { e.preventDefault(); if (search.trim()) navigate(`/search/?q=${encodeURIComponent(search.trim())}`) }} className='d-flex shadow-sm rounded overflow-hidden bg-white mb-3' style={{ maxWidth: 520 }}>
                                <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Search courses...' className='form-control border-0' />
                                <button className='btn btn-primary rounded-0'><i className='fas fa-search'></i></button>
                            </form>
                            <div className='d-flex flex-wrap gap-2 small'>
                                <span className='text-muted'>Popular:</span>
                                {['python', 'react', 'ui/ux', 'data science'].map(tag => (
                                    <button key={tag} type='button' onClick={() => { setSearch(tag); navigate(`/search/?q=${encodeURIComponent(tag)}`) }} className='btn btn-sm btn-outline-secondary rounded-pill'>{tag}</button>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-6 mt-4 mt-lg-0 text-center">
                            <img alt='learning illustration' className='img-fluid hero-graphic' src='/hero-minimal.png' />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-8">
                <div className="container mb-lg-8">
                    {/* row */}
                    <div className="row mb-5">
                        <div className="col-md-6 col-lg-3 border-top-md border-top pb-4  border-end-md">
                            {/* text */}
                            <div className="py-7 text-center">
                                <div className="mb-3">
                                    <i className="fe fe-award fs-2 text-info" />
                                </div>
                                <div className="lh-1">
                                    <h2 className="mb-1">316,000+</h2>
                                    <span>Qualified Instructor</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 border-top-md border-top border-end-lg">
                            {/* icon */}
                            <div className="py-7 text-center">
                                <div className="mb-3">
                                    <i className="fe fe-users fs-2 text-warning" />
                                </div>
                                {/* text */}
                                <div className="lh-1">
                                    <h2 className="mb-1">1.8 Billion+</h2>
                                    <span>Course enrolments</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 border-top-lg border-top border-end-md">
                            {/* icon */}
                            <div className="py-7 text-center">
                                <div className="mb-3">
                                    <i className="fe fe-tv fs-2 text-primary" />
                                </div>
                                {/* text */}
                                <div className="lh-1">
                                    <h2 className="mb-1">41,000+</h2>
                                                                <span>Courses in 3 languages</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 border-top-lg border-top">
                            {/* icon */}
                            <div className="py-7 text-center">
                                <div className="mb-3">
                                    <i className="fe fe-film fs-2 text-success" />
                                </div>
                                {/* text */}
                                <div className="lh-1">
                                    <h2 className="mb-1">179,000+</h2>
                                    <span>Online Videos</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='mb-5'>
                <div className="container mb-lg-8 ">
                    <div className="row mb-5 mt-3">
                        {/* col */}
                        <div className="col-12">
                            <div className="mb-6">
                                <h2 className="mb-1 h1">🔥 Featured Courses</h2>
                                <p className='mb-0'>Hand‑picked courses with strong ratings and active instructors.</p>
                                {loading && <p className='text-muted mt-2'>Loading courses...</p>}
                                {error && <p className='text-danger mt-2'>Failed: {error}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                                {loading && Array.from({ length: 4 }).map((_, i) => (
                                    <div className='col' key={i}>
                                        <div className='card h-100 placeholder-wave border-0 shadow-sm'>
                                            <div className='bg-light placeholder w-100' style={{ height: 180 }} />
                                            <div className='card-body'>
                                                <div className='placeholder col-4 mb-2'></div>
                                                <div className='placeholder col-10 mb-1'></div>
                                                <div className='placeholder col-8'></div>
                                                <div className='d-flex justify-content-between align-items-center mt-3'>
                                                    <div className='placeholder col-3'></div>
                                                    <div className='placeholder col-4'></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {!loading && featured.length === 0 && !error && (
                                    <div className='col'><p className='text-muted'>No featured courses yet.</p></div>
                                )}
                                {!loading && featured.map(c => <CourseCard key={c.id} course={c} />)}
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section className="my-8 py-lg-8">
                {/* container */}
                <div className="container">
                    {/* row */}
                    <div className="row align-items-center bg-primary gx-0 rounded-3 mt-5">
                        {/* col */}
                        <div className="col-lg-6 col-12 d-none d-lg-block">
                            <div className="d-flex justify-content-center pt-4">
                                {/* img */}
                                <div className="position-relative">
                                    <img
                                        src="/cta-instructor.png"
                                        alt="image"
                                        className="img-fluid mt-n8 rounded-3 shadow-lg"
                                    />
                                    <div className="ms-n8 position-absolute bottom-0 start-0 mb-6">
                                        <img src="https://geeksui.codescandy.com/geeks/assets/images/svg/dollor.svg" alt="dollor" />
                                    </div>
                                    {/* img */}
                                    <div className="me-n4 position-absolute top-0 end-0">
                                        <img src="https://geeksui.codescandy.com/geeks/assets/images/svg/graph.svg" alt="graph" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-12">
                            <div className="text-white p-5 p-lg-0">
                                {/* text */}
                                <h2 className="h1 text-white">Become an instructor today</h2>
                                <p className="mb-0">
                                    Instructors from around the world teach millions of students on
                                    Geeks. We provide the tools and skills to teach what you love.
                                </p>
                                <a href="#" className="btn bg-white text-dark fw-bold mt-4">
                                    Start Teaching Today <i className='fas fa-arrow-right'></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-200 pt-8 pb-8 mt-5">
                <div className="container pb-8">
                    {/* row */}
                    <div className="row mb-lg-8 mb-5">
                        <div className="offset-lg-1 col-lg-10 col-12">
                            <div className="row align-items-center">
                                {/* col */}
                                <div className="col-lg-6 col-md-8">
                                    {/* rating */}
                                    <div>
                                        <div className="mb-3">
                                            <span className="lh-1">
                                                <span className="align-text-top ms-2">
                                                    <i className='fas fa-star text-warning'></i>
                                                    <i className='fas fa-star text-warning'></i>
                                                    <i className='fas fa-star text-warning'></i>
                                                    <i className='fas fa-star text-warning'></i>
                                                    <i className='fas fa-star text-warning'></i>
                                                </span>
                                                <span className="text-dark fw-semibold">4.5/5.0</span>
                                            </span>
                                            <span className="ms-2">(Based on 3265 ratings)</span>
                                        </div>
                                        {/* heading */}
                                        <h2 className="h1">Recent Reviews</h2>
                                        <p className="mb-0">
                                            Hear from
                                            <span className="text-dark">teachers</span>,
                                            <span className="text-dark">trainers</span>, and
                                            <span className="text-dark">leaders</span>
                                            in the learning space about how Geeks empowers them to provide
                                            quality online learning experiences.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-4 text-md-end mt-4 mt-md-0">
                                    {/* btn */}
                                    <a href="#" className="btn btn-primary">
                                        View Reviews
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* row */}
                    <div className="row">
                        {/* col */}
                        <div className="col-md-12">
                            <div className="position-relative">
                                {/* controls */}
                                {/* slider */}
                                <div className="row g-4">
                                    {loading && Array.from({ length: 3 }).map((_, i) => (
                                        <div className='col-md-6 col-lg-4' key={i}>
                                            <div className='card h-100 border-0 shadow-sm'>
                                                <div className='card-body'>
                                                    <div className='placeholder col-8 mb-3'></div>
                                                    <div className='placeholder col-11 mb-2'></div>
                                                    <div className='placeholder col-9 mb-2'></div>
                                                    <div className='placeholder col-5'></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {!loading && reviews.length === 0 && !error && <div className='col-12'><p className='text-muted'>No reviews yet.</p></div>}
                                    {!loading && reviews.map(r => <ReviewCard key={r.id} review={r} />)}
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

// Reusable components
const CourseCard = ({ course }) => {
    return (
        <div className='col'>
            <div className='card h-100 border-0 shadow-sm card-hover'>
                <Link to={`/course-detail/${course.slug}`}>
                    <img src={course.image || '/course-placeholder.png'} alt={course.title} className='card-img-top' style={{ height: 180, objectFit: 'cover' }} />
                </Link>
                <div className='card-body d-flex flex-column'>
                    <div className='d-flex justify-content-between align-items-center mb-2 small'>
                        <span className='badge bg-info'>{course.level}</span>
                        <span className='text-warning'><i className='fas fa-star me-1'></i>{Number(course.average_rating || 0).toFixed(1)}</span>
                    </div>
                    <h6 className='fw-semibold text-truncate flex-grow-1'>{course.title}</h6>
                    <div className='mt-2 d-flex justify-content-between align-items-center'>
                        <span className='fw-bold mb-0'>${course.price || '0.00'}</span>
                        <Link to={`/course-detail/${course.slug}`} className='btn btn-sm btn-outline-primary'>View</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReviewCard = ({ review }) => {
    return (
        <div className='col-md-6 col-lg-4'>
            <div className='card h-100 border-0 shadow-sm'>
                <div className='card-body d-flex flex-column'>
                    <p className='flex-grow-1 mb-3'>{review.review?.slice(0, 140)}{review.review?.length > 140 && '...'}</p>
                    <div className='d-flex justify-content-between align-items-center small'>
                        <span className='text-warning'><i className='fas fa-star me-1'></i>{review.rating}</span>
                        <time className='text-muted'>{new Date(review.date).toLocaleDateString()}</time>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index
