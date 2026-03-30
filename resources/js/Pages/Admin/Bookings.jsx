import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, Link } from '@inertiajs/react';
import {
    Search,
    Calendar,
    Clock,
    Car,
    AlertCircle,
    ChevronRight,
    Wrench,
    Shield
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

export default function Bookings({ bookings, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        if (window.Echo) {
            const channel = window.Echo.channel('bookings');
            channel.listen('.BookingUpdated', () => {
                router.reload({ only: ['bookings'] });
            });
            window.Echo.channel('services').listen('.ServiceUpdated', () => {
                router.reload({ only: ['bookings'] });
            });
            return () => {
                channel.stopListening('.BookingUpdated');
                window.Echo.channel('services').stopListening('.ServiceUpdated');
            };
        }
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);

        router.get(
            route('admin.bookings'),
            { search: query },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AdminLayout>
            <Head title="Service Bookings" />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bookings</h1>
                        <p className="text-slate-500">Monitor and assign assistance requests.</p>
                    </div>
                </div>

                {/* Filters/Search */}
                <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all duration-300 group">
                    <Search className="size-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                        type="text"
                        placeholder="Search bookings by license plate, ID, or vehicle..."
                        className="flex-1 bg-transparent border-none focus-visible:ring-0 text-slate-600 placeholder:text-slate-400 font-medium h-auto p-0"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto h-full w-full">
                        <Table className="min-w-[800px] md:min-w-full">
                            <TableHeader>
                                <TableRow className="bg-slate-50/50 border-b border-slate-100">
                                    <TableHead className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Vehicle & Owner</TableHead>
                                    <TableHead className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Assigned Mechanic</TableHead>
                                    <TableHead className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Status & Date</TableHead>
                                    <TableHead className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-slate-50">
                                {bookings.data.length > 0 ? (
                                    bookings.data.map((booking) => (
                                        <TableRow key={booking.id} className="hover:bg-slate-50/50 transition-colors group border-slate-50">
                                            <TableCell className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                                                        <Car className="size-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 leading-none">{booking.vehicle_name}</p>
                                                        <p className="text-slate-400 text-xs mt-1 font-medium">{booking.vehicle_owner}</p>
                                                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1.5 bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                                                            {booking.license_plate}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-5">
                                                {booking.mechanic_name ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-xs font-bold">
                                                            {booking.mechanic_name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-700 font-bold text-sm leading-none">{booking.mechanic_name}</p>
                                                            <p className="text-slate-400 text-[10px] mt-1 font-medium">#{booking.mechanic_license}</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 text-orange-600 px-3 py-1 bg-orange-50 rounded-full text-[10px] font-bold uppercase tracking-widest border border-orange-100">
                                                        <AlertCircle className="size-3" />
                                                        Unassigned
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="px-6 py-5">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                                        <Calendar className="size-3.5" />
                                                        {booking.date}
                                                    </div>
                                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                                        booking.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                        booking.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                        booking.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                        'bg-blue-50 text-blue-600 border-blue-100'
                                                    }`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${
                                                            booking.status === 'pending' ? 'bg-orange-500' :
                                                            booking.status === 'completed' ? 'bg-emerald-500' :
                                                            booking.status === 'rejected' ? 'bg-rose-500' :
                                                            'bg-blue-500'
                                                        }`} />
                                                        {booking.status === 'pending' ? 'Finding Mechanic' : 
                                                        booking.status === 'accepted' ? 'Assigned' : 
                                                        booking.status?.replace('_', ' ')}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-5 text-right">
                                                <Button asChild variant="ghost" size="sm" className="gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-black text-xs uppercase tracking-widest group border-none">
                                                    <Link href={route('admin.bookings.show', booking.id)}>
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
                                                <p className="text-lg font-medium">No bookings found</p>
                                                <p className="text-sm">Try adjusting your search criteria</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <Pagination links={bookings.links} />
                </div>
            </div>
        </AdminLayout>
    );
}
