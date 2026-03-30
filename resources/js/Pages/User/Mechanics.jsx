import React, { useState } from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { 
    Search, 
    Wrench,
    MapPin,
    Star,
    Award,
    CheckCircle2
} from 'lucide-react';
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent, 
    CardFooter 
} from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

export default function Mechanics({ mechanics, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);
        
        router.get(
            route('user.mechanics'),
            { search: query },
            { preserveState: true, replace: true }
        );
    };

    return (
        <UserLayout>
            <Head title="Direct Booking - Directory" />

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Available Mechanics</h1>
                        <p className="text-slate-500 font-medium mt-1">Select a vetted professional to instantly request breakdown assistance.</p>
                    </div>
                </div>

                {/* Search */}
                <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all duration-300 group">
                    <Search className="size-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <Input 
                        type="text" 
                        placeholder="Search mechanics by name, skill, or location..." 
                        className="flex-1 bg-transparent border-none focus-visible:ring-0 text-slate-600 placeholder:text-slate-400 font-medium h-auto p-0"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mechanics.data.length > 0 ? (
                        mechanics.data.map((mechanic) => (
                            <Card key={mechanic.id} className="rounded-2xl border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col pt-0 pb-0">
                                <CardHeader className="p-6 pb-0">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="relative">
                                            <img 
                                                src={mechanic.profile_image ? `/storage/${mechanic.profile_image}` : `https://ui-avatars.com/api/?name=${mechanic.name}&background=6366f1&color=fff`} 
                                                alt={mechanic.name} 
                                                className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50 shadow-sm"
                                            />
                                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"></div>
                                        </div>
                                        <div>
                                            <CardTitle className="font-black text-slate-900 leading-tight">{mechanic.name}</CardTitle>
                                            <CardDescription className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mt-1">{mechanic.specialization}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6 pt-0 flex-1">
                                    <div className="space-y-3 mb-6 text-sm">
                                        <div className="flex items-center gap-3 text-slate-500 font-medium">
                                            <div className="bg-slate-50 p-1.5 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            {mechanic.city}, {mechanic.region}
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500 font-medium">
                                            <div className="bg-slate-50 p-1.5 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                <Award className="w-4 h-4" />
                                            </div>
                                            {mechanic.years_of_experience} Years Experience
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Active</span>
                                    </div>
                                </CardContent>
                                
                                <CardFooter className="p-0 border-t-0 bg-transparent mt-2">
                                    <Button 
                                        asChild 
                                        variant="default" 
                                        className="w-full h-12 bg-indigo-600 hover:bg-slate-900 text-white rounded-none rounded-b-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20"
                                    >
                                        <Link href={route('bookings.create', { mechanic: mechanic.id })}>Book Now</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                           <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Wrench className="w-8 h-8 text-slate-300" />
                           </div>
                            <h3 className="text-slate-900 font-black text-xl mb-1">No mechanics found</h3>
                            <p className="text-slate-500 font-medium text-sm">No experts match your search criteria.</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-10">
                    <Pagination links={mechanics.links} />
                </div>
            </div>
        </UserLayout>
    );
}
