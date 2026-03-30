import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { 
    MessageSquare, 
    Calendar,
    Quote,
    Search
} from 'lucide-react';

export default function Feedbacks({ feedbacks, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);
        
        router.get(
            route('admin.feedbacks'),
            { search: query },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AdminLayout>
            <Head title="Client Feedback" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Feedback</h1>
                    <p className="text-slate-500">Reviews and ratings from vehicle owners regarding their assistance experience.</p>
                </div>

                {/* Filters/Search */}
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search feedback by content or username..." 
                        className="flex-1 border-none focus:ring-0 text-slate-600 placeholder:text-slate-400"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {feedbacks.data.length > 0 ? (
                        feedbacks.data.map((item) => (
                            <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group relative p-6 flex flex-col">
                                <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Quote className="w-12 h-12 text-blue-600" />
                                </div>

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 font-bold border border-slate-200 uppercase">
                                        {item.service?.vehicle_owner?.charAt(0) || 'U'}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <h3 className="font-bold text-slate-900 leading-none truncate">{item.service?.vehicle_owner || 'Anonymous User'}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{item.license_plate}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <p className="text-slate-600 text-sm leading-relaxed italic">
                                        "{item.message || 'No comment provided.'}"
                                    </p>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}
                                    </div>
                                    <span className="text-blue-500 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Verified</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-white rounded-4xl border border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-slate-900 font-bold text-lg">No feedback found</h3>
                            <p className="text-slate-400 text-sm">No feedback matches your search criteria.</p>
                        </div>
                    )}
                </div>

                <Pagination links={feedbacks.links} />
            </div>
        </AdminLayout>
    );
}
