import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'
import useAxios from '../../utils/useAxios'
import { API } from '../../utils/apiRoutes'

function Dashboard() {
    const [stats, setStats] = useState({
        total_courses: 0,
        completed_lessons: 0,
        achieved_certificates: 0
    });
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, coursesRes] = await Promise.all([
                    api.get(API.STUDENT_DASHBOARD_STATS),
                    api.get(API.STUDENT_COURSES)
                ]);
                
                setStats(statsRes.data);
                setCourses(coursesRes.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <BaseHeader />

            <section className="pt-5 pb-5">
                <div className="container">
                    {/* Header Here */}
                    <Header />
                    <div className="row mt-0 mt-md-4">
                        {/* Sidebar Here */}
                        <Sidebar />
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="row mb-4">
                                <h4 className="mb-0 mb-4"> <i className='bi bi-grid-fill'></i> Dashboard</h4>
                                {/* Counter item */}

                                <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
                                    <div className="d-flex justify-content-center align-items-center p-4 bg-warning bg-opacity-10 rounded-3">
                                        <span className="display-6 lh-1 text-orange mb-0">
                                            <i className="fas fa-tv fa-fw" />
                                        </span>
                                        <div className="ms-4">
                                            <div className="d-flex">
                                                <h5 className="purecounter mb-0 fw-bold" >{stats.total_courses}</h5>
                                            </div>
                                            <p className="mb-0 h6 fw-light">Total Courses</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Counter item */}
                                <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
                                    <div className="d-flex justify-content-center align-items-center p-4 bg-danger bg-opacity-10 rounded-3">
                                        <span className="display-6 lh-1 text-purple mb-0">
                                            <i className="fas fa-clipboard-check fa-fw" />
                                        </span>
                                        <div className="ms-4">
                                            <div className="d-flex">
                                                <h5 className="purecounter mb-0 fw-bold" >{stats.completed_lessons}</h5>
                                            </div>
                                            <p className="mb-0 h6 fw-light">Complete lessons</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Counter item */}
                                <div className="col-sm-6 col-lg-4 mb-3 mb-lg-0">
                                    <div className="d-flex justify-content-center align-items-center p-4 bg-success bg-opacity-10 rounded-3">
                                        <span className="display-6 lh-1 text-success mb-0">
                                            <i className="fas fa-medal fa-fw" />
                                        </span>
                                        <div className="ms-4">
                                            <div className="d-flex">
                                                <h5 className="purecounter mb-0 fw-bold" >{stats.achieved_certificates}</h5>
                                            </div>
                                            <p className="mb-0 h6 fw-light">Achieved Certificates</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-4">
                                <div className="card-header">
                                    <h3 className="mb-0">Courses</h3>
                                    <span>
                                        Start watching courses now from your dashboard page.
                                    </span>
                                </div>
                                <div className="card-body">
                                    <form className="row gx-3">
                                        <div className="col-lg-12 col-md-12 col-12 mb-lg-0 mb-2">
                                            <input
                                                type="search"
                                                className="form-control"
                                                placeholder="Search Your Courses"
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="table-responsive overflow-y-hidden">
                                    <table className="table mb-0 text-nowrap table-hover table-centered text-nowrap">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Courses</th>
                                                <th>Date Enrolled</th>
                                                <th>Lectures</th>
                                                <th>Completed</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading && (
                                                <tr><td colSpan="5" className="text-center py-4">Loading...</td></tr>
                                            )}
                                            {!loading && courses.length === 0 && (
                                                <tr><td colSpan="5" className="text-center py-4">You are not enrolled in any courses yet.</td></tr>
                                            )}
                                            {!loading && courses.map(enrollment => (
                                                <tr key={enrollment.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <Link to={`/student/courses/${enrollment.course.slug}/`}>
                                                                    <img
                                                                        src={enrollment.course.image || "https://via.placeholder.com/100x70"}
                                                                        alt={enrollment.course.title}
                                                                        className="rounded img-4by3-lg"
                                                                        style={{ width: "100px", height: "70px", borderRadius: "50%", objectFit: "cover" }}
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className="ms-3">
                                                                <h4 className="mb-1 h5">
                                                                    <Link to={`/student/courses/${enrollment.course.slug}/`} className="text-inherit text-decoration-none text-dark">
                                                                        {enrollment.course.title}
                                                                    </Link>
                                                                </h4>
                                                                <ul className="list-inline fs-6 mb-0">
                                                                    <li className="list-inline-item">
                                                                        <i className='bi bi-clock-history'></i>
                                                                        <span className='ms-1'>{enrollment.course.level || "Beginner"}</span>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <i className='bi bi-reception-4'></i>
                                                                        <span className='ms-1'>{enrollment.course.language || "English"}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><p className='mt-3'>{new Date(enrollment.date).toLocaleDateString()}</p></td>
                                                    <td><p className='mt-3'>{enrollment.lectures?.length || 0}</p></td>
                                                    <td><p className='mt-3'>{enrollment.completed_lessons?.length || 0}</p></td>
                                                    <td>
                                                        <Link to={`/student/courses/${enrollment.course.slug}/`} className='btn btn-primary btn-sm mt-3'>
                                                            Continue Course <i className='fas fa-arrow-right'></i>
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

export default Dashboard