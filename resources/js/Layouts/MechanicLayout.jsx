import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    ClipboardList, 
    Bell, 
    User, 
    LogOut,
    Car,
    Wrench,
    History,
    Menu,
    X
} from 'lucide-react';

export default function MechanicLayout({ children }) {
    const { auth } = usePage().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', href: route('mechanics.dashboard'), icon: LayoutDashboard, routeName: 'mechanics.dashboard' },
        { name: 'Latest Requests', href: route('mechanics.bookings'), icon: Bell, routeName: 'mechanics.bookings' },
        { name: 'Service History', href: route('mechanics.services'), icon: History, routeName: 'mechanics.services' },
        { name: 'Profile', href: route('profile.edit'), icon: User, routeName: 'profile.edit' },
    ];

    const SidebarContent = () => (
        <>
            <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                <div className="bg-orange-600 p-2 rounded-lg transition-transform group-hover:scale-110">
                    <ApplicationLogo className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="font-bold text-xl tracking-tight">ORVBA</h1>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Mechanic Panel</p>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 mt-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = route().current(item.routeName);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                active 
                                ? 'bg-slate-800 text-white shadow-lg shadow-slate-900/20' 
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                            }`}
                        >
                            <Icon className={`w-5 h-5 ${active ? 'text-white' : 'group-hover:text-slate-100'}`} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-colors group"
                >
                    <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="font-medium">Logout</span>
                </Link>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-slate-50 flex">
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
                <SidebarContent />
            </aside>

            {/* Desktop Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-100 hidden md:flex flex-col fixed h-full shadow-xl">
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 w-full overflow-x-hidden">
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 w-full">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 bg-slate-50 rounded-lg text-slate-600 md:hidden hover:bg-slate-100"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <h2 className="text-slate-500 text-[10px] md:text-sm font-medium uppercase tracking-widest md:normal-case md:tracking-normal">Hello,</h2>
                            <p className="text-slate-900 font-bold text-sm md:text-base">{auth.user.name}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="flex flex-col items-end mr-1 md:mr-2">
                             <span className="text-[8px] md:text-[10px] font-bold text-emerald-600 uppercase tracking-tighter bg-emerald-50 px-2 py-0.5 rounded">Active Status</span>
                        </div>
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold ring-4 ring-orange-50 text-xs md:text-base">
                            {auth.user.name.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
