import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import useCartStore from '../../store/cart';

function BaseHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems } = useCartStore();
    const access = Cookies.get('access_token');
    const [query, setQuery] = React.useState("");
    const onSearch = (e) => {
        e.preventDefault();
        if (query.trim()) navigate(`/search/?q=${encodeURIComponent(query.trim())}`);
    };

    return (
        <header className="border-bottom sticky-top bg-body" style={{ backdropFilter: 'blur(6px)' }}>
            <nav className="navbar navbar-expand-lg container" aria-label="Main navigation">
                <Link className="navbar-brand fw-bold" to="/">Desphixs</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mainNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className={`nav-link ${location.pathname.startsWith('/pages/about-us') ? 'active' : ''}`} to="/pages/about-us/">About</Link></li>
                        <li className="nav-item"><Link className={`nav-link ${location.pathname.startsWith('/pages/contact-us') ? 'active' : ''}`} to="/pages/contact-us/">Contact</Link></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" role="button" aria-expanded="false">Instructor</a>
                            <ul className="dropdown-menu small">
                                <li><Link className="dropdown-item" to="/instructor/dashboard/">Dashboard</Link></li>
                                <li><Link className="dropdown-item" to="/instructor/courses/">My Courses</Link></li>
                                <li><Link className="dropdown-item" to="/instructor/create-course/">Create Course</Link></li>
                                <li><Link className="dropdown-item" to="/instructor/reviews/">Reviews</Link></li>
                                <li><Link className="dropdown-item" to="/instructor/question-answer/">Q/A</Link></li>
                                <li><Link className="dropdown-item" to="/instructor/students/">Students</Link></li>
                                <li><Link className="dropdown-item" to="/instructor/earning/">Earning</Link></li>
                                <li><Link className="dropdown-item" to="/instructor/profile/">Profile</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" role="button" aria-expanded="false">Student</a>
                            <ul className="dropdown-menu small">
                                <li><Link className="dropdown-item" to="/student/dashboard/">Dashboard</Link></li>
                                <li><Link className="dropdown-item" to="/student/courses/">My Courses</Link></li>
                                <li><Link className="dropdown-item" to="/student/wishlist/">Wishlist</Link></li>
                                <li><Link className="dropdown-item" to="/student/question-answer/">Q/A</Link></li>
                                <li><Link className="dropdown-item" to="/student/profile/">Profile</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex me-lg-3 mb-3 mb-lg-0" role="search" onSubmit={onSearch} style={{ maxWidth: 380 }}>
                        <input className="form-control form-control-sm me-2" placeholder="Search courses..." value={query} onChange={e => setQuery(e.target.value)} />
                        <button className="btn btn-sm btn-outline-primary" type="submit"><i className="fas fa-search"></i></button>
                    </form>
                    <div className="d-flex align-items-center gap-2">
                        <Link to="/cart/" className="btn btn-sm btn-outline-success position-relative">
                            <i className="fas fa-shopping-cart"></i>
                            {cartItems.length > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cartItems.length}</span>}
                        </Link>
                        {!access && <Link to="/login/" className="btn btn-sm btn-primary">Login</Link>}
                        {!access && <Link to="/register/" className="btn btn-sm btn-outline-primary">Register</Link>}
                        {access && <Link to="/logout/" className="btn btn-sm btn-outline-danger">Logout</Link>}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default BaseHeader;
