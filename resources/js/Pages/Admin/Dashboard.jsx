import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Users, 
    Wrench, 
    CalendarCheck, 
    ClipboardList,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

export default function Dashboard({ usersCount, mechanicsCount, bookingsCount, servicesCount }) {
    const stats = [
        { name: 'Total Users', value: usersCount, icon: Users, color: 'blue', change: '+12%', trending: 'up' },
        { name: 'Mechanics', value: mechanicsCount, icon: Wrench, color: 'emerald', change: '+5%', trending: 'up' },
        { name: 'Total Bookings', value: bookingsCount, icon: CalendarCheck, color: 'orange', change: '-2%', trending: 'down' },
        { name: 'Services Rendered', value: servicesCount, icon: ClipboardList, color: 'purple', change: '+18%', trending: 'up' },
    ];

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
                    <p className="text-slate-500 mt-1">Manage all operations from mechanics to users to bookings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div className={`p-3 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm font-medium ${stat.trending === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {stat.change}
                                        {stat.trending === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-slate-500 text-sm font-medium">{stat.name}</h3>
                                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Activities or Charts could go here */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <TrendingUp className="w-32 h-32 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Link 
                                href={route('admin.mechanics')} 
                                className="p-4 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-2xl transition-all duration-300 font-medium text-slate-600 text-center flex flex-col items-center gap-2 border border-slate-100 shadow-sm"
                            >
                                <Wrench className="w-6 h-6" />
                                Manage Mechanics
                            </Link>
                            <Link 
                                href={route('admin.users')} 
                                className="p-4 bg-slate-50 hover:bg-emerald-600 hover:text-white rounded-2xl transition-all duration-300 font-medium text-slate-600 text-center flex flex-col items-center gap-2 border border-slate-100 shadow-sm"
                            >
                                <Users className="w-6 h-6" />
                                Manage Users
                            </Link>
                        </div>
                    </div>

                    <div className="bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-200 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white mb-2">Systems Operational</h3>
                            <p className="text-blue-100 mb-6 font-medium">All roadside assistance modules are currently active and scaling correctly.</p>
                            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold backdrop-blur-md transition-all">
                                View System Logs
                            </button>
                        </div>
                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-400 rounded-full blur-2xl opacity-50"></div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
