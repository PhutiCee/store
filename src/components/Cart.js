import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import { CgAdd } from 'react-icons/cg';
import { IoTrashOutline } from 'react-icons/io5';
import { BiMinusCircle } from 'react-icons/bi';

export default function Cart() {
    const { currentUser } = useAuth();
    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/signin");
        }
    }, [currentUser, navigate]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto my-4">
                {shoppingCart.length !== 0 ? <h1 className="text-2xl font-bold mb-4">Cart</h1> : null}
                <div className='cart-container'>
                    {shoppingCart.length === 0 ? (
                        <>
                            <div className="text-center text-gray-600">No items in your cart</div>
                            <div className="text-center">
                                <Link to="/" className="text-blue-500 underline">Return to Home page</Link>
                            </div>
                        </>
                    ) : (
                        shoppingCart.map(cart => (
                            <div className='cart-card border rounded-lg shadow-md p-4 mb-4 flex items-center' key={cart.ProductID}>
                                <div className='cart-img'>
                                    <img src={cart.ProductImg} alt="not found" className="w-16 h-16 object-cover rounded" />
                                </div>
                                <div className='cart-name flex-grow ml-4'>
                                    <h2 className="font-medium">{cart.ProductName}</h2>
                                    <div className='cart-price-original text-gray-500'>R {cart.ProductPrice}</div>
                                </div>
                                <div className='dec cursor-pointer' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                                    <BiMinusCircle className='text-2xl' />
                                </div>
                                <div className='quantity mx-2'>{cart.qty}</div>
                                <div className='inc cursor-pointer' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                    <CgAdd className='text-2xl' />
                                </div>
                                <div className='cart-price ml-4 font-bold'>
                                    R {cart.TotalProductPrice}.00
                                </div>
                                <button className='delete-btn ml-4 text-red-500' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                                    <IoTrashOutline className='text-2xl' />
                                </button>
                            </div>
                        ))
                    )}
                    {shoppingCart.length > 0 && (
                        <div className='cart-summary bg-gray-100 p-4 rounded-lg mt-4'>
                            <div className='cart-summary-heading font-semibold text-lg'>
                                Cart Summary
                            </div>
                            <div className='cart-summary-price flex justify-between mt-2'>
                                <span>Total Price</span>
                                <span>R {totalPrice}.00</span>
                            </div>
                            <div className='cart-summary-price flex justify-between'>
                                <span>Total Qty</span>
                                <span>{totalQty}</span>
                            </div>
                            <Link to='/cashout' className='cashout-link mt-4 block text-center'>
                                <button className='btn btn-success btn-md bg-green-500 text-white p-2 rounded hover:bg-green-600'>
                                    Cash on delivery
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
