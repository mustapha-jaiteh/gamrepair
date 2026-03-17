import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { 
    Search, 
    MoreHorizontal, 
    Wrench,
    Mail,
    Phone,
    MapPin,
    Star,
    Award
} from 'lucide-react';

export default function Mechanics({ mechanics }) {
    return (
        <AdminLayout>
            <Head title="Manage Mechanics" />

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mechanics</h1>
                        <p className="text-slate-500">View and manage specialized service providers.</p>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200">
                        <Wrench className="w-5 h-5" />
                        Add New Mechanic
                    </button>
                </div>

                {/* Filters/Search Placeholder */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search mechanics by name, skill, or location..." 
                        className="flex-1 border-none focus:ring-0 text-slate-600 placeholder:text-slate-400"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mechanics.map((mechanic) => (
                        <div key={mechanic.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                             <img 
                                                src={mechanic.profile_image ? `/storage/${mechanic.profile_image}` : 'https://ui-avatars.com/api/?name=' + mechanic.name} 
                                                alt={mechanic.name} 
                                                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50 shadow-sm"
                                            />
                                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white shadow-sm"></div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg leading-tight">{mechanic.name}</h3>
                                            <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider mt-1">{mechanic.specialization}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        {mechanic.city}, {mechanic.region}
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        {mechanic.phone}
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                                        <Award className="w-4 h-4 text-slate-400" />
                                        {mechanic.years_of_experience} Experience
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className={`w-3.5 h-3.5 ${star <= 4 ? 'text-orange-400 fill-orange-400' : 'text-slate-200'}`} />
                                        ))}
                                        <span className="text-xs text-slate-400 ml-1 font-medium">(12 Reviews)</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                                        ID: {mechanic.mechanic_license}
                                    </span>
                                </div>
                            </div>
                            
                            <Link 
                                href={route('admin.mechanics')} // Change to details when ready
                                className="block w-full py-4 bg-slate-50 hover:bg-blue-600 hover:text-white text-center text-sm font-bold text-slate-600 transition-all border-t border-slate-100"
                            >
                                View Full Profile
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
