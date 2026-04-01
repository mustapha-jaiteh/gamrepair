import React, { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { 
    Shield, 
    Wrench, 
    Clock, 
    ArrowRight, 
    CheckCircle2, 
    Star, 
    Zap,
    Users,
    ChevronRight,
    MapPin,
    PhoneCall,
    CreditCard,
    Mail,
    Menu,
    X,
    Cpu
} from 'lucide-react';

export default function Welcome({ auth, laravelVersion, phpVersion, verifiedMechanicsCount }) {
    const { flash } = usePage().props;
    const [activeSection, setActiveSection] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showFlash, setShowFlash] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setShowFlash(true);
            const timer = setTimeout(() => setShowFlash(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    useEffect(() => {
        // ... intersection observer logic (no change needed to the effect itself)
        // except adding 'overflow-hidden' to body when menu is open
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const sections = ['services', 'how-it-works', 'contact'];
        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        const handleScroll = () => {
            if (window.scrollY < 100) {
                setActiveSection('');
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems = [
        { name: 'Services', href: '#services', id: 'services' },
        { name: 'Mechanics', href: route('public.mechanics'), isLink: true },
        { name: 'How it works', href: '#how-it-works', id: 'how-it-works' },
        { name: 'Contact', href: '#contact', id: 'contact' },
    ];

    return (
        <div className="bg-[#FDFCFB] min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
            <Head title="ORVBA - Premium Roadside Assistance" />

            {/* Flash Messages */}
            {showFlash && flash?.success && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-500">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-bold text-sm tracking-wide">{flash.success}</span>
                    <button onClick={() => setShowFlash(false)} className="ml-2 text-emerald-100 hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div 
                        className="flex items-center gap-3 group cursor-pointer" 
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setIsMenuOpen(false);
                        }}
                    >
                        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 transition-all group-hover:scale-110">
                            <ApplicationLogo className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black text-slate-900 tracking-tight">ORVBA<span className="text-indigo-600">.</span></span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {navItems.map((item) => (
                            item.isLink ? (
                                <Link 
                                    key={item.name} 
                                    href={item.href} 
                                    className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <a 
                                    key={item.name} 
                                    href={item.href} 
                                    className={`text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                                        activeSection === item.id 
                                            ? 'text-indigo-600 scale-110' 
                                            : 'text-slate-400 hover:text-indigo-600'
                                    }`}
                                >
                                    {item.name}
                                </a>
                            )
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-4">
                            <Link
                                href={route('login')}
                                className="px-6 py-2.5 text-slate-600 text-xs font-black uppercase tracking-widest hover:text-indigo-600 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-slate-600 hover:text-indigo-600 transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
                <div className={`absolute right-0 top-0 bottom-0 w-3/4 bg-white shadow-2xl transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-8 pt-24 space-y-8">
                        <div className="flex flex-col gap-6">
                            {navItems.map((item) => (
                                item.isLink ? (
                                    <Link 
                                        key={item.name} 
                                        href={item.href} 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-lg font-black uppercase tracking-widest text-slate-900 flex items-center justify-between group"
                                    >
                                        {item.name}
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                                    </Link>
                                ) : (
                                    <a 
                                        key={item.name} 
                                        href={item.href} 
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`text-lg font-black uppercase tracking-widest flex items-center justify-between group transition-all duration-300 ${
                                            activeSection === item.id 
                                                ? 'text-indigo-600 translate-x-2' 
                                                : 'text-slate-900'
                                        }`}
                                    >
                                        {item.name}
                                        <ChevronRight className={`w-5 h-5 transition-colors ${activeSection === item.id ? 'text-indigo-600' : 'text-slate-300 group-hover:text-indigo-600'}`} />
                                    </a>
                                )
                            ))}
                        </div>

                        <div className="pt-8 border-t border-slate-100 space-y-4">
                            <Link
                                href={route('login')}
                                className="block w-full py-4 border border-slate-100 text-slate-600 rounded-2xl text-center text-xs font-black uppercase tracking-widest"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="block w-full py-4 bg-slate-900 text-white rounded-2xl text-center text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-6">
                                <Zap className="w-3 h-3" />
                                Premium Roadside Assistance
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 mb-8 leading-[0.9]">
                                Don't let a <span className="text-indigo-600">breakdown</span> slow you down.
                            </h1>
                            <p className="text-slate-500 text-xl font-medium leading-relaxed mb-12 max-w-xl">
                                Instant access to certified mechanics nationwide. Modern breakdown assistance for the modern driver.
                            </p>
                            <div className="flex flex-wrap gap-6">
                                <Link 
                                    href={route('register')} 
                                    className="px-10 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-sm tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/20 flex items-center gap-3"
                                >
                                    REQUEST ASSISTANCE <ChevronRight className="w-5 h-5" />
                                </Link>
                                <Link href={route('mechanics.register')} className="px-10 py-5 bg-white border border-slate-100 text-slate-900 rounded-[1.5rem] font-black text-sm tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center gap-3">
                                    BECOME A PARTNER <Users className="w-5 h-5 text-indigo-600" />
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full"></div>
                            <img 
                                src="/images/car-1.jpg" 
                                alt="Premium Vehicle Assistance" 
                                className="relative z-10 rounded-[3rem] shadow-2xl shadow-indigo-200 border-4 border-white object-cover w-full h-[300px] sm:h-[400px] lg:h-[500px]"
                            />
                            {/* Decorative badge on image */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-50 z-20 hidden md:block animate-bounce-slow">
                                <div className="flex items-center gap-4">
                                    <div className="bg-emerald-500 p-3 rounded-2xl">
                                        <CheckCircle2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black underline-offset-4 decoration-emerald-500 uppercase tracking-widest text-slate-400">Status</p>
                                        <p className="text-sm font-black text-slate-900">Mechanic Available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { label: 'Avg Response Time', value: '14 Mins', color: 'indigo' },
                        { label: 'Certified Partners', value: `${verifiedMechanicsCount}+`, color: 'emerald' },
                        { label: 'Customer Rating', value: '4.9/5', color: 'orange' },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-indigo-200 transition-all">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{stat.label}</p>
                            <p className="text-4xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
                        <div className="max-w-2xl">
                            <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Our Expertise</p>
                            <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-[0.9]">Comprehensive coverage for <span className="text-indigo-600">every situation.</span></h2>
                        </div>
                        <p className="text-slate-500 font-medium max-w-sm">From minor engine issues to major towing needs, our network of certified professionals is ready 24/7.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Engine Repair', desc: 'Expert diagnosis and repair for all engine types.', icon: Wrench },
                            { title: 'Car Electronics', desc: 'Advanced diagnostics and repair for modern vehicle systems.', icon: Cpu },
                            { title: 'Battery Jump', desc: 'Quick start for your vehicle anywhere, anytime.', icon: Zap },
                            { title: 'Flat Tire', desc: 'Emergency tire replacement and repair services.', icon: Wrench },
                        ].map((service) => (
                            <div key={service.title} className="bg-[#FDFCFB] p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-50 w-fit mb-6 group-hover:bg-indigo-600 transition-colors">
                                    <service.icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section id="how-it-works" className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <p className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">The Process</p>
                        <h2 className="text-5xl font-black text-slate-900 tracking-tight">How it works?</h2>
                        <p className="text-slate-500 font-medium mt-4">Three simple steps to get you back on the road.</p>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-slate-200 -translate-y-1/2 z-0"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
                            {[
                                { step: '01', title: 'Request Help', desc: 'Submit your location and vehicle details via our platform.' },
                                { step: '02', title: 'Get Matched', desc: 'We instantly alert the nearest certified mechanics in your area.' },
                                { step: '03', title: 'Back on Track', desc: 'Your mechanic arrives within minutes to resolve your issue.' },
                            ].map((item) => (
                                <div key={item.step} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
                                    <span className="inline-block px-4 py-1 bg-indigo-600 text-white rounded-full text-xs font-black tracking-widest mb-6">{item.step}</span>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features (already exists, but let's keep it and adjust visually) */}
            <section className="bg-slate-950 py-32 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-5xl font-black tracking-tight mb-6">Built for speed and reliability.</h2>
                        <p className="text-slate-400 font-medium text-lg">We've reimagined roadside assistance from the ground up to be faster and more transparent than ever.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            { title: 'Real-time Tracking', desc: 'See exactly where your mechanic is and when they will arrive.', icon: MapPin },
                            { title: 'Certified Experts', desc: 'Every mechanic on our platform is thoroughly vetted and certified.', icon: CheckCircle2 },
                            { title: 'Fixed Pricing', desc: 'No hidden fees. You see the price before you confirm the booking.', icon: CreditCard },
                        ].map((feat) => (
                            <div key={feat.title} className="space-y-6 group">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-indigo-600 transition-all">
                                    <feat.icon className="w-8 h-8 text-indigo-500 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight">{feat.title}</h3>
                                <p className="text-slate-400 leading-relaxed font-medium">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer / Contact Section */}
            <footer id="contact" className="pt-32 pb-20 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
                        <div>
                            <div className="flex items-center gap-3 group cursor-pointer mb-8">
                                <div className="bg-indigo-600 p-2 rounded-xl">
                                    <ApplicationLogo className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-black text-slate-900 tracking-tight">ORVBA<span className="text-indigo-600">.</span></span>
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6">Need immediate help or <br />have questions?</h2>
                            <p className="text-slate-500 text-lg font-medium max-w-md mb-10">Our administration team is available to assist you with any inquiries about our services or partnership opportunities.</p>
                            
                            <div className="space-y-6">
                                <div className="flex items-center gap-6 group">
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                        <PhoneCall className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Call Admin</p>
                                        <p className="text-lg font-black text-slate-900">+220 3609991 / +220 6667215</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Enquiries</p>
                                        <p className="text-lg font-black text-slate-900">jaitehm20@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-12 rounded-[3rem] text-white">
                            <h3 className="text-3xl font-black tracking-tight mb-8">Ready to move?</h3>
                            <div className="space-y-4">
                                <Link 
                                    href={route('register')} 
                                    className="block w-full text-center py-5 bg-indigo-600 rounded-[1.5rem] font-black text-sm tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20"
                                >
                                    REGISTER AS A USER
                                </Link>
                                <Link 
                                    href={route('mechanics.register')} 
                                    className="block w-full text-center py-5 bg-white text-slate-900 rounded-[1.5rem] font-black text-sm tracking-widest hover:bg-slate-50 transition-all"
                                >
                                    REGISTER AS A MECHANIC
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">© 2024 ON ROAD VEHICLE BREAKDOWN ASSISTANCE. ALL RIGHTS RESERVED.</p>
                        <div className="flex gap-8">
                            <a href="#" className="text-slate-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-widest transition-colors">Privacy</a>
                            <a href="#" className="text-slate-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-widest transition-colors">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
