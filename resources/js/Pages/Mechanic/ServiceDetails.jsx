import MechanicLayout from '@/Layouts/MechanicLayout';
import { Head, router, useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { 
    Car, 
    Calendar, 
    ShieldCheck, 
    CircleDashed,
    User,
    MapPin,
    Wrench,
    ArrowLeft,
    Clock,
    FileText,
    Save,
    CheckCircle2,
    MessageSquare
} from 'lucide-react';

export default function ServiceDetails({ service }) {
    const { data, setData, post, processing, errors } = useForm({
        booking_id: service.booking_id,
        license_plate: service.license_plate,
        vehicle_name: service.vehicle_name,
        vehicle_owner: service.vehicle_owner,
        mechanic_name: service.mechanic_name,
        mechanic_license: service.mechanic_license,
        status: service.status || 'accepted',
        request_date: service.request_date,
        issue_description: service.issue_description,
        mechanic_phone: service.mechanic_phone || '',
        mechanic_location: service.mechanic_location || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mechanics.service-update'));
    };
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
        <MechanicLayout>
            <Head title={`Service History: ${service.license_plate}`} />

            <div className="max-w-4xl mx-auto space-y-8 pb-12">
                <div className="flex items-center justify-between">
                    <button onClick={() => window.history.back()} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to services
                    </button>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                        service.status?.toLowerCase() === 'completed' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-blue-50 text-blue-600'
                    }`}>
                        {statusMap[service.status] || service.status?.replace('_', ' ') || 'Active'}
                    </div>
                </div>

                {/* Main Content Box */}
                <div className="bg-white rounded-5xl border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
                    {/* Left Panel: Vehicle Info */}
                    <div className="w-full md:w-80 bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 blur-3xl rounded-full"></div>
                        
                        <div className="relative z-10 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Target Vehicle</h3>
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-black text-white leading-tight">{service.vehicle_name}</h1>
                                    <span className="inline-block bg-orange-600 text-white px-3 py-1 rounded-lg text-sm font-black tracking-widest uppercase">
                                        {service.license_plate}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-6 pt-8 border-t border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-white/10 rounded-xl">
                                        <User className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Provider</p>
                                        <p className="text-sm font-bold">{service.mechanic_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-white/10 rounded-xl">
                                        <Calendar className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Service Date</p>
                                        <p className="text-sm font-bold">{service.request_date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 pt-12">
                             <div className="bg-white/5 p-6 rounded-3xl border border-white/5 backdrop-blur-sm">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-2">Issue Reported</p>
                                <p className="text-xs text-slate-300 leading-relaxed italic">"{service.issue_description}"</p>
                             </div>
                        </div>
                    </div>

                    {/* Right Panel: Transaction & Status */}
                    <div className="flex-1 p-10 lg:p-12 space-y-12 bg-slate-50/30">
                        <div className="grid grid-cols-1 gap-12">
                            {/* Status Display */}
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical Status</h3>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-2xl ${
                                            service.status?.toLowerCase() === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                                        }`}>
                                            {service.status?.toLowerCase() === 'completed' ? (
                                                <ShieldCheck className="w-8 h-8" />
                                            ) : (
                                                <CircleDashed className="w-8 h-8 animate-spin-slow" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-lg font-black text-slate-900 leading-tight capitalize">
                                                {statusMap[service.status] || service.status?.replace('_', ' ')}
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Current Phase</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Update Form */}
                            <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-xl shadow-slate-200/40">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8 flex items-center gap-2">
                                    <Save className="w-6 h-6 text-orange-600" />
                                    Update Phase
                                </h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Work Phase</label>
                                        <select 
                                            value={data.status}
                                            onChange={e => setData('status', e.target.value)}
                                            className="w-full bg-slate-50 border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold focus:ring-orange-500 focus:border-orange-500 transition-all shadow-inner"
                                        >
                                            <option value="accepted">Assigned / Pending Start</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>

                                    <div className="pt-2">
                                        <button 
                                            disabled={processing}
                                            className="w-full bg-slate-900 hover:bg-orange-600 text-white py-5 rounded-2xl font-black text-xs tracking-[0.2em] transition-all shadow-xl shadow-slate-900/10 hover:shadow-orange-600/20 flex items-center justify-center gap-3 active:scale-[0.98] uppercase"
                                        >
                                            {processing ? 'UPDATING...' : (
                                                <>
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    FINALIZE LOGS
                                                </>
                                            )}
                                        </button>
                                        <p className="text-[10px] text-center text-slate-400 mt-6 font-medium uppercase tracking-widest leading-relaxed">
                                            Updating will sync the status across <br/> 
                                            Admin and User dashboards
                                        </p>
                                    </div>
                                </form>
                            </div>

                            {/* User Feedback Display */}
                            {service.feedback && (
                                <div className="space-y-4 pt-8 border-t border-slate-100">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-emerald-500" />
                                        User Feedback
                                    </h3>
                                    <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100/50 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-6 opacity-[0.05]">
                                            <MessageSquare className="w-24 h-24 text-emerald-900" />
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-slate-700 font-medium italic leading-relaxed">
                                                "{service.feedback.message}"
                                            </p>
                                            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-4">
                                                Submitted on {new Date(service.feedback.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MechanicLayout>
    );
}
