import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Calendar, User, Search, Inbox } from 'lucide-react';

function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/messages`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (res.status === 401) {
                    localStorage.removeItem('adminToken');
                    window.location.href = '/admin/login';
                    return;
                }

                if (res.ok) {
                    const data = await res.json();
                    // Sort messages by date, newest first
                    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setMessages(sortedData);
                } else {
                    console.error("Failed to fetch messages");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-heading font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                        <Inbox className="text-blue-500 hidden sm:block" size={32} />
                        Visitor Inquiries
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium">Review and respond to customer messages</p>
                </div>

                <div className="relative group w-full md:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-72 transition-all bg-white shadow-soft"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full"></motion.div>
                </div>
            ) : filteredMessages.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 rounded-3xl shadow-card text-center border border-gray-100 flex flex-col items-center justify-center min-h-[400px]"
                >
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-300 mb-6">
                        <Inbox size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Messages Found</h2>
                    <p className="text-gray-500 max-w-md">
                        {searchQuery ? `We couldn't find any messages matching "${searchQuery}".` : "Your inbox is currently empty. New inquiries from the contact form will appear here."}
                    </p>
                </motion.div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                >
                    {filteredMessages.map((msg) => (
                        <motion.div
                            key={msg._id}
                            variants={itemVariants}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-6 flex flex-col md:flex-row gap-6 group transition-all duration-300"
                        >
                            {/* Sender Info Sidebar */}
                            <div className="md:w-1/3 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6 space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 text-gray-800 font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                                        <User size={18} className="text-gray-400 group-hover:text-blue-500" />
                                        {msg.name}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                        <Calendar size={14} />
                                        {new Date(msg.date).toLocaleDateString('en-US', {
                                            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <a href={`mailto:${msg.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-lg">
                                        <Mail size={16} className="text-gray-400" />
                                        <span className="truncate">{msg.email}</span>
                                    </a>
                                    <a href={`tel:${msg.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-lg">
                                        <Phone size={16} className="text-gray-400" />
                                        {msg.phone}
                                    </a>
                                </div>
                            </div>

                            {/* Message Content */}
                            <div className="md:w-2/3 flex flex-col">
                                <div className="flex-1 bg-gray-50/50 rounded-xl p-5 border border-gray-100">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                </div>
                                <div className="mt-4 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <a
                                        href={`mailto:${msg.email}?subject=Reply to your inquiry regarding Cropnex Organic`}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg text-sm font-bold transition-colors"
                                    >
                                        <Mail size={16} />
                                        Reply via Email
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}

export default AdminMessages;
