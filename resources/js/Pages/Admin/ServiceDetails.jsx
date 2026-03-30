import { Head, Link, router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    Calendar,
    MapPin,
    Car,
    User,
    ArrowLeft,
    Clock,
    CheckCircle2,
    CircleDashed,
    Wrench,
    Hammer,
    ShieldCheck,
    Phone,
    FileText
} from 'lucide-react';

export default function ServiceDetails({ service }) {
    useEffect(() => {
        if (window.Echo) {
            const channel = window.Echo.channel('services');
            channel.listen('.ServiceUpdated', (e) => {
                if (e.service.id === service.id) {
                    router.reload();
                }
            });
            return () => channel.stopListening('ServiceUpdated');
        }
    }, [service.id]);

    const statusMap = {
        'pending': 'Finding Mechanic',
        'accepted': 'Assigned',
        'in_progress': 'In Progress',
        'completed': 'Completed',
        'rejected': 'Declined'
    };

    return (
        <AdminLayout>
            <Head title={`Service Record - ${service.license_plate}`} />

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <Link href={route('admin.services')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Services
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Service Status & Payment */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-200/50 pt-16 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <ShieldCheck className="w-24 h-24" />
                            </div>
                            
                            <div className={`absolute top-8 left-8 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                service.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-indigo-500/30 text-indigo-200'
                            }`}>
                                {service.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : <CircleDashed className="w-3 h-3 animate-spin-slow" />}
                                {statusMap[service.status] || service.status?.replace('_', ' ') || 'In Progress'}
                            </div>

                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-2">Service ID: #{service.id}</h3>
                            <h2 className="text-3xl font-black mb-6">{service.vehicle_name}</h2>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                <Hammer className="w-4 h-4 text-indigo-600" />
                                Assigned Provider
                            </h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                                    <User className="w-6 h-6 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-lg font-black text-slate-900">{service.mechanic_name}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: {service.mechanic_license}</p>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-slate-50 space-y-4">
                                <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    {service.mechanic_phone}
                                </div>
                                <div className="flex items-center gap-3 text-slate-600 text-sm font-bold">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    {service.mechanic_location}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Narrative & Vehicle */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                           <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-2">Service Context</h3>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Technical Breakdown</h2>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs font-black text-slate-900 tracking-widest px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 uppercase">
                                        {service.license_plate}
                                    </span>
                                </div>
                           </div>
                            
                            <div className="bg-slate-50 rounded-[2rem] p-10 border border-slate-100 relative mb-8">
                                <div className="absolute top-6 right-6 text-slate-200">
                                    <FileText className="w-12 h-12" />
                                </div>
                                <p className="text-xl font-medium text-slate-700 leading-relaxed italic mb-0">
                                    "{service.issue_description}"
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-8 pt-4">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Request Date</p>
                                    <div className="flex items-center gap-2 text-slate-900 font-black">
                                        <Calendar className="w-4 h-4 text-indigo-600" />
                                        {service.request_date}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Customer</p>
                                    <div className="flex items-center gap-2 text-slate-900 font-black">
                                        <User className="w-4 h-4 text-indigo-600" />
                                        {service.vehicle_owner}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
