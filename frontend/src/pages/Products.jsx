import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

    const location = useLocation();

    useEffect(() => {
        // Check URL parameters for category filtering
        const searchParams = new URLSearchParams(location.search);
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setFilter(categoryParam);
        }

        fetchProducts();
    }, [location]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
            if (!res.ok) throw new Error('Failed to fetch products');
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category.toLowerCase() === filter.toLowerCase());

    return (
        <div className="font-sans min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-primary text-white py-16 text-center">
                <h1 className="text-4xl font-heading font-bold mb-4">Our Products</h1>
                <p className="text-lg text-gray-200">100% Organic Solutions for Sustainable Agriculture</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-2 rounded-full font-bold transition-colors ${filter === 'all' ? 'bg-secondary text-yellow-900 shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
                    >
                        All Products
                    </button>
                    <button
                        onClick={() => setFilter('fertilizers')}
                        className={`px-6 py-2 rounded-full font-bold transition-colors ${filter === 'fertilizers' ? 'bg-secondary text-yellow-900 shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
                    >
                        Organic Fertilizers
                    </button>
                    <button
                        onClick={() => setFilter('fungicides')}
                        className={`px-6 py-2 rounded-full font-bold transition-colors ${filter === 'fungicides' ? 'bg-secondary text-yellow-900 shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
                    >
                        Organic Fungicides
                    </button>
                    <button
                        onClick={() => setFilter('insecticides')}
                        className={`px-6 py-2 rounded-full font-bold transition-colors ${filter === 'insecticides' ? 'bg-secondary text-yellow-900 shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'}`}
                    >
                        Organic Insecticides
                    </button>
                </div>

                {/* Status Indicators */}
                {loading && (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                        <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center max-w-2xl mx-auto">
                        <h3 className="text-red-800 font-bold mb-2">Error Loading Products</h3>
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={fetchProducts}
                            className="mt-4 bg-red-100 text-red-800 hover:bg-red-200 font-medium py-2 px-4 rounded transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Product Grid */}
                {!loading && !error && (
                    <>
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="text-5xl mb-4">🌱</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                                <p className="text-gray-500">We don't have any products in this category yet.</p>
                                <button
                                    onClick={() => setFilter('all')}
                                    className="mt-4 text-primary hover:text-green-800 font-bold underline"
                                >
                                    View all products
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Products;
