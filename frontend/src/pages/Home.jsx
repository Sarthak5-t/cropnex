import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Leaf, ShieldCheck, Bug, BadgeCheck, Sprout, FlaskConical, Tractor, Globe } from 'lucide-react';

// Reusable animated section component
const FadeInWhenVisible = ({ children, delay = 0, className = "" }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

function Home() {
    return (
        <div className="font-sans overflow-x-hidden pt-10">

            {/* 1. HERO SECTION - Advanced Gradient & Image Base */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0A1A10]">

                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1595841696677-6489ff3f8b1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Organic farming"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A10] via-black/40 to-black/60"></div>
                </div>

                {/* Abstract Glowing Orbs */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-32 -right-32 w-96 h-96 bg-accent rounded-full blur-[120px] z-0"
                ></motion.div>

                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-secondary rounded-full blur-[150px] z-0"
                ></motion.div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-5xl mx-auto text-center mt-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    >
                        <BadgeCheck size={16} className="text-secondary" />
                        <span>100% Certified Organic Solutions</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight mb-8 text-white leading-tight"
                    >
                        Empowering Farmers with <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-light via-secondary to-accent px-2">
                            Organic Innovation
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="mt-4 max-w-2xl text-lg sm:text-xl text-gray-300 mx-auto mb-12 leading-relaxed"
                    >
                        Providing sustainable organic fertilizers, fungicides, and insecticides to improve soil health, maximize crop yield, and protect the ecosystem.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="flex flex-col sm:flex-row justify-center gap-5"
                    >
                        <Link to="/products" className="group relative px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-secondary to-secondary-dark text-yellow-900 shadow-[0_0_20px_rgba(251,192,45,0.4)] hover:shadow-[0_0_30px_rgba(251,192,45,0.6)] transition-all transform hover:-translate-y-1 overflow-hidden">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Explore Products
                                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                            </span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        </Link>

                        <Link to="/about" className="px-8 py-4 rounded-full font-bold text-lg bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300 transform hover:-translate-y-1">
                            Know Our Story
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70"
                >
                    <span className="text-xs mb-2 uppercase tracking-widest font-heading">Scroll</span>
                    <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"></div>
                </motion.div>
            </section>

            {/* 2. ABOUT PREVIEW SECTION - Prominent placement as requested */}
            <section className="py-24 bg-surface relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        <FadeInWhenVisible>
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl z-0"></div>
                                <div className="relative z-10 bg-white p-2 rounded-3xl shadow-soft">
                                    <img
                                        src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                        alt="Company founders in field"
                                        className="w-full h-[500px] object-cover rounded-2xl"
                                    />
                                    {/* Floating stat card */}
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden sm:block"
                                    >
                                        <p className="text-4xl font-heading font-black text-primary mb-1">2015</p>
                                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Year Established</p>
                                    </motion.div>
                                </div>
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.2}>
                            <div>
                                <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wide uppercase text-sm mb-4">
                                    <span className="w-8 h-[2px] bg-primary"></span>
                                    Who We Are
                                </div>
                                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
                                    Cultivating a <span className="text-primary">Sustainable</span> Future
                                </h2>

                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Established in 2015, <b>Cropnex Fourson Organic OPC Pvt. Ltd.</b> is dedicated to promoting organic farming and significantly reducing the harmful effects of chemical fertilizers on soil ecology and human health.
                                </p>
                                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                    We believe in agriculture that works in harmony with nature, providing farmers with cutting-edge biological formulations that increase yields while regenerating the earth.
                                </p>

                                <Link to="/about" className="inline-flex items-center gap-2 text-white font-bold bg-primary hover:bg-primary-dark py-3 px-8 rounded-full shadow-glow transition-all duration-300 transform hover:-translate-y-1 group">
                                    Discover Our Journey
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </FadeInWhenVisible>

                    </div>
                </div>
            </section>

            {/* 3. PRODUCT SOLUTIONS SECTION */}
            <section className="py-24 bg-white relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-surface skew-x-12 translate-x-32 z-0 hidden lg:block"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeInWhenVisible className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Our Core Offerings</h2>
                        <h3 className="text-4xl font-heading font-extrabold text-gray-900 mb-4">Comprehensive Organic Solutions</h3>
                        <p className="text-xl text-gray-600">Scientifically formulated biological products tailored for modern agricultural challenges.</p>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Category 1 */}
                        <FadeInWhenVisible delay={0.1} className="h-full">
                            <div className="bg-white rounded-2xl shadow-card hover:shadow-xl transition-all duration-500 border border-gray-100 group h-full flex flex-col relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="h-48 bg-gray-50 flex items-center justify-center relative overflow-hidden">
                                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary z-10">
                                        <Leaf size={48} strokeWidth={1.5} />
                                    </motion.div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col relative z-10">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-heading group-hover:text-primary transition-colors">Organic Fertilizers</h3>
                                    <p className="text-gray-600 mb-8 flex-grow leading-relaxed">Boost soil fertility, enhance nutrient absorption, and promote vigorous plant growth naturally without toxic chemical residues.</p>
                                    <Link to="/products?category=fertilizers" className="inline-flex items-center text-primary font-bold hover:text-primary-dark group-hover:gap-2 transition-all">
                                        Explore Range <span className="ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all">→</span>
                                    </Link>
                                </div>
                            </div>
                        </FadeInWhenVisible>

                        {/* Category 2 */}
                        <FadeInWhenVisible delay={0.2} className="h-full">
                            <div className="bg-white rounded-2xl shadow-card hover:shadow-xl transition-all duration-500 border border-gray-100 group h-full flex flex-col relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="h-48 bg-gray-50 flex items-center justify-center relative overflow-hidden">
                                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center text-secondary-dark z-10">
                                        <ShieldCheck size={48} strokeWidth={1.5} />
                                    </motion.div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col relative z-10">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-heading group-hover:text-secondary-dark transition-colors">Organic Fungicides</h3>
                                    <p className="text-gray-600 mb-8 flex-grow leading-relaxed">Safeguard your crops from devastating fungal diseases using potent, biologically-derived protective formulations.</p>
                                    <Link to="/products?category=fungicides" className="inline-flex items-center text-secondary-dark font-bold hover:text-yellow-800 group-hover:gap-2 transition-all">
                                        Explore Range <span className="ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all">→</span>
                                    </Link>
                                </div>
                            </div>
                        </FadeInWhenVisible>

                        {/* Category 3 */}
                        <FadeInWhenVisible delay={0.3} className="h-full">
                            <div className="bg-white rounded-2xl shadow-card hover:shadow-xl transition-all duration-500 border border-gray-100 group h-full flex flex-col relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="h-48 bg-gray-50 flex items-center justify-center relative overflow-hidden">
                                    <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center text-accent-dark z-10">
                                        <Bug size={48} strokeWidth={1.5} />
                                    </motion.div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col relative z-10">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-heading group-hover:text-accent-dark transition-colors">Organic Insecticides</h3>
                                    <p className="text-gray-600 mb-8 flex-grow leading-relaxed">Effectively manage and repel pest populations while remaining completely safe for beneficial insects like bees and earthworms.</p>
                                    <Link to="/products?category=insecticides" className="inline-flex items-center text-accent-dark font-bold hover:text-green-800 group-hover:gap-2 transition-all">
                                        Explore Range <span className="ml-1 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all">→</span>
                                    </Link>
                                </div>
                            </div>
                        </FadeInWhenVisible>

                    </div>
                </div>
            </section>

            {/* 4. WHY CHOOSE US SECTION - Advanced visual style */}
            <section className="py-24 bg-primary text-white relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeInWhenVisible className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-4">The Cropnex Advantage</h2>
                        <p className="text-xl text-primary-light max-w-2xl mx-auto">Why thousands of progressive farmers trust our products for their livelihood.</p>
                    </FadeInWhenVisible>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

                        <FadeInWhenVisible delay={0.1}>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl hover:bg-white/15 transition-colors group">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Sprout size={32} className="text-secondary" />
                                </div>
                                <h4 className="font-heading font-bold text-xl mb-3">100% Organic</h4>
                                <p className="text-gray-300 leading-relaxed">Pure botanical and microbial formulations with absolutely no synthetic chemicals.</p>
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.2}>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl hover:bg-white/15 transition-colors group">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <FlaskConical size={32} className="text-accent-light" />
                                </div>
                                <h4 className="font-heading font-bold text-xl mb-3">Scientifically Proven</h4>
                                <p className="text-gray-300 leading-relaxed">Rigorous laboratory testing and extensive field trials back every single product we sell.</p>
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.3}>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl hover:bg-white/15 transition-colors group">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Tractor size={32} className="text-secondary" />
                                </div>
                                <h4 className="font-heading font-bold text-xl mb-3">Farmer Trusted</h4>
                                <p className="text-gray-300 leading-relaxed">Successfully delivering results across thousands of acres and diverse crop varieties.</p>
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.4}>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl hover:bg-white/15 transition-colors group">
                                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Globe size={32} className="text-accent-light" />
                                </div>
                                <h4 className="font-heading font-bold text-xl mb-3">Eco-Regenerative</h4>
                                <p className="text-gray-300 leading-relaxed">Our solutions don't just protect crops; they actively restore degraded soil microbiomes.</p>
                            </div>
                        </FadeInWhenVisible>

                    </div>
                </div>
            </section>

            {/* 5. CTA SECTION */}
            <section className="py-24 bg-surface text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <FadeInWhenVisible>
                        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6 relative z-10">
                                Ready to transform your harvest?
                            </h2>
                            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto relative z-10">
                                Get in touch with our agricultural experts for a personalized consultation on transitioning to sustainable farming.
                            </p>

                            <Link to="/contact" className="relative z-10 inline-flex items-center gap-2 bg-secondary text-yellow-900 font-bold py-4 px-10 rounded-full shadow-[0_4px_20px_rgba(251,192,45,0.4)] hover:shadow-[0_8px_30px_rgba(251,192,45,0.6)] hover:bg-yellow-400 transition-all transform hover:-translate-y-1 text-lg">
                                Contact Our Experts Now
                            </Link>
                        </div>
                    </FadeInWhenVisible>
                </div>
            </section>

        </div>
    );
}

export default Home;
