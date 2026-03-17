import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    ShieldCheck, 
    Calendar,
    Hammer,
    User,
    ChevronRight,
    CircleDashed,
    CreditCard,
    ArrowUpRight
} from 'lucide-react';

export default function Services({ services }) {
    return (
        <AdminLayout>
            <Head title="Rendered Services" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Services</h1>
                        <p className="text-slate-500">Track all assistance provided on the road.</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Service Request</th>
                                    <th className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Provider</th>
                                    <th className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Payment</th>
                                    <th className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider text-right">Review</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {services.map((service) => (
                                    <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 leading-tight">{service.vehicle_name}</span>
                                                <div className="flex items-center gap-2 text-slate-400 text-xs mt-1 font-medium">
                                                    <span className="font-bold text-blue-600">{service.license_plate}</span>
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                    <Calendar className="w-3 h-3" />
                                                    {service.request_date}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                                                    <Hammer className="w-4 h-4 text-slate-500" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-700">{service.mechanic_name}</span>
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">ID: {service.mechanic_license}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                                                    <CreditCard className="w-4 h-4 text-emerald-500" />
                                                    ${service.charges}
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${
                                                    service.payment_status?.toLowerCase() === 'completed' ? 'text-emerald-600' : 'text-orange-500'
                                                }`}>
                                                    {service.payment_status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ring-1 ring-inset ${
                                                service.status?.toLowerCase() === 'completed' 
                                                ? 'bg-blue-50 text-blue-700 ring-blue-600/20' 
                                                : 'bg-slate-50 text-slate-600 ring-slate-600/20'
                                            }`}>
                                                {service.status?.toLowerCase() === 'completed' ? <ShieldCheck className="w-3.5 h-3.5" /> : <CircleDashed className="w-3.5 h-3.5 animate-spin-slow" />}
                                                {service.status || 'Processing'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <Link 
                                                href={route('admin.services')} // Detailed review route
                                                className="p-2.5 bg-slate-50 hover:bg-white text-slate-400 hover:text-blue-600 rounded-xl transition-all border border-transparent hover:border-slate-200 hover:shadow-lg hover:shadow-blue-900/5 group"
                                            >
                                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {services.length === 0 && (
                        <div className="p-20 text-center">
                            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                <ClipboardList className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-slate-900 font-bold text-xl">No services recorded yet</h3>
                            <p className="text-slate-500 mt-1 max-w-sm mx-auto">Once mechanics start closing emergency bookings, they will appear here as searchable history.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
