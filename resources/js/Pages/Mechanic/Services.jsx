import React, { useState, useEffect } from 'react';
import MechanicLayout from '@/Layouts/MechanicLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { 
    ClipboardList, 
    Calendar, 
    ShieldCheck, 
    CircleDashed,
    ArrowUpRight,
    Search
} from 'lucide-react';

export default function Services({ services, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        if (window.Echo) {
            const channel = window.Echo.channel('services');
            channel.listen('.ServiceUpdated', () => {
                router.reload({ only: ['services'] });
            });
            window.Echo.channel('bookings').listen('.BookingUpdated', () => {
                router.reload({ only: ['services'] });
            });
            return () => {
                channel.stopListening('.ServiceUpdated');
                window.Echo.channel('bookings').stopListening('.BookingUpdated');
            };
        }
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);
        
        router.get(
            window.location.pathname,
            { search: query },
            { preserveState: true, replace: true }
        );
    };

    return (
        <MechanicLayout>
            <Head title="Service History" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Services</h1>
                        <p className="text-slate-500">Track and update the status of all your assigned vehicle services.</p>
                    </div>
                </div>

                {/* Filters/Search */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search services by license plate or vehicle..." 
                        className="flex-1 border-none focus:ring-0 text-slate-600 placeholder:text-slate-400"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto h-full w-full">
                        <table className="min-w-[700px] md:min-w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-6 py-5 text-slate-600 font-semibold text-sm">Vehicle Detail</th>
                                    <th className="px-6 py-5 text-slate-600 font-semibold text-sm">Request Date</th>
                                    <th className="px-6 py-5 text-slate-600 font-semibold text-sm">Status</th>
                                    <th className="px-6 py-5 text-slate-600 font-semibold text-sm text-right">Update</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {services.data.length > 0 ? (
                                    services.data.map((service) => (
                                        <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-6">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 leading-tight">{service.vehicle_name}</span>
                                                    <div className="flex items-center gap-2 text-slate-400 text-xs mt-1 font-medium">
                                                        <span className="font-bold text-orange-600">{service.license_plate}</span>
                                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                        <span>{service.vehicle_owner}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                                    <Calendar className="w-4 h-4 text-slate-400" />
                                                    {service.request_date}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ring-1 ring-inset ${
                                                    service.status?.toLowerCase() === 'completed' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' :
                                                    service.status?.toLowerCase() === 'rejected' ? 'bg-rose-50 text-rose-700 ring-rose-600/20' :
                                                    'bg-blue-50 text-blue-700 ring-blue-600/20'
                                                }`}>
                                                    {service.status?.toLowerCase() === 'completed' ? <ShieldCheck className="w-3.5 h-3.5" /> : <CircleDashed className="w-3.5 h-3.5 animate-spin-slow" />}
                                                    {service.status === 'accepted' ? 'Assigned' : service.status?.replace('_', ' ') || 'Pending'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <Link 
                                                    href={route('mechanics.service.show', service.id)} // Details/Update page
                                                    className="p-2.5 bg-slate-50 hover:bg-orange-50 text-slate-400 hover:text-orange-600 rounded-xl transition-all border border-transparent hover:border-orange-100 group"
                                                >
                                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-10 text-center text-slate-400 italic">
                                            No services found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <Pagination links={services.links} />
            </div>
        </MechanicLayout>
    );
}
