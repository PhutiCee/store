import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/dbconfig';
import { addDoc, collection } from 'firebase/firestore';

export default function AddProduct() {
    const [productName, setProductName] = useState('');
    const [ProductPrice, setPrice] = useState('');
    const [ProductDescription, setDescription] = useState('');
    const [ProductImg, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setError("Please select a valid image");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!ProductImg) {
            setError("Please upload an image");
            return;
        }

        try {
            const imageRef = ref(storage, `products/${ProductImg.name}`);
            const uploadTask = uploadBytes(imageRef, ProductImg);

            await uploadTask;

            const imageUrl = await getDownloadURL(imageRef);

            const productData = {
                ProductName: productName,
                ProductPrice: parseFloat(ProductPrice),
                ProductDescription,
                ProductImg: imageUrl,
            };

            await addDoc(collection(db, 'products'), productData);
            setSuccess("Product added successfully!");
        } catch (error) {
            setError("Error adding product: " + error.message);
        } finally {
            setProductName('');
            setPrice('');
            setDescription('');
            setImage(null);
            setImagePreview('');
        }
    };

    return (
        <div className='flex flex-col h-screen justify-center items-center mx-auto p-4'>
            <h2 className='text-3xl font-extrabold my-4'>ADD PRODUCT</h2>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-500 font-bold mb-1" htmlFor="product-name">
                        Product Name
                    </label>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="product-name"
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-500 font-bold mb-1" htmlFor="price">
                        Price
                    </label>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="price"
                        type="number"
                        value={ProductPrice}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-500 font-bold mb-1" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="description"
                        value={ProductDescription}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-500 font-bold mb-1" htmlFor="image">
                        Image Upload
                    </label>
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="mt-2 w-full h-auto object-cover" />
                    )}
                </div>
                {error && <span className="text-red-500">{error}</span>}
                {success && <span className="text-green-500">{success}</span>}
                <div className="flex justify-center">
                    <button
                        className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
                        type="submit"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
}
