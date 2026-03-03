import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, MessageSquare, ArrowRight, Activity, TrendingUp } from 'lucide-react';

function AdminDashboard() {
    const [stats, setStats] = useState({ products: 0, messages: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                const prodRes = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
                const products = await prodRes.json();

                const msgRes = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/messages`, { headers });

                if (msgRes.status === 401) {
                    localStorage.removeItem('adminToken');
                    window.location.href = '/admin/login';
                    return;
                }

                const messages = msgRes.ok ? await msgRes.json() : [];

                setStats({
                    products: products.length || 0,
                    messages: messages.length || 0
                });
            } catch (err) {
                console.error("Failed to load dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="pb-10">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-heading font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-2 font-medium">Welcome back. Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                    <Activity size={16} /> System Online
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full"></motion.div>
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                >
                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-card border border-gray-100 flex items-center group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0"></div>
                        <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex flex-shrink-0 items-center justify-center text-primary mr-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
                            <Package size={28} strokeWidth={2} />
                        </div>
                        <div className="z-10 relative">
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Total Products</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-4xl font-heading font-black text-gray-900 leading-none">{stats.products}</h3>
                                <span className="text-xs font-bold text-green-600 flex items-center bg-green-50 px-2 py-0.5 rounded-full"><TrendingUp size={10} className="mr-1" /> active</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-white p-8 rounded-3xl shadow-card border border-gray-100 flex items-center group hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full -z-0"></div>
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex flex-shrink-0 items-center justify-center text-blue-600 mr-6 shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 z-10">
                            <MessageSquare size={28} strokeWidth={2} />
                        </div>
                        <div className="z-10 relative">
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Total Queries</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-4xl font-heading font-black text-gray-900 leading-none">{stats.messages}</h3>
                                <span className="text-xs font-bold text-blue-600 flex items-center bg-blue-50 px-2 py-0.5 rounded-full">inbox</span>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl shadow-card border border-gray-100 p-8 md:p-10 relative overflow-hidden"
            >
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none"></div>

                <h2 className="text-2xl font-heading font-extrabold text-gray-900 mb-2">Quick Actions</h2>
                <p className="text-gray-500 mb-8 max-w-2xl">Jump straight into managing your catalog or responding to customer inquiries.</p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/admin/products" className="group flex-1 bg-gray-50 hover:bg-primary text-gray-700 hover:text-white border border-gray-200 hover:border-primary p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-glow flex items-center justify-between">
                        <div>
                            <span className="block font-bold text-lg mb-1">Manage Catalog</span>
                            <span className="text-sm opacity-70 group-hover:opacity-90 font-medium">Add or edit your product inventory</span>
                        </div>
                        <div className="w-10 h-10 bg-white group-hover:bg-primary-dark rounded-full flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <Link to="/admin/messages" className="group flex-1 bg-gray-50 hover:bg-gray-900 text-gray-700 hover:text-white border border-gray-200 hover:border-gray-900 p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl flex items-center justify-between">
                        <div>
                            <span className="block font-bold text-lg mb-1">View Messages</span>
                            <span className="text-sm opacity-70 group-hover:opacity-90 font-medium">Read incoming contact form submissions</span>
                        </div>
                        <div className="w-10 h-10 bg-white group-hover:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default AdminDashboard;
