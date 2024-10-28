import React, { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { CartContext } from '../context/CartContext';
import { CgShoppingCart } from 'react-icons/cg';
import { MdCheckCircle } from 'react-icons/md'; // Icon for "Added to cart"
import { Link } from 'react-router-dom';

export default function Products() {
    const { products } = useContext(ProductsContext);
    const { shoppingCart, dispatch } = useContext(CartContext);

    return (
        <div className="container mx-auto px-4 py-8">
            {products.length !== 0 && <h1 className="text-3xl font-bold text-center mb-6">Products</h1>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.length === 0 ? (
                    <div className="col-span-full text-center text-lg text-gray-600">No products to display</div>
                ) : (
                    products.map(product => {
                        const inCart = shoppingCart.some(cartItem => cartItem.ProductID === product.ProductID);

                        return (
                            <div key={product.ProductID} className="flex flex-col w-full max-w-xs mx-auto overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md sm:m-4">
                                <Link className="mt-3 h-60 overflow-hidden rounded-xl" to={`/product/${product.ProductID}`}>
                                    <img className="w-full h-full object-cover" src={product.ProductImg} alt={product.ProductName} />
                                </Link>
                                <div className="px-5 pb-5 mt-4">
                                    <Link to={`/product/${product.ProductID}`}>
                                        <h5 className="text-xl tracking-tight text-slate-900">{product.ProductName}</h5>
                                    </Link>
                                    <div className="flex items-center justify-between mt-2 mb-5">
                                        <p>
                                            <span className="text-2xl font-bold text-slate-900">R {product.ProductPrice}</span>
                                        </p>
                                    </div>
                                    <button
                                        className={`flex items-center justify-center w-full px-5 py-2.5 rounded-md ${inCart ? 'bg-green-600' : 'bg-slate-900'} text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300`}
                                        onClick={() => {
                                            if (!inCart) {
                                                dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product });
                                            }
                                        }}
                                    >
                                        {inCart ? (
                                            <MdCheckCircle className="w-6 h-6 mr-2" />
                                        ) : (
                                            <CgShoppingCart className="w-6 h-6 mr-2" />
                                        )}
                                        {inCart ? 'Added to cart' : 'Add to cart'}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
