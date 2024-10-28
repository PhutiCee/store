import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/dbconfig';
import { CartContext } from '../context/CartContext';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export const Cashout = () => {
    const history = useNavigate();
    const { totalPrice, totalQty, dispatch } = useContext(CartContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const unsubscribeSnapshot = onSnapshot(userDocRef, snapshot => {
                    setName(snapshot.data().Username);
                    setEmail(snapshot.data().Email);
                });
                return () => unsubscribeSnapshot();
            } else {
                history('/login');
            }
        });
        return () => unsubscribe();
    }, [history]);

    const cashoutSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (user) {
            const date = new Date();
            const time = date.getTime();
            try {
                await setDoc(doc(db, `Buyer-info ${user.uid}`, `_${time}`), {
                    BuyerName: name,
                    BuyerEmail: email,
                    BuyerCell: cell,
                    BuyerAddress: address,
                    BuyerPayment: totalPrice,
                    BuyerQuantity: totalQty
                });
                setCell('');
                setAddress('');
                dispatch({ type: 'EMPTY' });
                setSuccessMsg('Your order has been placed successfully. Thanks for visiting us.');
            } catch (err) {
                setError(err.message);
            }
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            {successMsg ? (
                <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white shadow-md rounded-lg p-6 mt-4">
                    <div className="text-green-500 text-center text-lg font-semibold mb-4">{successMsg}</div>
                    <button
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition duration-300"
                        onClick={() => history('/')}
                    >
                        Go to home page
                    </button>
                </div>
            ) : (
                <>
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Cashout Details</h2>
                        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                        <form className="space-y-6" onSubmit={cashoutSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        value={name} disabled
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="email"
                                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        value={email} disabled
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="cell" className="block text-sm font-medium leading-6 text-gray-900">Cell No</label>
                                <div className="mt-2">
                                    <input
                                        id="cell"
                                        type="number"
                                        required
                                        onChange={(e) => setCell(e.target.value)}
                                        value={cell}
                                        placeholder='eg 03123456789'
                                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">Delivery Address</label>
                                <div className="mt-2">
                                    <input
                                        id="address"
                                        type="text"
                                        required
                                        onChange={(e) => setAddress(e.target.value)}
                                        value={address}
                                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Price To Pay</label>
                                <div className="mt-2">
                                    <input
                                        id="price"
                                        type="number"
                                        required
                                        value={totalPrice} disabled
                                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">Total No of Products</label>
                                <div className="mt-2">
                                    <input
                                        id="quantity"
                                        type="number"
                                        required
                                        value={totalQty} disabled
                                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};
