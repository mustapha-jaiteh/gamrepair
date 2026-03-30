import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Calendar,
    MapPin,
    Car,
    User,
    ArrowLeft,
    Clock,
    AlertCircle,
    CheckCircle2,
    CircleDashed,
    Phone,
    Mail
} from 'lucide-react';

export default function BookingDetails({ booking }) {
    return (
        <AdminLayout>
            <Head title={`Booking Details - ${booking.license_plate}`} />

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <Link href={route('admin.bookings')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Bookings
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Vehicle & Status */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200/50">
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                                    <Car className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    booking.assigned ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'
                                }`}>
                                    {booking.assigned ? 'Assigned' : 'Awaiting Mechanic'}
                                </div>
                            </div>
                            
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Vehicle Identity</h3>
                            <h2 className="text-3xl font-black mb-1">{booking.vehicle_name}</h2>
                            <p className="text-blue-400 font-bold tracking-[0.2em] mb-8">{booking.license_plate}</p>

                            <div className="space-y-4 pt-8 border-t border-white/5">
                                <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                                    <Calendar className="w-4 h-4" />
                                    Booked for {new Date(booking.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                                    <Clock className="w-4 h-4" />
                                    {booking.assigned ? 'Assigned to Mechanic' : 'Pending Mechanic Assignment'}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-600" />
                                Breakdown Location
                            </h3>
                            <div className="space-y-2">
                                <p className="text-xl font-black text-slate-900">{booking.city}</p>
                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{booking.region}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Issue Details & Owner */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5">
                                <AlertCircle className="w-32 h-32 text-slate-900" />
                            </div>
                            
                            <div className="relative z-10">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4">Issue Description</h3>
                                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 italic text-slate-700 text-lg leading-relaxed font-medium">
                                    "{booking.issue_description}"
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 underline-offset-8 decoration-2 decoration-blue-100">Owner Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-lg">
                                        {booking.vehicle_owner.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">{booking.vehicle_owner}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Requester</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-3 text-slate-600 font-bold text-sm mb-2">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        {booking.phone}
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                        {booking.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {booking.assigned && (
                            <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-200/50">
                                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-emerald-900">Mechanic Assigned</h4>
                                        <p className="text-sm text-emerald-600 font-bold uppercase tracking-widest">ID: {booking.mechanic_license}</p>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Active Request</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
