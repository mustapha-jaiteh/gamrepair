import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    User as UserIcon, 
    Mail, 
    Phone, 
    MapPin, 
    Car, 
    Calendar,
    ArrowLeft,
    Clock,
    Wrench,
    CheckCircle2,
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

export default function UserDetails({ user, bookings = [], services = [] }) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    if (!user) {
        return (
            <AdminLayout>
                <div className="p-8 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-slate-500 font-medium">User record not found or still loading...</p>
                    <Link href={route('admin.users')} className="text-blue-600 hover:underline mt-4 inline-block font-bold">Back to Users List</Link>
                </div>
            </AdminLayout>
        );
    }

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route('admin.users.destroy', user.id), {
            onFinish: () => setIsDeleting(false),
            onSuccess: () => setIsDeleteDialogOpen(false),
        });
    };

    return (
        <AdminLayout>
            <Head title={`User Details - ${user.name}`} />

            <div className="space-y-8">
                {/* Header / Back Link */}
                <div className="flex items-center justify-between">
                    <Link href={route('admin.users')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Users
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Profile Card */}
                    <aside className="lg:col-span-1 space-y-8">
                        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center font-black text-3xl mb-6 border-4 border-white shadow-xl">
                                    {user.name?.charAt(0) || 'U'}
                                </div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{user.name}</h1>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Registered Client</p>

                                <div className="w-full space-y-4 pt-8 border-t border-slate-50">
                                    <div className="flex items-center gap-4 text-slate-600 font-medium text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <span className="truncate">{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-600 font-medium text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        {user.phone}
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-600 font-medium text-sm text-left">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        {user.city}, {user.region}
                                    </div>
                                </div>

                                <div className="w-full pt-6">
                                    <Button 
                                        variant="ghost" 
                                        className="w-full rounded-2xl h-12 font-bold text-red-500 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 gap-2"
                                        onClick={() => setIsDeleteDialogOpen(true)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete User Account
                                    </Button>
                                </div>
                            </div>
                        </section>

                        {/* Vehicle Info Card */}
                        <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
                                <Car className="w-4 h-4 text-blue-400" />
                                Vehicle Specification
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-2xl font-black">{user.vehicle_name || 'N/A'}</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                                        {user.vehicle_model || 'Unknown Model'} {user.vehicle_year ? `(${user.vehicle_year})` : ''} 
                                        {user.vehicle_type ? ` • ${user.vehicle_type}` : ''}
                                    </p>
                                </div>
                                <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 inline-block">
                                    <span className="text-sm font-black tracking-widest text-blue-400">{user.license_plate || 'No License Plate'}</span>
                                </div>
                            </div>
                        </section>
                    </aside>

                    {/* Activity Feed / List */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Bookings</p>
                                <p className="text-3xl font-black text-slate-900">{bookings?.length || 0}</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Completed Jobs</p>
                                <p className="text-3xl font-black text-emerald-600">{services?.filter(s => s.status === 'completed').length || 0}</p>
                            </div>
                        </div>

                        {/* Recent History Table */}
                        <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Activity History</h3>
                                <div className="px-3 py-1 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    Last 12 Months
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Date</th>
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Status</th>
                                            <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400">Mechanic</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {(services || []).map((service) => (
                                            <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-8 py-6 text-sm font-black text-slate-900">{service.request_date}</td>
                                                <td className="px-8 py-6">
                                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                        service.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                                                    }`}>
                                                        {service.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                        {service.status}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 font-bold text-sm text-slate-600">{service.mechanic_name}</td>
                                            </tr>
                                        ))}
                                        {(!services || services.length === 0) && (
                                            <tr>
                                                <td colSpan="4" className="px-8 py-20 text-center">
                                                    <div className="inline-flex p-4 bg-slate-50 rounded-2xl mb-4 text-slate-300">
                                                        <Clock className="w-8 h-8" />
                                                    </div>
                                    <h4 className="text-lg font-black text-slate-900">No service history found</h4>
                                                    <p className="text-sm text-slate-500 font-medium">This user hasn't completed any services yet.</p>
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
                                <DialogTitle className="text-xl font-bold text-slate-900">Delete Account</DialogTitle>
                                <DialogDescription className="text-slate-500">This action is permanent.</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                    
                    <div className="py-4">
                        <p className="text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
                            Are you sure you want to delete <span className="font-bold text-slate-900">"{user.name}"</span>?
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
                            {isDeleting ? 'Deleting...' : 'Confirm'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
