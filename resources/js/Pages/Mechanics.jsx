import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Pagination from '@/Components/Pagination';
import { 
    Search, 
    Wrench,
    MapPin,
    Star,
    Award,
    CheckCircle2,
    Zap,
    ArrowLeft,
    Phone
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

export default function Mechanics({ mechanics: initialMechanics, filters }) {
    const [search, setSearch] = React.useState(filters.search || '');
    const [mechanicsList, setMechanicsList] = React.useState(initialMechanics.data);

    // Update list if initialMechanics changes (e.g. search)
    React.useEffect(() => {
        setMechanicsList(initialMechanics.data);
    }, [initialMechanics.data]);

    // Real-time status updates
    React.useEffect(() => {
        const channel = window.Echo.channel('mechanics-public');
        
        channel.listen('.MechanicStatusChanged', (e) => {
            setMechanicsList(prev => prev.map(m => 
                m.id === e.mechanicId ? { ...m, is_online: e.isOnline } : m
            ));
        });

        return () => channel.stopListening('.MechanicStatusChanged');
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);
        
        router.get(
            route('public.mechanics'),
            { search: query },
            { preserveState: true, replace: true }
        );
    };

    return (
        <div className="bg-[#FDFCFB] min-h-screen">
            <Head title="Our Mechanics - ORVBA" />

            {/* Simple Navbar */}
            <nav className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="bg-indigo-600 p-2 rounded-xl">
                            <ApplicationLogo className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black text-slate-900 tracking-tight">ORVBA<span className="text-indigo-600">.</span></span>
                    </Link>
                    <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black text-xs uppercase tracking-widest transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified Professional Network
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[0.9]">Meet our certified <span className="text-indigo-600">mechanics.</span></h1>
                        <p className="text-slate-500 font-medium text-lg mt-6">Browse our network of vetted experts ready to assist you any time, anywhere.</p>
                    </div>

                    <div className="w-full md:w-96">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors z-10" />
                            <Input 
                                type="text" 
                                placeholder="Search by name, skill, or city..." 
                                className="pl-12 bg-white border-slate-200 rounded-2xl focus-visible:ring-indigo-500/10 focus-visible:border-indigo-600"
                                value={search}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mechanicsList.length > 0 ? (
                        mechanicsList.map((mechanic) => (
                            <Card key={mechanic.id} className="rounded-2xl border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden flex flex-col pt-0 pb-0">
                                <CardHeader className="p-8 pb-0">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="relative">
                                            <img 
                                                src={mechanic.profile_image ? `/storage/${mechanic.profile_image}` : `https://ui-avatars.com/api/?name=${mechanic.name}&background=6366f1&color=fff`} 
                                                alt={mechanic.name} 
                                                className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50 shadow-sm"
                                            />
                                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-colors duration-500 ${mechanic.is_online ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                                        </div>
                                        <div>
                                            <CardTitle className="font-black text-slate-900 leading-tight">{mechanic.name}</CardTitle>
                                            <CardDescription className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mt-1">{mechanic.specialization}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-8 pt-0 flex-1">
                                    <div className="space-y-4 mb-8 text-sm">
                                        <div className="flex items-center gap-3 text-slate-500 font-medium">
                                            <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            {mechanic.city}, {mechanic.region}
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500 font-medium">
                                            <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                <Award className="w-4 h-4" />
                                            </div>
                                            {mechanic.years_of_experience} Years Experience
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-900 font-black">
                                            <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            {mechanic.phone}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                                            ))}
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full transition-all duration-500 ${
                                            mechanic.is_online 
                                            ? 'text-emerald-600 bg-emerald-50 border border-emerald-100' 
                                            : 'text-rose-600 bg-rose-50 border border-rose-100'
                                        }`}>
                                            {mechanic.is_online ? 'Available Now' : 'Offline'}
                                        </span>
                                    </div>
                                </CardContent>
                                
                                <CardFooter className="p-0 border-t-0 bg-transparent mt-4">
                                    <Button 
                                        asChild 
                                        variant="default" 
                                        className="w-full h-14 bg-indigo-600 hover:bg-slate-900 text-white rounded-none rounded-b-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20"
                                    >
                                        <Link href={route('bookings.create', { mechanic: mechanic.id })}>Book Now</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
                           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Wrench className="w-10 h-10 text-slate-300" />
                           </div>
                            <h3 className="text-slate-900 font-black text-2xl mb-2">No mechanics found</h3>
                            <p className="text-slate-500 font-medium">No experts match your search criteria.</p>
                        </div>
                    )}
                </div>

                <div className="mt-16 text-center">
                    <Pagination links={initialMechanics.links} />
                </div>
            </main>

            {/* CTA Section */}
            <section className="bg-indigo-600 py-24 mb-20 mx-6 rounded-[3rem]">
                <div className="max-w-4xl mx-auto px-6 text-center text-white">
                    <Zap className="w-12 h-12 mx-auto mb-8 opacity-50" />
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8 leading-tight">Need urgent help? <br />Register now to track assistance.</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Button asChild size="lg" className="px-10 py-7 bg-white text-indigo-600 rounded-[1.5rem] font-black text-sm tracking-widest hover:bg-slate-50 transition-all shadow-2xl shadow-indigo-900/20 border-none">
                            <Link href={route('register')}>REGISTER TO REQUEST</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="px-10 py-7 text-slate-900 rounded-[1.5rem] font-black text-sm tracking-widest hover:bg-indigo-700 hover:text-white transition-all border-indigo-500/30">
                            <Link href={route('login')}>LOG IN</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <footer className="py-20 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">© 2024 ON ROAD VEHICLE BREAKDOWN ASSISTANCE. ALL RIGHTS RESERVED.</p>
                    <div className="flex items-center gap-3">
                        <ApplicationLogo className="w-5 h-5 text-indigo-600" />
                        <span className="text-lg font-black text-slate-900 tracking-tight">ORVBA<span className="text-indigo-600">.</span></span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
