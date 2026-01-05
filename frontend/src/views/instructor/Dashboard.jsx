import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { API } from '../../utils/apiRoutes';
import useAxios from '../../utils/useAxios';
import Sidebar from './Partials/Sidebar'
import Header from './Partials/Header'

import BaseHeader from '../partials/BaseHeader'
import BaseFooter from '../partials/BaseFooter'

function Dashboard() {
    const [stats, setStats] = useState({ total_courses: 0, total_students: 0, total_revenue: 0 });
    const [courses, setCourses] = useState([]);
    const [trend, setTrend] = useState([]);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const api = useAxios();

    // Fetch stats once
    useEffect(() => {
        const run = async () => {
            try {
                const { data } = await api.get(API.INSTRUCTOR_STATS);
                setStats(data);
            } catch (e) {
                setError(e.message);
            }
        };
        run();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Fetch courses when page/query/pageSize changes (debounce query)
    useEffect(() => {
        const controller = new AbortController();
        const run = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`${API.INSTRUCTOR_COURSES_MINI}?page=${page}&page_size=${pageSize}&q=${encodeURIComponent(query)}`, { signal: controller.signal });
                setCourses(data.results || []);
                setCount(data.count || 0);
            } catch (e) {
                if (e.name !== 'CanceledError') setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        // small debounce for search
        const t = setTimeout(run, 300);
        return () => { controller.abort(); clearTimeout(t); };
    }, [page, pageSize, query]); // eslint-disable-line react-hooks/exhaustive-deps

    // Fetch revenue trend once
    useEffect(() => {
        const run = async () => {
            try {
                const { data } = await api.get(API.INSTRUCTOR_REVENUE_TREND);
                setTrend(data);
            } catch (e) {
                setError(e.message);
            }
        };
        run();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const totalPages = useMemo(() => Math.max(1, Math.ceil(count / pageSize)), [count, pageSize]);
    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <>
            <BaseHeader />
            <section className="pb-5" style={{ paddingTop: "120px" }}>
                <div className="container">
                    <Header />
                    <div className="row mt-0 mt-md-4">
                        <Sidebar />
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="mb-0"><i className='bi bi-grid-fill'></i> Dashboard</h4>
                            </div>
                            {loading && <div className="alert alert-info">Loading dashboard...</div>}
                            {error && <div className="alert alert-danger">{error}</div>}
                            {!loading && !error && (
                                <div className="row mb-4 g-3">
                                    <StatCard icon="fas fa-tv" label="Total Courses" value={stats.total_courses} bg="warning" />
                                    <StatCard icon="fas fa-graduation-cap" label="Total Students" value={stats.total_students} bg="danger" />
                                    <StatCard icon="fas fa-dollar-sign" label="Total Revenue" value={`$${Number(stats.total_revenue).toFixed(2)}`} bg="success" />
                                </div>
                            )}

                            <div className="card mb-4">
                                <div className="card-header">
                                    <h3 className="mb-0">Courses</h3>
                                    <span>Manage your courses here. Search, view, edit or delete.</span>
                                </div>
                                <div className="card-body">
                                    <div className="row gx-3">
                                        <div className="col-12 mb-2">
                                            <input type="search" className="form-control" placeholder="Search Your Courses" value={query} onChange={e => setQuery(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table mb-0 table-hover table-centered">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Course</th>
                                                <th>Students</th>
                                                <th>Level</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courses.length === 0 && !loading && (
                                                <tr>
                                                    <td colSpan={6} className="text-center py-4">No courses found.</td>
                                                </tr>
                                            )}
                                            {courses.map(course => (
                                                <tr key={course.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <img src={course.image || 'https://via.placeholder.com/100x70'} alt={course.title} style={{ width: 100, height: 70, objectFit: 'contain', padding: '5px', backgroundColor: '#f8f9fa', borderRadius: 8 }} />
                                                            </div>
                                                            <div className="ms-3">
                                                                <h6 className="mb-1">{course.title}</h6>
                                                                <small className="text-muted">${course.price || '0.00'}</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{course.enrolled || 0}</td>
                                                    <td><span className='badge bg-success'>{course.level}</span></td>
                                                    <td><span className='badge bg-warning text-dark'>{course.teacher_status}</span></td>
                                                    <td>{new Date(course.date).toLocaleDateString()}</td>
                                                    <td>
                                                        <Link to={`/instructor/course-edit/${course.slug}`} className='btn btn-primary btn-sm me-1'><i className='fas fa-edit'></i></Link>
                                                        <button className='btn btn-danger btn-sm me-1'><i className='fas fa-trash'></i></button>
                                                        <button className='btn btn-secondary btn-sm'><i className='fas fa-eye'></i></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer d-flex flex-wrap justify-content-between align-items-center gap-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <button className="btn btn-sm btn-outline-secondary" disabled={!canPrev} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
                                        <span className="small">Page {page} / {totalPages}</span>
                                        <button className="btn btn-sm btn-outline-secondary" disabled={!canNext} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</button>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <label className="small text-muted">Page Size</label>
                                        <select className="form-select form-select-sm" value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
                                            {[5,10,20,50].map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='card mb-4'>
                                <div className='card-header'>
                                    <h3 className='mb-0'>Revenue (30 days)</h3>
                                </div>
                                <div className='card-body'>
                                    {trend.length === 0 && <p className='text-muted mb-0'>No revenue yet.</p>}
                                    {trend.length > 0 && (
                                        <div style={{display:'flex', gap:4, alignItems:'flex-end', height:120}}>
                                            {trend.map(pt => (
                                                <div key={pt.date} title={`${pt.date}: $${pt.total}`} style={{background:'#198754', width:10, borderRadius:2, height:`${Math.min(100, Number(pt.total)) + 10}px`}} />
                                            ))}
                                        </div>
                                    )}
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

const StatCard = ({ icon, label, value, bg }) => (
    <div className="col-sm-6 col-lg-4">
        <div className={`d-flex justify-content-center align-items-center p-4 bg-${bg} bg-opacity-10 rounded-3`}>
            <span className="display-6 lh-1 mb-0">
                <i className={`${icon} text-${bg}`} />
            </span>
            <div className="ms-4">
                <div className="d-flex">
                    <h5 className="mb-0 fw-bold">{value}</h5>
                </div>
                <p className="mb-0 h6 fw-light">{label}</p>
            </div>
        </div>
    </div>
);

export default Dashboard