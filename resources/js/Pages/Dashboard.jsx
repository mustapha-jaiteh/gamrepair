import React, { useEffect } from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Wrench, 
    Plus, 
    ArrowRight, 
    ShieldCheck, 
    Clock, 
    AlertCircle,
    Zap
} from 'lucide-react';

export default function Dashboard({ auth, bookings, services }) {

    const latestService = services.length > 0 ? services[services.length - 1] : null;

    useEffect(() => {
        if (window.Echo) {
            const bookingsChannel = window.Echo.channel('bookings');
            bookingsChannel.listen('BookingUpdated', () => {
                router.reload({ only: ['bookings', 'services'] });
            });

            const servicesChannel = window.Echo.channel('services');
            servicesChannel.listen('ServiceUpdated', () => {
                router.reload({ only: ['services'] });
            });

            return () => {
                bookingsChannel.stopListening('BookingUpdated');
                servicesChannel.stopListening('ServiceUpdated');
            };
        }
    }, []);

    return (
        <UserLayout>
            <Head title="User Dashboard" />

            <div className="space-y-10">
                {/* Hero / Welcome */}
                <div className="bg-indigo-950 rounded-[2.5rem] p-10 lg:p-14 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20">
                    <div className="absolute top-0 right-0 p-20 opacity-10 blur-3xl rounded-full bg-indigo-400 translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative z-10 max-w-2xl">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-500/30">
                            <Zap className="w-3 h-3" />
                            Emergency Response 24/7
                        </span>
                        <h1 className="text-5xl lg:text-4xl font-black tracking-loose mb-6 leading-[1.1]">
                            Stranded ? <br /> We've got your back.
                        </h1>
                        <p className="text-indigo-200 text-lg font-medium leading-relaxed mb-10 opacity-80">
                            Get immediate roadside assistance from certified mechanics in your area. <br /> Fast, reliable, and just a click away.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link 
                                href={route('user.mechanics')}
                                className="bg-white text-indigo-950 px-8 py-4 rounded-2xl font-black text-sm tracking-widest transition-all hover:scale-105 shadow-xl shadow-white/5 flex items-center gap-3"
                            >
                                <Plus className="w-5 h-5 text-indigo-600" />
                                FIND MECHANIC
                            </Link>
                            <Link href={route('user.bookings')} className="bg-indigo-800 text-white border border-indigo-700 px-8 py-4 rounded-2xl font-black text-sm tracking-widest transition-all hover:bg-indigo-700">
                                VIEW HISTORY
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Booking Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[2rem] border border-slate-100 p-10 shadow-sm relative overflow-hidden flex flex-col h-full">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Service Overview</h2>
                            <p className="text-slate-500 font-medium mt-2">Monthly breakdown of your service requests</p>
                            
                            <div className="flex-1 mt-10 min-h-[300px] flex items-end justify-between gap-4 sm:gap-8 pt-10 border-b-2 border-slate-50 pb-4">
                                {[
                                    { month: 'Jan', val: 2 },
                                    { month: 'Feb', val: 5 },
                                    { month: 'Mar', val: 3 },
                                    { month: 'Apr', val: 8 },
                                    { month: 'May', val: 12 },
                                    { month: 'Jun', val: 7 }
                                ].map((data, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-4 flex-1 group h-full">
                                        <div className="w-full sm:w-16 relative bg-slate-50 rounded-t-xl h-full flex items-end justify-center group-hover:bg-slate-100 transition-colors">
                                            <div 
                                                className="w-full bg-indigo-600 rounded-t-xl shadow-lg shadow-indigo-600/20 transition-all duration-1000 group-hover:bg-indigo-500 group-hover:shadow-indigo-500/30 origin-bottom relative flex justify-center"
                                                style={{ height: `${(data.val / 12) * 100}%` }}
                                            >
                                                <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg shadow-sm border border-indigo-100 text-sm pointer-events-none">
                                                    {data.val}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{data.month}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats / Info */}
                    <div className="space-y-8">
                        <div className="bg-indigo-50 p-8 rounded-[2rem] border border-indigo-100/50">
                            <h3 className="text-lg font-black text-indigo-950 mb-6 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-indigo-600" />
                                Recent Activity
                            </h3>
                            <div className="space-y-4">
                                {services.slice(-2).reverse().map((service) => (
                                    <Link key={service.id} href={route('user.service-details', { id: service.id })} className="bg-white p-5 rounded-2xl border border-indigo-100 flex items-center gap-4 group cursor-pointer hover:border-indigo-300 transition-colors shadow-sm">
                                        <div className="p-3 bg-indigo-50 rounded-xl">
                                            <Wrench className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-black text-slate-900">{service.vehicle_name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{new Date(service.request_date).toLocaleDateString()} • {service.status}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                ))}
                                {services.length === 0 && <p className="text-xs text-slate-400 font-medium px-2 italic">No recent service logs found.</p>}
                            </div>
                            <Link href={route('user.bookings')} className="block w-full mt-6 py-4 text-indigo-600 font-black text-xs uppercase tracking-widest hover:bg-indigo-100 rounded-2xl transition-all text-center">
                                View Full History
                            </Link>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-6">
                                <div className="p-5 bg-emerald-50 rounded-[1.5rem]">
                                    <ShieldCheck className="w-8 h-8 text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-slate-900">{bookings.length}</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Total Bookings</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
