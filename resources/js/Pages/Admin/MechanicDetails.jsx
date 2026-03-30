import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Wrench, 
    Mail, 
    Phone, 
    MapPin, 
    Star, 
    Award,
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Clock,
    AlertCircle,
    TrendingUp,
    Trash2,
    AlertTriangle
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog"

export default function MechanicDetails({ mechanic, bookings = [], services = [] }) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
    if (!mechanic) {
        return (
            <AdminLayout>
                <div className="p-8 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-slate-500 font-medium">Mechanic record not found or still loading...</p>
                    <Link href={route('admin.mechanics')} className="text-blue-600 hover:underline mt-4 inline-block font-bold">Back to Mechanics List</Link>
                </div>
            </AdminLayout>
        );
    }

    const avgRating = 4.8; // Placeholder

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route('admin.mechanics.destroy', mechanic.id), {
            onFinish: () => setIsDeleting(false),
            onSuccess: () => setIsDeleteDialogOpen(false),
        });
    };

    return (
        <AdminLayout>
            <Head title={`Mechanic Profile - ${mechanic.name}`} />

            <div className="space-y-8">
                {/* Header / Back Link */}
                <nav className="flex items-center justify-between">
                    <Link href={route('admin.mechanics')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Mechanics
                    </Link>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Mechanic Profile Card */}
                    <aside className="lg:col-span-1 space-y-8">
                        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <img 
                                        src={mechanic.profile_image ? `/storage/${mechanic.profile_image}` : `https://ui-avatars.com/api/?name=${mechanic.name || 'M'}&background=random`} 
                                        alt={mechanic.name} 
                                        className="w-24 h-24 rounded-3xl object-cover ring-4 ring-slate-50 shadow-xl"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                                        <CheckCircle2 className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{mechanic.name}</h1>
                                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-8">{mechanic.specialization || 'General Specialist'}</p>

                                <div className="flex items-center gap-6 mb-8 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                                    <div className="text-center">
                                        <p className="text-lg font-black text-slate-900">4.8</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Rating</p>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200"></div>
                                    <div className="text-center">
                                        <p className="text-lg font-black text-slate-900">{services?.length || 0}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Jobs</p>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200"></div>
                                    <div className="text-center">
                                        <p className="text-lg font-black text-slate-900">{mechanic.years_of_experience || 0}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Exp</p>
                                    </div>
                                </div>

                                <div className="w-full space-y-4 pt-8 border-t border-slate-50">
                                    <div className="flex items-center gap-4 text-slate-600 font-medium text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <span className="truncate">{mechanic.email}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-600 font-medium text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        {mechanic.phone}
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-600 font-medium text-sm text-left">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        {mechanic.city}, {mechanic.region}
                                    </div>
                                </div>

                                <div className="w-full pt-6">
                                    <Button 
                                        variant="ghost" 
                                        className="w-full rounded-2xl h-12 font-bold text-red-500 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 gap-2"
                                        onClick={() => setIsDeleteDialogOpen(true)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Remove Mechanic
                                    </Button>
                                </div>
                            </div>
                        </section>

                        {/* License Card */}
                        <section className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-200">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 mb-6 flex items-center gap-2">
                                <Award className="w-4 h-4" />
                                Certified Provider
                            </h3>
                            <div className="space-y-4">
                                <p className="text-sm font-bold opacity-80 leading-relaxed">Mechanic License ID</p>
                                <p className="text-2xl font-black tracking-widest">{mechanic.mechanic_license || 'PENDING'}</p>
                            </div>
                        </section>
                    </aside>

                    {/* Performance & Activity */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 gap-6">
                            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Assigned Tasks</p>
                                <p className="text-3xl font-black text-slate-900">{bookings?.length || 0}</p>
                            </section>
                        </div>

                        {/* Recent History Table */}
                        <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Service Log</h3>
                                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors bg-transparent border-none cursor-pointer">
                                    Download Report
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Customer</th>
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Vehicle</th>
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {(services || []).slice(0, 5).map((service) => (
                                            <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-8 py-6 font-bold text-sm text-slate-900">{service.vehicle_owner}</td>
                                                <td className="px-8 py-6">
                                                    <p className="text-sm font-bold text-slate-600">{service.vehicle_name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 tracking-widest">{service.license_plate}</p>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <span className={`inline-flex px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                                                        service.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                                                    }`}>
                                                        {service.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {(!services || services.length === 0) && (
                                            <tr>
                                                <td colSpan="3" className="px-8 py-20 text-center">
                                                    <div className="inline-flex p-4 bg-slate-50 rounded-2xl mb-4 text-slate-300">
                                                        <AlertCircle className="w-8 h-8" />
                                                    </div>
                                                    <h4 className="text-lg font-black text-slate-900">No active service logs</h4>
                                                    <p className="text-sm text-slate-500 font-medium">This mechanic hasn't recorded any jobs yet.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[400px] border-none shadow-2xl bg-white p-6 rounded-4xl">
                    <DialogHeader>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 shrink-0">
                                <AlertTriangle className="size-6" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold text-slate-900">Remove Mechanic</DialogTitle>
                                <DialogDescription className="text-slate-500">This action is permanent.</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                    
                    <div className="py-4">
                        <p className="text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
                            Are you sure you want to remove <span className="font-bold text-slate-900">"{mechanic.name}"</span>?
                        </p>
                    </div>

                    <DialogFooter className="gap-3 sm:flex-row flex-col pt-4">
                        <Button 
                            variant="outline" 
                            className="flex-1 rounded-xl h-12 font-bold"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="default" 
                            className="flex-1 rounded-xl h-12 font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-100"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Removing...' : 'Confirm'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
