import React from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    ShieldCheck, 
    Calendar, 
    User, 
    Phone, 
    MapPin, 
    ArrowLeft, 
    Zap,
    CircleDashed,
    FileText,
    ExternalLink,
    Wrench
} from 'lucide-react';

export default function ServiceDetails({ service }) {
    const isCompleted = service.status?.toLowerCase() === 'completed';

    return (
        <UserLayout>
            <Head title={`Service Details: ${service.license_plate}`} />

            <div className="max-w-5xl mx-auto space-y-8 pb-12">
                <div className="flex items-center justify-between">
                    <Link href={route('user.bookings')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to history
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${
                            isCompleted ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100 animate-pulse'
                        }`}>
                            {service.status}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Main Detail Card */}
                    <div className="w-full space-y-8">
                        <div className="bg-white rounded-3xl md:rounded-[3rem] p-6 sm:p-10 lg:p-14 border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-110 transition-transform duration-1000">
                                <ShieldCheck className="w-64 h-64 text-indigo-950" />
                            </div>

                            <div className="relative z-10">
                                <div className="space-y-4 mb-12">
                                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">{service.vehicle_name}</h1>
                                    <span className="inline-block bg-slate-900 text-white px-4 py-1 rounded-xl text-lg font-black tracking-widest">{service.license_plate}</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-50 pt-10">
                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                            <Wrench className="w-4 h-4 text-indigo-500" />
                                            Provider Assigned
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black">
                                                    {service.mechanic_name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-lg font-black text-slate-900 leading-tight">{service.mechanic_name}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Certified Mechanic</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-600 font-bold text-sm">
                                                <Phone className="w-5 h-5 text-slate-300" />
                                                {service.mechanic_phone}
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-600 font-bold text-sm">
                                                <MapPin className="w-5 h-5 text-slate-300" />
                                                {service.mechanic_location}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-orange-500" />
                                            Service Intel
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <Calendar className="w-5 h-5 text-slate-300" />
                                                <span className="text-sm font-bold text-slate-700">{service.request_date}</span>
                                            </div>
                                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-600 text-sm leading-relaxed">
                                                "{service.issue_description}"
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
