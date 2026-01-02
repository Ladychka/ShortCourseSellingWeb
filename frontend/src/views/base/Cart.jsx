import React from 'react';
import { Link } from 'react-router-dom';
import BaseHeader from '../partials/BaseHeader';
import BaseFooter from '../partials/BaseFooter';
import useCartStore from '../../store/cart';

function Cart() {
    const { cartItems, cartTotal, removeFromCart } = useCartStore();

    return (
        <>
            <BaseHeader />

            <section className="py-0">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bg-light p-4 text-center rounded-3">
                                <h1 className="m-0">My cart</h1>
                                {/* Breadcrumb */}
                                <div className="d-flex justify-content-center">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb breadcrumb-dots mb-0">
                                            <li className="breadcrumb-item">
                                                <a href="#" className='text-decoration-none text-dark'>Home</a>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <a href="#" className='text-decoration-none text-dark'>Courses</a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                Cart
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-5">
                <div className="container">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="row g-4 g-sm-5">
                            {/* Main content START */}
                            <div className="col-lg-8 mb-4 mb-sm-0">
                                <div className="p-4 shadow rounded-3">
                                    <h5 className="mb-0 mb-3">Cart Items ({cartItems.length})</h5>

                                    <div className="table-responsive border-0 rounded-3">
                                        <table className="table align-middle p-4 mb-0">
                                            <tbody className="border-top-2">
                                                {cartItems.length === 0 && (
                                                    <tr>
                                                        <td colSpan="3" className="text-center p-4">
                                                            Your cart is empty. <Link to="/" className="text-primary">Browse Courses</Link>
                                                        </td>
                                                    </tr>
                                                )}
                                                {cartItems.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <div className="d-lg-flex align-items-center">
                                                                <div className="w-100px w-md-80px mb-2 mb-md-0">
                                                                    <img src={item.image} style={{ width: "100px", height: "70px", objectFit: "contain", padding: "5px", backgroundColor: "#f8f9fa" }} className="rounded" alt="" />
                                                                </div>
                                                                <h6 className="mb-0 ms-lg-3 mt-2 mt-lg-0">
                                                                    <Link to={`/course-detail/${item.slug}/`} className='text-decoration-none text-dark' >{item.title}</Link>
                                                                </h6>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <h5 className="text-success mb-0">${item.price}</h5>
                                                        </td>
                                                        <td>
                                                            <button 
                                                                className="btn btn-sm btn-danger px-2 mb-0"
                                                                onClick={() => removeFromCart(item.id)}
                                                            >
                                                                <i className="fas fa-fw fa-times" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Personal info START */}
                                {/* Keeping this for now but it's not connected to anything yet */}
                                <div className="shadow p-4 rounded-3 mt-5">
                                    <h5 className="mb-0">Personal Details</h5>
                                    <div className="row g-3 mt-0">
                                        <div className="col-md-12 bg-light-input">
                                            <label htmlFor="yourName" className="form-label">Your name *</label>
                                            <input type="text" className="form-control" id="yourName" placeholder="Name" />
                                        </div>
                                        <div className="col-md-12 bg-light-input">
                                            <label htmlFor="emailInput" className="form-label">Email address *</label>
                                            <input type="email" className="form-control" id="emailInput" placeholder="Email" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="p-4 shadow rounded-3">
                                    <h4 className="mb-3">Cart Total</h4>
                                    <ul className="list-group mb-3">
                                        <li className="list-group-item d-flex fw-bold justify-content-between align-items-center">
                                            Total
                                            <span className='fw-bold'>${cartTotal.toFixed(2)}</span>
                                        </li>
                                    </ul>
                                    <div className="d-grid">
                                        <Link to={`/checkout/`} className={`btn btn-lg btn-success ${cartItems.length === 0 ? 'disabled' : ''}`}>
                                            Proceed to Checkout
                                        </Link>
                                    </div>
                                    <p className="small mb-0 mt-2 text-center">
                                        By proceeding to checkout, you agree to these{" "}<a href="#"> <strong>Terms of Service</strong></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <BaseFooter />
        </>
    );
}

export default Cart;