import React, { useState } from 'react';
import { Head, useForm, usePage, Link, router } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { 
    ArrowLeft, 
    Wrench,
    Calendar,
    MapPin,
    Car,
    User,
    Mail,
    Phone,
    FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';

export default function Create({ mechanic }) {
    const { auth } = usePage().props;
    const isAuth = !!auth.user;
    
    // Auto-fill user data if authenticated
    const [showSuccess, setShowSuccess] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        mechanic_id: mechanic.id,
        vehicle_name: isAuth ? (auth.user.vehicle_name || '') : '',
        license_plate: isAuth ? auth.user.license_plate : '',
        vehicle_owner: isAuth ? auth.user.name : '',
        email: isAuth ? auth.user.email : '',
        phone: isAuth ? auth.user.phone : '',
        city: isAuth ? auth.user.city : '',
        issue_description: '',
        date: new Date().toISOString().split('T')[0],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('bookings.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccess(true);
                reset();
                setTimeout(() => {
                    router.visit(isAuth ? route('user.bookings') : route('welcome'));
                }, 3000);
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Head title={`Book ${mechanic.name}`} />

            {/* Simple Navbar */}
            <nav className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-50 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-xl">
                            <ApplicationLogo className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black text-slate-900 tracking-tight hidden sm:block">ORVBA<span className="text-indigo-600">.</span></span>
                    </Link>
                    <Link 
                        href={isAuth ? route('user.mechanics') : route('public.mechanics')} 
                        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Directory
                    </Link>
                </div>
            </nav>

            <main className="flex-1 py-12 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Mechanic Summary Card */}
                    <div className="md:col-span-1 border-none shadow-none bg-transparent">
                        <div className="sticky top-28 bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/20 text-center">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner">
                                <img 
                                    src={mechanic.profile_image ? `/storage/${mechanic.profile_image}` : `https://ui-avatars.com/api/?name=${mechanic.name}&background=6366f1&color=fff`} 
                                    alt={mechanic.name} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-xl font-black text-slate-900">{mechanic.name}</h2>
                            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest mt-1 mb-6">{mechanic.specialization}</p>

                            <div className="space-y-3 text-sm text-slate-600 text-left bg-slate-50 p-4 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    <span className="font-medium">{mechanic.city}, {mechanic.region}</span>
                                </div>
                                <div className="flex items-center gap-3 xl:whitespace-nowrap">
                                    <Wrench className="w-4 h-4 text-slate-400" />
                                    <span className="font-medium">{mechanic.years_of_experience} Years Experience</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="md:col-span-2">
                        <Card className="rounded-3xl border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
                            <CardHeader className="bg-slate-900 text-white p-8">
                                <CardTitle className="text-2xl font-black flex items-center gap-3">
                                    <Calendar className="w-6 h-6 text-indigo-400" />
                                    Service Request Form
                                </CardTitle>
                                <CardDescription className="text-slate-400 font-medium mt-2 text-base">
                                    {!isAuth && "You are booking as a guest. Please provide accurate details so the mechanic can reach you."}
                                    {isAuth && "Review your prepopulated details below to complete your request."}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                {showSuccess && (
                                    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-2xl shadow-emerald-500/20 animate-in fade-in slide-in-from-top-10 duration-500">
                                        Booking requested successfully! Redirecting...
                                    </div>
                                )}
                                <form onSubmit={submit} className="space-y-8">
                                    
                                    {/* Section 1: Vehicle Details */}
                                    <div className="space-y-5">
                                        <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                                            <Car className="w-4 h-4" /> Vehicle Information
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="vehicle_name" className="text-slate-600 font-bold">Vehicle Model / Name</Label>
                                                <Input
                                                    id="vehicle_name"
                                                    type="text"
                                                    value={data.vehicle_name}
                                                    onChange={e => setData('vehicle_name', e.target.value)}
                                                    required
                                                    className="bg-slate-50 border-slate-200 h-12 rounded-xl focus-visible:ring-indigo-600"
                                                    placeholder="e.g. Toyota Corolla 2019"
                                                />
                                                {errors.vehicle_name && <p className="text-red-500 text-xs font-medium">{errors.vehicle_name}</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="license_plate" className="text-slate-600 font-bold">License Plate Number</Label>
                                                <Input
                                                    id="license_plate"
                                                    type="text"
                                                    value={data.license_plate}
                                                    onChange={e => setData('license_plate', e.target.value)}
                                                    required
                                                    className="bg-slate-50 border-slate-200 h-12 rounded-xl focus-visible:ring-indigo-600 uppercase"
                                                    placeholder="ABC-1234"
                                                />
                                                {errors.license_plate && <p className="text-red-500 text-xs font-medium">{errors.license_plate}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 2: Contact Details */}
                                    <div className="space-y-5">
                                        <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                                            <User className="w-4 h-4" /> Contact Information
                                        </h3>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicle_owner" className="text-slate-600 font-bold">Full Name</Label>
                                            <Input
                                                id="vehicle_owner"
                                                type="text"
                                                value={data.vehicle_owner}
                                                onChange={e => setData('vehicle_owner', e.target.value)}
                                                required
                                                className="bg-slate-50 border-slate-200 h-12 rounded-xl focus-visible:ring-indigo-600"
                                                placeholder="John Doe"
                                            />
                                            {errors.vehicle_owner && <p className="text-red-500 text-xs font-medium">{errors.vehicle_owner}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-slate-600 font-bold flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={e => setData('email', e.target.value)}
                                                    required
                                                    className="bg-slate-50 border-slate-200 h-12 rounded-xl focus-visible:ring-indigo-600"
                                                    placeholder="john@example.com"
                                                />
                                                {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email}</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-slate-600 font-bold flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Phone Number</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={data.phone}
                                                    onChange={e => setData('phone', e.target.value)}
                                                    required
                                                    className="bg-slate-50 border-slate-200 h-12 rounded-xl focus-visible:ring-indigo-600"
                                                />
                                                {errors.phone && <p className="text-red-500 text-xs font-medium">{errors.phone}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="city" className="text-slate-600 font-bold flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Your Current Location</Label>
                                            <Input
                                                id="city"
                                                type="text"
                                                value={data.city}
                                                onChange={e => setData('city', e.target.value)}
                                                required
                                                className="bg-slate-50 border-slate-200 h-12 rounded-xl focus-visible:ring-indigo-600"
                                                placeholder="e.g. Downtown Nairobi, near Central Mall"
                                            />
                                            {errors.city && <p className="text-red-500 text-xs font-medium">{errors.city}</p>}
                                        </div>
                                    </div>

                                    {/* Section 3: Issue */}
                                    <div className="space-y-5">
                                        <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-2 flex items-center gap-2">
                                            <FileText className="w-4 h-4" /> Breakdown Details
                                        </h3>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-2">
                                                <Label htmlFor="date" className="text-slate-600 font-bold">Date of Incident</Label>
                                                <Input
                                                    id="date"
                                                    type="date"
                                                    value={data.date}
                                                    onChange={e => setData('date', e.target.value)}
                                                    required
                                                    className="bg-slate-50 border-slate-200 h-12 rounded-xl focus-visible:ring-indigo-600"
                                                />
                                                {errors.date && <p className="text-red-500 text-xs font-medium">{errors.date}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="issue_description" className="text-slate-600 font-bold">Describe the Issue</Label>
                                            <Textarea
                                                id="issue_description"
                                                value={data.issue_description}
                                                onChange={e => setData('issue_description', e.target.value)}
                                                required
                                                className="bg-slate-50 border-slate-200 min-h-[120px] rounded-xl focus-visible:ring-indigo-600 p-4 resize-y"
                                                placeholder="e.g. My car won't start, the battery seems completely dead, and the engine makes a clicking sound."
                                            />
                                            {errors.issue_description && <p className="text-red-500 text-xs font-medium">{errors.issue_description}</p>}
                                        </div>
                                    </div>

                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full h-14 bg-indigo-600 hover:bg-slate-900 text-white rounded-xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20"
                                    >
                                        {processing ? 'Submitting Request...' : 'Confirm Request'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </main>
        </div>
    );
}
