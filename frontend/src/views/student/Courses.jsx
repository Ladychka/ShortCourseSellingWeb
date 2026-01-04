import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../../utils/apiRoutes';
import useAxios from '../../utils/useAxios';

import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const api = useAxios();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await api.get(API.STUDENT_COURSES);
                setCourses(data);
            } catch (e) {
                console.error(e);
                setError("Failed to load your courses.");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(c => 
        c.course?.title?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <BaseHeader />

            <section className="pt-5 pb-5">
                <div className="container">
                    <Header />
                    <div className="row mt-0 mt-md-4">
                        <Sidebar />
                        <div className="col-lg-9 col-md-8 col-12">
                            <h4 className="mb-0 mb-4"> <i className='fas fa-book'></i> My Learning</h4>

                            <div className="card mb-4">
                                <div className="card-header">
                                    <span>
                                        Start watching courses now from your dashboard page.
                                    </span>
                                </div>
                                <div className="card-body">
                                    <form className="row gx-3" onSubmit={e => e.preventDefault()}>
                                        <div className="col-lg-12 col-md-12 col-12 mb-lg-0 mb-2">
                                            <input
                                                type="search"
                                                className="form-control"
                                                placeholder="Search Your Courses"
                                                value={query}
                                                onChange={e => setQuery(e.target.value)}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="table-responsive">
                                    <table className="table mb-0 text-nowrap table-hover table-centered text-nowrap">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Course</th>
                                                <th>Date Enrolled</th>
                                                <th>Lectures</th>
                                                <th>Progress</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading && (
                                                <tr><td colSpan="5" className='text-center py-5'>Loading your courses...</td></tr>
                                            )}
                                            {!loading && filteredCourses.length === 0 && (
                                                <tr><td colSpan="5" className='text-center py-5'>No courses found. <Link to="/search/">Browse Courses</Link></td></tr>
                                            )}
                                            {filteredCourses.map(enrolled => (
                                                <tr key={enrolled.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <Link to={`/course-detail/${enrolled.course.slug}`}>
                                                                <img 
                                                                    src={enrolled.course.image} 
                                                                    alt={enrolled.course.title} 
                                                                    className="rounded img-4by3-lg"
                                                                    style={{width: '100px', height:'70px', objectFit:'contain', padding:'4px', background:'#f8f9fa', borderRadius:'8px'}}
                                                                />
                                                            </Link>
                                                            <div className="ms-3">
                                                                <h5 className="mb-0">
                                                                    <Link to={`/course-detail/${enrolled.course.slug}`} className="text-inherit text-decoration-none text-dark">
                                                                        {enrolled.course.title}
                                                                    </Link>
                                                                </h5>
                                                                <span className='badge bg-primary me-1'>{enrolled.course.level}</span>
                                                                <small className="text-muted">By {enrolled.course.teacher?.full_name}</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{new Date(enrolled.date).toLocaleDateString()}</td>
                                                    <td>{enrolled.lectures?.length || 0}</td>
                                                    <td>
                                                        <div className="progress" style={{height: 6}}>
                                                            <div className="progress-bar" role="progressbar" style={{width: `${Math.round((enrolled.completed_lessons?.length || 0) / (enrolled.lectures?.length || 1) * 100)}%`}} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
                                                        </div>
                                                        <small>{Math.round((enrolled.completed_lessons?.length || 0) / (enrolled.lectures?.length || 1) * 100)}% Completed</small>
                                                    </td>
                                                    <td>
                                                        <Link to={`/course-detail/${enrolled.course.slug}`} className="btn btn-primary btn-sm">
                                                            Start Learning <i className='fas fa-play ms-1'></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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

export default Courses