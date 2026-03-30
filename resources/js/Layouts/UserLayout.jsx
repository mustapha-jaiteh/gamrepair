import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Wrench, 
    History, 
    User, 
    LogOut, 
    Menu, 
    X,
    Bell,
    Settings,
    Shield
} from 'lucide-react';
import { useState } from 'react';

export default function UserLayout({ children }) {
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard, routeName: 'dashboard' },
        { name: 'Mechanics', href: route('user.mechanics'), icon: Wrench, routeName: 'user.mechanics' }, 
        { name: 'My Bookings', href: route('user.bookings'), icon: History, routeName: 'user.bookings' },
        { name: 'Profile', href: route('profile.edit'), icon: User, routeName: 'profile.edit' },
    ];

    const SidebarContent = ({ isMobile = false }) => (
        <div className="flex flex-col h-full px-4 py-8">
            {/* Brand */}
            <div className={`flex items-center gap-4 mb-12 px-2 ${(!isSidebarOpen && !isMobile) ? 'justify-center' : ''}`}>
                <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-200 transition-transform group-hover:scale-110">
                    <ApplicationLogo className="w-6 h-6 text-white" />
                </div>
                {(isSidebarOpen || isMobile) && (
                    <span className="text-xl font-black text-white tracking-tight">ORVBA<span className="text-indigo-400">.</span></span>
                )}
            </div>

            {/* Nav Links */}
            <nav className="flex-1 space-y-2">
                {navigation.map((item) => {
                    const isActive = item.routeName ? route().current(item.routeName) : false;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => isMobile && setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                                isActive 
                                ? 'bg-slate-800 text-white shadow-lg shadow-slate-900/20' 
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                            } ${(!isSidebarOpen && !isMobile) ? 'justify-center px-0' : ''}`}
                        >
                            <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'group-hover:text-slate-100'}`} />
                            {(isSidebarOpen || isMobile) && (
                                <span className="font-bold text-sm tracking-tight">{item.name}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Utility */}
            <div className="mt-auto space-y-4 pt-4 border-t border-slate-800">
                <Link
                    method="post"
                    as="button"
                    href={route('logout')}
                    className={`flex items-center gap-4 px-4 py-3.5 w-full rounded-2xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group ${(!isSidebarOpen && !isMobile) ? 'justify-center px-0' : ''}`}
                >
                    <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    {(isSidebarOpen || isMobile) && <span className="font-bold text-sm tracking-tight">Logout</span>}
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFCFB] flex">
            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-72 bg-slate-900 text-slate-100 flex flex-col z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <SidebarContent isMobile={true} />
            </aside>

            {/* Desktop Sidebar */}
            <aside className={`hidden md:block fixed top-0 left-0 z-40 h-screen transition-all duration-500 ease-in-out border-r border-slate-800 bg-slate-900 text-slate-100 overflow-hidden ${isSidebarOpen ? 'w-72' : 'w-24'}`}>
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-500 ease-in-out w-full overflow-x-hidden ${isSidebarOpen ? 'md:ml-72' : 'md:ml-24'}`}>
                {/* Header */}
                <header className="flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-30 px-6 py-4 border-b border-slate-100 transition-all">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Toggle */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 bg-slate-50 rounded-xl text-slate-600 md:hidden hover:bg-slate-100 transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        
                        {/* Desktop Sidebar Toggle */}
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="hidden md:flex p-3 hover:bg-white rounded-2xl transition-colors border border-transparent hover:border-slate-100 shadow-sm md:shadow-none"
                        >
                            {isSidebarOpen ? <X className="w-5 h-5 text-slate-600" /> : <Menu className="w-5 h-5 text-slate-600" />}
                        </button>

                        <div className="md:hidden">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Hello,</p>
                            <p className="text-sm font-black text-slate-900">{auth.user.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        <button className="p-2 md:p-3 text-slate-400 hover:text-indigo-600 relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 md:top-2.5 right-2 md:right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        
                        <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-slate-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-slate-900 leading-tight">{auth.user.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Premium Member</p>
                            </div>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-50 rounded-xl md:rounded-2xl flex items-center justify-center border-2 border-indigo-100/50 overflow-hidden shadow-inner shrink-0 text-indigo-600 font-bold">
                                {auth.user.name.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </div>
            </main>
        </div>
    );
}
