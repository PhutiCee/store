import React, { useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { auth } from '../config/dbconfig';
import { CartContext } from '../context/CartContext';

export default function Navbar({ user }) {
    const { totalQty } = useContext(CartContext);
    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <header className="text-gray-600 bg-white shadow-md">
            <div className="mx-auto max-w-7xl flex items-center justify-between p-5">
                <nav className="flex items-center justify-stretch">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <div className="relative flex-grow">
                        <BiSearch className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <input
                            id="search"
                            type="text"
                            className='border-b p-2 pl-8 w-full rounded focus:outline-none focus:border-indigo-500'
                            placeholder='Search...'
                        />
                    </div>
                </nav>

                <div className="flex-grow flex justify-center">
                    <Link to="/" className="flex font-medium items-center text-gray-900">
                        <span className="text-2xl font-bold">TITLE</span>
                    </Link>
                </div>

                <div className='flex items-center space-x-4'>
                    <div className='text-gray-500 text-2xl relative cursor-pointer'>
                        <Link to={"/cart"}>
                            <AiOutlineShoppingCart />
                            <div className='absolute -top-4 -right-3 bg-red-600 w-6 h-6 rounded-full text-white text-sm grid place-items-center'>
                                {totalQty}
                            </div>
                        </Link>
                    </div>
                    {user && (
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-900 font-semibold">{user}</span>
                            <button
                                onClick={handleLogout}
                                className="text-sm text-blue-600 hover:text-blue-800"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
