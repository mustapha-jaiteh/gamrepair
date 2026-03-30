import React, { useState, useEffect } from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { 
    History, 
    ChevronRight, 
    Calendar, 
    MapPin, 
    Clock, 
    AlertCircle,
    CheckCircle2,
    Search
} from 'lucide-react';

export default function Bookings({ bookings, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        if (window.Echo) {
            const channel = window.Echo.channel('bookings');
            channel.listen('.BookingUpdated', () => {
                router.reload({ only: ['bookings'] });
            });
            window.Echo.channel('services').listen('.ServiceUpdated', () => {
                router.reload({ only: ['bookings'] });
            });
            return () => {
                channel.stopListening('.BookingUpdated');
                window.Echo.channel('services').stopListening('.ServiceUpdated');
            };
        }
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);
        
        router.get(
            route('user.bookings'),
            { search: query },
            { preserveState: true, replace: true }
        );
    };

    return (
        <UserLayout>
            <Head title="My Service Bookings" />

            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Booking History</h1>
                        <p className="text-slate-500 font-medium">Manage and track all your roadside assistance requests.</p>
                    </div>
                </div>

                {/* Filters/Search */}
                <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search your bookings by license plate or vehicle name..." 
                        className="flex-1 border-none focus:ring-0 text-slate-600 placeholder:text-slate-400"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                {/* Main Table Card */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto h-full w-full">
                        <table className="min-w-[800px] md:min-w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Request Date</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Vehicle Detail</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Location</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">View</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {bookings.data.length > 0 ? (
                                    bookings.data.map((booking) => (
                                        <tr key={booking.id} className="group hover:bg-indigo-50/10 transition-colors">
                                            <td className="px-8 py-7">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                        <Calendar className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900">{new Date(booking.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{new Date(booking.date).getFullYear()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-7">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-black text-slate-900">{booking.vehicle_name}</span>
                                                    <span className="text-[10px] font-bold text-indigo-600 tracking-widest">{booking.license_plate}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-7">
                                                <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                                                    <MapPin className="w-4 h-4 text-slate-300" />
                                                    {booking.city}
                                                </div>
                                            </td>
                                            <td className="px-8 py-7">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                                    booking.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                    booking.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                    booking.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                    'bg-blue-50 text-blue-600 border-blue-100'
                                                }`}>
                                                    {booking.status === 'pending' ? (
                                                        <><Clock className="w-3 h-3" /> Finding Mechanic</>
                                                    ) : booking.status === 'completed' ? (
                                                        <><CheckCircle2 className="w-3 h-3" /> Completed</>
                                                    ) : booking.status === 'rejected' ? (
                                                        <><AlertCircle className="w-3 h-3" /> Declined</>
                                                    ) : (
                                                        <span className="flex items-center gap-1.5">{booking.status === 'completed' ? 'Completed' : booking.status.replace('_', ' ')}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-7 text-right">
                                                <Link 
                                                    href={route('user.booking-details', booking.id)}
                                                    className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-indigo-100 rounded-xl transition-all group/btn shadow-sm inline-block"
                                                >
                                                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-10 text-center text-slate-400 italic font-medium font-sans uppercase tracking-[0.2em] text-[11px]">
                                            No bookings found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Pagination links={bookings.links} />
            </div>
        </UserLayout>
    );
}
