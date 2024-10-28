import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Products from './Products';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/dbconfig';

export default function Main() {
    const { currentUser } = useAuth();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsername = async () => {
            if (currentUser) {
                const userDoc = doc(db, 'users', currentUser.uid);
                const userSnap = await getDoc(userDoc);

                if (userSnap.exists()) {
                    setUsername(userSnap.data().Username);
                } else {
                    console.log("No such user document!");
                }
            }
        };

        fetchUsername();
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser) {
            navigate("/signin");
        }
    }, [currentUser, navigate]);

    return (
        <div>
            <Navbar user={username} />
            <Products />
        </div>
    );
}
