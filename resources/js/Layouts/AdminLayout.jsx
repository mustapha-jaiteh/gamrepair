import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Users, 
    Wrench, 
    CalendarCheck, 
    ClipboardList, 
    MessageSquare,
    LogOut,
    Car
} from 'lucide-react';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;

    const navItems = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard },
        { name: 'Users', href: route('admin.users'), icon: Users },
        { name: 'Mechanics', href: route('admin.mechanics'), icon: Wrench },
        { name: 'Bookings', href: route('admin.bookings'), icon: CalendarCheck },
        { name: 'Services', href: route('admin.services'), icon: ClipboardList },
        { name: 'Feedbacks', href: route('admin.feedbacks'), icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col fixed h-full shadow-xl">
                <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Car className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl tracking-tight">ORVBA</h1>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Admin Panel</p>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = route().current(item.href.split('/').pop()); // Simplified active check
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                    active 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                                }`}
                            >
                                <Icon className={`w-5 h-5 ${active ? 'text-white' : 'group-hover:text-blue-400'}`} />
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
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div>
                        <h2 className="text-slate-500 text-sm font-medium">Welcome back,</h2>
                        <p className="text-slate-900 font-bold">{auth.user.name}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 cursor-pointer transition-colors relative">
                             <div className="w-2 h-2 bg-blue-500 rounded-full absolute top-2 right-2 border-2 border-white"></div>
                             {/* Add notification icon here if needed */}
                        </div>
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold ring-4 ring-blue-50">
                            {auth.user.name.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
