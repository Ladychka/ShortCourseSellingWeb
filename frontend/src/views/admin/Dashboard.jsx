import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { API } from '../../utils/apiRoutes';
import useAxios from '../../utils/useAxios';
import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'

function Dashboard() {
    const [stats, setStats] = useState({ total_users: 0, total_courses: 0, total_revenue: 0 });
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const api = useAxios();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const statsReq = api.get(API.ADMIN_STATS);
                const coursesReq = api.get(API.ADMIN_COURSES);
                const usersReq = api.get(API.ADMIN_USERS);
                
                const [statsRes, coursesRes, usersRes] = await Promise.all([statsReq, coursesReq, usersReq]);
                
                setStats(statsRes.data);
                setCourses(coursesRes.data || []);
                setUsers(usersRes.data || []);
            } catch (e) {
                setError(e.message);
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <BaseHeader />
            <section className="pb-5" style={{ paddingTop: "120px" }}>
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-12">
                            <h2 className="fw-bold">Admin Dashboard</h2>
                            <p className="text-muted">Manage platform-wide settings and content.</p>
                        </div>
                    </div>
                    
                    {loading && <div className="alert alert-info">Loading admin dashboard...</div>}
                    {error && <div className="alert alert-danger">{error}</div>}

                    {!loading && !error && (
                        <>
                            {/* Stats */}
                            <div className="row mb-5 g-3">
                                <StatCard icon="fas fa-users" label="Total Users" value={stats.total_users} bg="primary" />
                                <StatCard icon="fas fa-book" label="Total Courses" value={stats.total_courses} bg="info" />
                                <StatCard icon="fas fa-dollar-sign" label="Total Revenue" value={`$${Number(stats.total_revenue).toFixed(2)}`} bg="success" />
                            </div>

                            {/* Course List */}
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-white border-bottom-0 py-3">
                                    <h4 className="mb-0">All Courses</h4>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover table-centered mb-0 align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Course</th>
                                                <th>Teacher</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courses.length === 0 && (
                                                <tr><td colSpan={4} className="text-center py-4">No courses found on platform.</td></tr>
                                            )}
                                            {courses.map(course => (
                                                <tr key={course.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img src={course.image} alt={course.title} className="rounded" style={{width: 60, height: 40, objectFit: 'cover'}} />
                                                            <div className="ms-3">
                                                                <h6 className="mb-0">{course.title}</h6>
                                                                <small className="text-muted">${course.price}</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{course.teacher?.full_name || 'Unknown'}</td>
                                                    <td>
                                                        <span className={`badge ${course.platform_status === 'active' ? 'bg-success' : 'bg-warning'}`}>
                                                            {course.platform_status}
                                                        </span>
                                                    </td>
                                                    <td>{new Date(course.date).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        
                            {/* User List */}
                            <div className="card shadow-sm border-0 mt-5">
                                <div className="card-header bg-white border-bottom-0 py-3">
                                    <h4 className="mb-0">All Users</h4>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover table-centered mb-0 align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>User</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.length === 0 && (
                                                <tr><td colSpan={4} className="text-center py-4">No users found.</td></tr>
                                            )}
                                            {users.map(user => (
                                                <tr key={user.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar avatar-sm rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center fw-bold" style={{width: 40, height: 40}}>
                                                                {user.full_name?.[0] || user.username?.[0] || 'U'}
                                                            </div>
                                                            <div className="ms-3">
                                                                <h6 className="mb-0">{user.full_name || user.username}</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        {user.is_superuser ? <span className="badge bg-danger">Admin</span> : 
                                                         (user.is_staff ? <span className="badge bg-warning text-dark">Staff</span> : 
                                                         <span className="badge bg-info">Student</span>)}
                                                    </td>
                                                    <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
            <BaseFooter />
        </>
    );
}

const StatCard = ({ icon, label, value, bg }) => (
    <div className="col-sm-6 col-lg-4">
        <div className={`d-flex align-items-center p-4 bg-white rounded-3 shadow-sm border-start border-4 border-${bg}`}>
            <div className={`rounded-circle bg-${bg} bg-opacity-10 p-3 d-flex align-items-center justify-content-center`} style={{width: 60, height: 60}}>
                <i className={`${icon} text-${bg} fs-4`} />
            </div>
            <div className="ms-3">
                <h3 className="mb-0 fw-bold text-dark">{value}</h3>
                <p className="mb-0 text-muted small">{label}</p>
            </div>
        </div>
    </div>
);

export default Dashboard;
