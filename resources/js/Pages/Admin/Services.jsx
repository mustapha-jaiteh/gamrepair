import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, Link } from '@inertiajs/react';
import { 
    Search, 
    Calendar, 
    Car, 
    MapPin, 
    ChevronRight,
    Wrench,
    Shield,
    DollarSign,
    Clock
} from 'lucide-react';
import Pagination from '@/Components/Pagination';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

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
            route('admin.services'),
            { search: query },
            { preserveState: true, replace: true }
        );
    };

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

                {/* Filters/Search */}
                <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all duration-300 group">
                    <Search className="size-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input 
                        type="text" 
                        placeholder="Search services by ID, license plate, or vehicle..." 
                        className="flex-1 bg-transparent border-none focus-visible:ring-0 text-slate-600 placeholder:text-slate-400 font-medium h-auto p-0"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto h-full w-full">
                        <Table className="min-w-[900px] md:min-w-full">
                            <TableHeader>
                                <TableRow className="bg-slate-50/50 border-b border-slate-100">
                                    <TableHead className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Service Task</TableHead>
                                    <TableHead className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Vehicle & Location</TableHead>
                                    <TableHead className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Mechanic</TableHead>
                                    <TableHead className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Status</TableHead>
                                    <TableHead className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider text-right">Summary</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-slate-50">
                                {services.data.length > 0 ? (
                                    services.data.map((service) => (
                                        <TableRow key={service.id} className="hover:bg-slate-50/50 transition-colors group border-slate-50">
                                            <TableCell className="px-6 py-5 text-sm font-bold text-slate-900">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">Service ID #{service.id}</span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                                                            <Wrench className="size-4" />
                                                        </div>
                                                        {service.vehicle_name} Repair
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-5">
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                                        <Car className="size-3.5" />
                                                        {service.license_plate}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                                        <MapPin className="size-3" />
                                                        {service.city || 'Not specified'}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-[10px] font-black">
                                                        {service.mechanic_name?.charAt(0) || 'M'}
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-700 font-bold text-sm leading-none">{service.mechanic_name || 'N/A'}</p>
                                                        <p className="text-slate-400 text-[10px] mt-1 font-medium">#{service.mechanic_license}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${
                                                        service.status?.toLowerCase() === 'completed' ? 'bg-emerald-500' :
                                                        service.status?.toLowerCase() === 'rejected' ? 'bg-rose-500' :
                                                        'bg-blue-500'
                                                    }`} />
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                                                        service.status?.toLowerCase() === 'completed' ? 'text-emerald-600' :
                                                        service.status?.toLowerCase() === 'rejected' ? 'text-rose-600' :
                                                        'text-blue-600'
                                                    }`}>
                                                        {service.status?.replace('_', ' ') || 'Pending'}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-5 text-right">
                                                <Button asChild variant="ghost" size="sm" className="gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-black text-xs uppercase tracking-widest group border-none">
                                                    <Link href={route('admin.services.show', service.id)}>
                                                        View Details
                                                        <ChevronRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-400">
                                                <Shield className="size-12 mb-4 opacity-20" />
                                                <p className="text-lg font-medium">No recorded services</p>
                                                <p className="text-sm">Data will appear once bookings are completed</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <Pagination links={services.links} />
                </div>
            </div>
        </AdminLayout>
    );
}
