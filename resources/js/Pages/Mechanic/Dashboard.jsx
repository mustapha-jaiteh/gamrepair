import React from 'react';
import MechanicLayout from '@/Layouts/MechanicLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Bell, 
    History, 
    Star, 
    Wrench,
    TrendingUp,
    MapPin,
    Phone,
    Mail,
    CheckCircle2,
    Clock,
    ClipboardList
} from 'lucide-react';

export default function Dashboard({ mechanic, jobOrder, completedServices, currentService, bookings, services }) {
    return (
        <MechanicLayout>
            <Head title="Mechanic Dashboard" />

            <div className="space-y-8">
                {/* Mechanic Profile Card */}
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start group hover:shadow-md transition-all">
                    <div className="relative">
                        <img 
                            src={mechanic.profile_image ? `/storage/${mechanic.profile_image}` : `https://ui-avatars.com/api/?name=${mechanic.name}&background=f97316&color=fff`} 
                            alt={mechanic.name} 
                            className="w-32 h-32 rounded-3xl object-cover ring-8 ring-slate-50 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-xl border-4 border-white shadow-lg">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{mechanic.name}</h1>
                            <p className="text-orange-600 font-bold uppercase tracking-widest text-xs mt-1">{mechanic.specialization}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-slate-500 text-sm justify-center md:justify-start">
                                <Mail className="w-4 h-4 text-slate-400" />
                                {mechanic.email}
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 text-sm justify-center md:justify-start">
                                <Phone className="w-4 h-4 text-slate-400" />
                                {mechanic.phone}
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 text-sm justify-center md:justify-start">
                                <MapPin className="w-4 h-4 text-slate-400" />
                                {mechanic.city}
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 text-sm justify-center md:justify-start">
                                <Wrench className="w-4 h-4 text-slate-400" />
                                {mechanic.years_of_experience} Experience
                            </div>
                        </div>
                    </div>
                    <Link 
                        href={route('profile.edit')}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-bold transition-all"
                    >
                        Edit Profile
                    </Link>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl shadow-slate-200 relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest">Active Status</h3>
                            <div className="mt-8">
                                <p className={`text-2xl font-bold uppercase tracking-tight ${
                                    currentService?.status?.toLowerCase() === 'in_progress' ? 'text-blue-400' : 
                                    currentService?.status?.toLowerCase() === 'completed' ? 'text-emerald-400' : 
                                    'text-orange-400'
                                }`}>
                                    {currentService?.status?.replace('_', ' ') || 'No active jobs'}
                                </p>
                                <p className="text-slate-500 text-xs mt-1">Requested: {currentService?.request_date || '-'}</p>
                            </div>
                        </div>
                        <TrendingUp className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 group-hover:scale-110 transition-transform duration-700" />
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest">Job Orders</h3>
                        <div className="mt-8 flex items-baseline gap-2">
                            <p className="text-4xl font-black text-slate-900">{jobOrder}</p>
                            <p className="text-slate-500 text-sm font-medium">Services (Last 6m)</p>
                        </div>
                        <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                             <div className="bg-orange-500 h-full w-2/3 rounded-full"></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                        <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest">Total Completed</h3>
                        <div className="mt-8 flex items-baseline gap-2">
                            <p className="text-4xl font-black text-emerald-600">{completedServices}</p>
                            <p className="text-slate-500 text-sm font-medium">Total finalized</p>
                        </div>
                        <div className="mt-4 flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-4 h-4 text-orange-400 fill-orange-400" />)}
                            <span className="text-slate-400 text-[10px] font-bold ml-2">EXCELLENT RATING</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <Link 
                        href={route('mechanics.bookings', { license: mechanic.mechanic_license })}
                        className="bg-orange-600 p-8 rounded-4xl text-white shadow-2xl shadow-orange-200 flex items-center justify-between group hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black tracking-tight">View New Requests</h3>
                            <p className="text-orange-100/80 font-medium">Check for emergency breakdown alerts in your area.</p>
                        </div>
                        <div className="bg-white/20 p-4 rounded-3xl group-hover:rotate-12 transition-transform">
                            <Bell className="w-8 h-8" />
                        </div>
                    </Link>

                    <Link 
                        href={route('mechanics.services', { license: mechanic.mechanic_license })}
                        className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-orange-200 transition-all duration-300"
                    >
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Service Status</h3>
                            <p className="text-slate-500 font-medium">Update current jobs and track history.</p>
                        </div>
                        <div className="bg-slate-100 p-4 rounded-3xl group-hover:bg-orange-50 transition-colors">
                            <ClipboardList className="w-8 h-8 text-slate-400 group-hover:text-orange-500" />
                        </div>
                    </Link>
                </div>
            </div>
        </MechanicLayout>
    );
}
