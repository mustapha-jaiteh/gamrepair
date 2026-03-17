import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    Search, 
    MoreHorizontal, 
    UserPlus,
    Mail,
    Phone,
    MapPin,
    Car
} from 'lucide-react';

export default function Users({ users }) {
    return (
        <AdminLayout>
            <Head title="Manage Users" />

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Users</h1>
                        <p className="text-slate-500">Manage your platform's registered vehicle owners.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200">
                        <UserPlus className="w-5 h-5" />
                        Add New User
                    </button>
                </div>

                {/* Filters/Search Placeholder */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search by name, email, or license plate..." 
                        className="flex-1 border-none focus:ring-0 text-slate-600 placeholder:text-slate-400"
                    />
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-slate-600 font-semibold text-sm">User Details</th>
                                    <th className="px-6 py-4 text-slate-600 font-semibold text-sm">Location</th>
                                    <th className="px-6 py-4 text-slate-600 font-semibold text-sm">Vehicle info</th>
                                    <th className="px-6 py-4 text-slate-600 font-semibold text-sm">License Plate</th>
                                    <th className="px-6 py-4 text-slate-600 font-semibold text-sm text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 leading-none">{user.name}</p>
                                                    <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
                                                        <Mail className="w-3 h-3" />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-1">
                                                <p className="text-slate-600 text-sm font-medium">{user.city}</p>
                                                <div className="flex items-center gap-1 text-slate-400 text-xs">
                                                    <Phone className="w-3 h-3" />
                                                    {user.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <Car className="w-4 h-4 text-slate-400" />
                                                <span className="text-slate-700 font-medium text-sm">{user.vehicle_name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg uppercase tracking-wider border border-slate-200">
                                                {user.license_plate}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
