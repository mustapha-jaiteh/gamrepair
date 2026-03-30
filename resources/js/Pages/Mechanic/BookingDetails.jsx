import React from 'react';
import MechanicLayout from '@/Layouts/MechanicLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
    Car, 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Calendar, 
    AlertCircle,
    CheckCircle2,
    ArrowLeft,
    X,
    ExternalLink,
    ClipboardCheck
} from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function BookingDetails({ booking }) {
    const { post, processing } = useForm({});

    return (
        <MechanicLayout>
            <Head title={`Job: ${booking.license_plate}`} />

            <div className="max-w-5xl mx-auto space-y-8 pb-12">
                <div className="flex items-center justify-between">
                    <button onClick={() => window.history.back()} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to requests
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-black uppercase tracking-widest">New Priority</span>
                        <span className="text-slate-400 text-sm font-medium">#{booking.id}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left: Booking Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                                <Car className="w-48 h-48 text-orange-950" />
                            </div>
                            
                            <div className="relative">
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                                    {booking.vehicle_name}
                                </h1>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    <span className="bg-slate-900 text-white px-4 py-1 rounded-xl text-lg font-black tracking-widest">{booking.license_plate}</span>
                                    <span className="bg-slate-100 text-slate-600 px-4 py-1 rounded-xl text-sm font-bold flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(booking.date).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-50 pt-8">
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Owner Contact</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-slate-700 font-bold">
                                                <User className="w-5 h-5 text-orange-500" />
                                                {booking.vehicle_owner}
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                                                <Mail className="w-5 h-5 text-slate-300" />
                                                {booking.email}
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                                                <Phone className="w-5 h-5 text-slate-300" />
                                                {booking.phone}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Location Details</h3>
                                        <div className="flex items-start gap-3 text-slate-700 font-bold leading-relaxed">
                                            <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                                            {booking.city}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-600 leading-relaxed relative">
                                    <AlertCircle className="absolute -top-3 -left-3 w-8 h-8 text-orange-400 bg-white rounded-full p-1 border border-slate-100" />
                                    "{booking.issue_description}"
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Service Update Form */}
                    <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-2xl shadow-slate-200/50 sticky top-28">
                        {['pending', 'rejected'].includes(booking.status) ? (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Manage Request</h2>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                                    {booking.status === 'rejected' 
                                        ? "You previously declined this request, but you can still accept it if you're available now."
                                        : "Review the vehicle details and location before accepting this service request."}
                                </p>
                                
                                <div className="space-y-3">
                                    <button 
                                        onClick={() => post(route('mechanics.bookings.accept', booking.id))}
                                        disabled={processing}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-sm tracking-widest transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                        ACCEPT REQUEST
                                    </button>
                                    
                                    {booking.status === 'pending' && (
                                        <button 
                                            onClick={() => post(route('mechanics.bookings.reject', booking.id))}
                                            disabled={processing}
                                            className="w-full bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-400 py-4 rounded-2xl font-black text-sm tracking-widest transition-all border border-slate-100 flex items-center justify-center gap-3 active:scale-[0.98]"
                                        >
                                            <X className="w-5 h-5" />
                                            DECLINE
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
                                        <ClipboardCheck className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Active Service</h2>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Linked to Record #{booking.service?.id || 'N/A'}</p>
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                                    <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                        This booking has been converted into an active service record. You can now manage the work phases and final logs in your service history.
                                    </p>
                                    
                                    <Link 
                                        href={booking.service ? route('mechanics.service.show', booking.service.id) : '#'}
                                        className="w-full bg-slate-900 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-sm tracking-widest transition-all shadow-xl shadow-slate-900/10 hover:shadow-orange-600/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        VIEW SERVICE LOGS
                                    </Link>
                                </div>

                                <div className="pt-4 border-t border-slate-50">
                                    <p className="text-[10px] text-center text-slate-400 font-medium uppercase tracking-widest">
                                        Current Status: <span className="text-emerald-600 font-black">{booking.status === 'completed' ? 'Completed' : 'Assigned'}</span>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MechanicLayout>
    );
}
