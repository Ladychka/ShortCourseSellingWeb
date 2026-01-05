import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import useAxios from '../../utils/useAxios';
import { API } from '../../utils/apiRoutes';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const pageSize = 10;
    const api = useAxios();

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`${API.INSTRUCTOR_COURSES_MINI}?page=${page}&page_size=${pageSize}&q=${encodeURIComponent(query)}`);
                setCourses(data.results || []);
                setCount(data.count || 0);
            } catch (error) {
                console.error("Failed to fetch courses", error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search slightly
        const timeoutId = setTimeout(fetchCourses, 500);
        return () => clearTimeout(timeoutId);
    }, [page, query]);

    const totalPages = Math.max(1, Math.ceil(count / pageSize));

    return (
        <>
            <BaseHeader />

            <section className="pt-5 pb-5">
                <div className="container">
                    <Header />
                    <div className="row mt-0 mt-md-4">
                        <Sidebar />
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="row mb-4">
                                <h4 className="mb-0 mb-2 mt-4"> <i className='bi bi-grid-fill'></i> Courses</h4>
                            </div>
                            <div className="card mb-4">
                                <div className="card-header">
                                    <span>
                                        Manage your courses from here, search, view, edit or delete courses.
                                    </span>
                                </div>
                                <div className="card-body">
                                    <form className="row gx-3" onSubmit={(e) => e.preventDefault()}>
                                        <div className="col-lg-12 col-md-12 col-12 mb-lg-0 mb-2">
                                            <input
                                                type="search"
                                                className="form-control"
                                                placeholder="Search Your Courses"
                                                value={query}
                                                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="table-responsive overflow-y-hidden">
                                    <table className="table mb-0 text-nowrap table-hover table-centered text-nowrap">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Courses</th>
                                                <th>Enrolled</th>
                                                <th>Level</th>
                                                <th>Status</th>
                                                <th>Date Created</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading && (
                                                <tr><td colSpan="6" className="text-center py-4">Loading courses...</td></tr>
                                            )}
                                            {!loading && courses.length === 0 && (
                                                <tr><td colSpan="6" className="text-center py-4">No courses found.</td></tr>
                                            )}
                                            {!loading && courses.map(course => (
                                                <tr key={course.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <Link to={`/instructor/course-edit/${course.slug}`}>
                                                                <img 
                                                                    src={course.image || "https://via.placeholder.com/100x70"} 
                                                                    alt={course.title} 
                                                                    className="rounded img-4by3-lg" 
                                                                    style={{ width: "100px", height: "70px", borderRadius: "50%", objectFit: "cover" }} 
                                                                />
                                                            </Link>
                                                            <div className="ms-3">
                                                                <h4 className="mb-1 h6">
                                                                    <Link to={`/instructor/course-edit/${course.slug}`} className="text-inherit text-decoration-none text-dark">
                                                                        {course.title}
                                                                    </Link>
                                                                </h4>
                                                                <ul className="list-inline fs-6 mb-0">
                                                                    <li className="list-inline-item">
                                                                        <small><i className='bi bi-clock-history'></i>
                                                                            <span className='ms-1'>1hr 30 Mins</span>
                                                                        </small>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <small>
                                                                            <i className='bi bi-reception-4'></i>
                                                                            <span className='ms-1'>{course.level}</span>
                                                                        </small>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <small>
                                                                            <i className='fas fa-dollar-sign'></i>
                                                                            <span>{course.price}</span>
                                                                        </small>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><p className='mt-3'>{course.enrolled || 0}</p></td>
                                                    <td><p className='mt-3 badge bg-success' >{course.level}</p></td>
                                                    <td><p className='mt-3 badge bg-warning text-dark' >{course.teacher_status}</p></td>
                                                    <td><p className='mt-3'>{new Date(course.date).toLocaleDateString()}</p></td>
                                                    <td>
                                                        <Link to={`/instructor/course-edit/${course.slug}`} className='btn btn-primary btn-sm mt-3 me-1'>
                                                            <i className='fas fa-edit'></i>
                                                        </Link>
                                                        <button className='btn btn-danger btn-sm mt-3 me-1'>
                                                            <i className='fas fa-trash'></i>
                                                        </button>
                                                        <button className='btn btn-secondary btn-sm mt-3 me-1'>
                                                            <i className='fas fa-eye'></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer d-flex justify-content-between align-items-center">
                                    <button 
                                        className="btn btn-sm btn-outline-secondary" 
                                        disabled={page <= 1} 
                                        onClick={() => setPage(p => p - 1)}
                                    >
                                        Previous
                                    </button>
                                    <span className="small">Page {page} of {totalPages}</span>
                                    <button 
                                        className="btn btn-sm btn-outline-secondary" 
                                        disabled={page >= totalPages} 
                                        onClick={() => setPage(p => p + 1)}
                                    >
                                        Next
                                    </button>
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