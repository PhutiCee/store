import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import { CartContext } from '../context/CartContext';
import Navbar from './Navbar';
import { MdCheckCircle } from 'react-icons/md';
import { CgShoppingCart } from 'react-icons/cg';

const ProductDetails = () => {
    const { productId } = useParams();
    const { products } = useContext(ProductsContext);
    const { shoppingCart, dispatch } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);

    const product = products.find((item) => item.ProductID === productId);

    const handleQuantityChange = (e) => {
        setQuantity(Math.max(1, parseInt(e.target.value) || 1));
    };

    if (!product) return <p>Product not found</p>;

    const isInCart = shoppingCart.some((item) => item.ProductID === productId);

    const handleAddToCart = () => {
        if (!isInCart) {
            dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product });
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 py-8 px-4">
                <div className="container mx-auto flex flex-wrap">
                    {/* Product Images */}
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <img
                            src={product.ProductImg}
                            alt={product.ProductName}
                            className="w-full h-auto rounded-lg shadow-md mb-4"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="w-full md:w-1/2 px-4">
                        <h2 className="text-3xl font-bold mb-2">{product.ProductName}</h2>
                        <p className="text-gray-600 mb-4">SKU: </p>
                        <div className="mb-4">
                            <span className="text-2xl font-bold mr-2">${product.ProductPrice}</span>

                        </div>
                        <p className="text-gray-700 mb-6">{product.ProductDescription}</p>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                                Quantity:
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-16 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>

                        {/* Add to Cart and Wishlist Buttons */}
                        <div className="flex mb-6">
                            <button
                                onClick={handleAddToCart}
                                className={`flex items-center justify-center w-full px-5 py-2.5 rounded-md ${isInCart ? 'bg-green-600' : 'bg-slate-900'} text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300`}

                                disabled={isInCart}
                            >
                                {isInCart ? (
                                    <MdCheckCircle className="w-6 h-6 mr-2" />
                                ) : (
                                    <CgShoppingCart className="w-6 h-6 mr-2" />
                                )}
                                {isInCart ? 'Added to cart' : 'Add to cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
