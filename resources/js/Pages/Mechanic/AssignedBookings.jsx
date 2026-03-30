import React, { useState, useEffect } from 'react';
import MechanicLayout from '@/Layouts/MechanicLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { 
    Calendar, 
    MapPin, 
    User, 
    ChevronRight,
    Search,
    AlertCircle,
    CheckCircle2,
    Clock
} from 'lucide-react';

export default function AssignedBookings({ bookings, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);
        
        router.get(
            window.location.pathname,
            { search: query },
            { preserveState: true, replace: true }
        );
    };

    const handleAccept = (e, id) => {
        e.preventDefault();
        router.put(route('mechanics.bookings.accept', id), {}, { preserveScroll: true });
    };

    const handleReject = (e, id) => {
        e.preventDefault();
        router.put(route('mechanics.bookings.reject', id), {}, { preserveScroll: true });
    };

    useEffect(() => {
        if (window.Echo) {
            const channel = window.Echo.channel('bookings');
            channel.listen('BookingUpdated', () => {
                router.reload({ only: ['bookings'] });
            });
            return () => {
                channel.stopListening('BookingUpdated');
            };
        }
    }, []);

    return (
        <MechanicLayout>
            <Head title="Assigned Bookings" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">New Requests</h1>
                        <p className="text-slate-500">Emergency and regular service bookings assigned to you.</p>
                    </div>
                </div>

                {/* Filters/Search */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search assignments by license plate or vehicle..." 
                        className="flex-1 border-none focus:ring-0 text-slate-600 placeholder:text-slate-400"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto h-full w-full">
                        <table className="min-w-[800px] md:min-w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-6 py-5 text-slate-600 font-semibold text-sm">Vehicle & Owner</th>
                                    <th className="px-6 py-5 text-slate-600 font-semibold text-sm">Location</th>
                                    <th className="px-6 py-5 text-slate-600 font-semibold text-sm">Date</th>
                                    <th className="px-6 py-5 text-slate-600 font-semibold text-sm">Status</th>
                                    <th className="px-6 py-5 text-slate-600 font-semibold text-sm text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {bookings.data.length > 0 ? (
                                    bookings.data.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-6">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 text-lg group-hover:text-orange-600 transition-colors">{booking.vehicle_name}</span>
                                                    <div className="flex items-center gap-2 text-slate-400 text-xs mt-1">
                                                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">{booking.license_plate}</span>
                                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                        <span>{booking.vehicle_owner}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                                    <MapPin className="w-4 h-4 text-slate-400" />
                                                    {booking.city}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 font-medium text-slate-700">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-orange-500" />
                                                    {new Date(booking.date).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                    booking.status === 'accepted' ? 'text-emerald-600 bg-emerald-50' : 
                                                    booking.status === 'rejected' ? 'text-rose-600 bg-rose-50' :
                                                    'text-amber-600 bg-amber-50'
                                                }`}>
                                                    {booking.status === 'accepted' ? <CheckCircle2 className="w-3 h-3" /> : 
                                                     booking.status === 'rejected' ? <AlertCircle className="w-3 h-3" /> :
                                                     <Clock className="w-3 h-3" />}
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                {['pending', 'rejected'].includes(booking.status) ? (
                                                    <div className="flex gap-2 justify-end">
                                                        {booking.status === 'pending' && (
                                                            <button 
                                                                onClick={(e) => handleReject(e, booking.id)}
                                                                className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1.5 rounded-lg font-bold text-xs transition-colors"
                                                            >
                                                                Decline
                                                            </button>
                                                        )}
                                                        <button 
                                                            onClick={(e) => handleAccept(e, booking.id)}
                                                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                                                        >
                                                            {booking.status === 'rejected' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                                            {booking.status === 'rejected' ? 'Accept Now' : 'Accept'}
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <Link 
                                                        href={route('mechanics.booking.show', booking.id)}
                                                        className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm transition-all group/btn"
                                                    >
                                                        Details
                                                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center text-slate-400 italic">
                                            No assigned bookings found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Pagination links={bookings.links} />
            </div>
        </MechanicLayout>
    );
}
