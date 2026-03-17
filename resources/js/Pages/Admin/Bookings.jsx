import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Search, 
    Clock, 
    Calendar,
    MapPin,
    Car,
    User,
    ChevronRight,
    CheckCircle2,
    CircleDashed
} from 'lucide-react';

export default function Bookings({ bookings }) {
    return (
        <AdminLayout>
            <Head title="Service Bookings" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bookings</h1>
                        <p className="text-slate-500">Monitor and assign assistance requests.</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Vehicle & Owner</th>
                                    <th className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Schedule</th>
                                    <th className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 text-lg">{booking.vehicle_name}</span>
                                                <div className="flex items-center gap-2 text-slate-500 text-xs mt-1">
                                                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">{booking.license_plate}</span>
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
                                        <td className="px-6 py-6">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-slate-700 text-sm font-bold">
                                                    <Calendar className="w-4 h-4 text-blue-500" />
                                                    {new Date(booking.date).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium pl-6">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    Pending Assignment
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ring-1 ring-inset ${
                                                booking.assigned 
                                                ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' 
                                                : 'bg-orange-50 text-orange-700 ring-orange-600/20'
                                            }`}>
                                                {booking.assigned ? <CheckCircle2 className="w-3.5 h-3.5" /> : <CircleDashed className="w-3.5 h-3.5 animate-spin-slow" />}
                                                {booking.assigned ? 'Assigned' : 'Awaiting Mechanic'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <Link 
                                                href={route('admin.bookings')} // Details page route
                                                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold text-sm transition-colors group"
                                            >
                                                Details
                                                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
