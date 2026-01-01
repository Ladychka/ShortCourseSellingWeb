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
        <header className="fixed-top glass-nav" style={{ zIndex: 1000 }}>
            <nav className="navbar navbar-expand-lg container py-3">
                <Link className="navbar-brand fw-bold me-5" to="/">
                    <img src="/logo.png" alt="Code Sprout" style={{ height: 40 }} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mainNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
                        <li className="nav-item">
                            <Link className={`nav-link fw-semibold ${location.pathname.startsWith('/pages/about-us') ? 'active text-primary' : ''}`} to="/pages/about-us/">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link fw-semibold ${location.pathname.startsWith('/pages/contact-us') ? 'active text-primary' : ''}`} to="/pages/contact-us/">Contact</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle fw-semibold" href="#" data-bs-toggle="dropdown" role="button" aria-expanded="false">Instructor</a>
                            <ul className="dropdown-menu glass border-0 shadow-lg mt-2">
                                <li><Link className="dropdown-item py-2" to="/instructor/dashboard/">Dashboard</Link></li>
                                <li><Link className="dropdown-item py-2" to="/instructor/courses/">My Courses</Link></li>
                                <li><Link className="dropdown-item py-2" to="/instructor/create-course/">Create Course</Link></li>
                                <li><Link className="dropdown-item py-2" to="/instructor/reviews/">Reviews</Link></li>
                                <li><Link className="dropdown-item py-2" to="/instructor/question-answer/">Q/A</Link></li>
                                <li><Link className="dropdown-item py-2" to="/instructor/students/">Students</Link></li>
                                <li><Link className="dropdown-item py-2" to="/instructor/earning/">Earning</Link></li>
                                <li><Link className="dropdown-item py-2" to="/instructor/profile/">Profile</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle fw-semibold" href="#" data-bs-toggle="dropdown" role="button" aria-expanded="false">Student</a>
                            <ul className="dropdown-menu glass border-0 shadow-lg mt-2">
                                <li><Link className="dropdown-item py-2" to="/student/dashboard/">Dashboard</Link></li>
                                <li><Link className="dropdown-item py-2" to="/student/courses/">My Courses</Link></li>
                                <li><Link className="dropdown-item py-2" to="/student/wishlist/">Wishlist</Link></li>
                                <li><Link className="dropdown-item py-2" to="/student/question-answer/">Q/A</Link></li>
                                <li><Link className="dropdown-item py-2" to="/student/profile/">Profile</Link></li>
                            </ul>
                        </li>
                    </ul>
                    
                    <form className="d-flex me-lg-4 mb-3 mb-lg-0 position-relative" role="search" onSubmit={onSearch} style={{ maxWidth: 300, width: '100%' }}>
                        <input 
                            className="form-control ps-4 pe-5" 
                            placeholder="Find your course..." 
                            value={query} 
                            onChange={e => setQuery(e.target.value)} 
                            style={{ borderRadius: '50px' }}
                        />
                        <button 
                            className="btn position-absolute end-0 top-50 translate-middle-y rounded-circle text-secondary" 
                            type="submit"
                            style={{ background: 'transparent', border: 'none', right: '5px' }}
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </form>

                    <div className="d-flex align-items-center gap-2">
                        <Link to="/cart/" className="btn btn-outline-secondary position-relative rounded-circle d-flex align-items-center justify-content-center p-0" style={{width: 40, height: 40}}>
                            <i className="fas fa-shopping-cart"></i>
                            {cartItems.length > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light" style={{ fontSize: '0.6rem' }}>{cartItems.length}</span>}
                        </Link>
                        {!access && <Link to="/login/" className="btn btn-primary px-4 rounded-pill">Login</Link>}
                        {!access && <Link to="/register/" className="btn btn-outline-secondary px-4 rounded-pill">Register</Link>}
                        {access && <Link to="/logout/" className="btn btn-outline-danger px-4 rounded-pill">Logout</Link>}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default BaseHeader;
