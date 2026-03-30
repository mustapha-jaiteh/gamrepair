import React, { useEffect } from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Calendar, 
    MapPin, 
    ArrowLeft, 
    Clock,
    AlertCircle,
    CheckCircle2,
    CircleDashed,
    User,
    Car,
    Phone,
    MessageSquare,
    Send,
    Check
} from 'lucide-react';
import { useForm } from '@inertiajs/react';

export default function BookingDetails({ booking }) {
    useEffect(() => {
        if (window.Echo) {
            // Listen for booking updates
            const bookingChannel = window.Echo.channel('bookings');
            bookingChannel.listen('.BookingUpdated', (e) => {
                if (e.booking.id === booking.id) {
                    router.reload();
                }
            });

            // Listen for service updates (since status is synced)
            const serviceChannel = window.Echo.channel('services');
            serviceChannel.listen('.ServiceUpdated', (e) => {
                if (e.service.booking_id === booking.id) {
                    router.reload();
                }
            });

            return () => {
                bookingChannel.stopListening('BookingUpdated');
                serviceChannel.stopListening('ServiceUpdated');
            };
        }
    }, [booking.id]);

    const { data, setData, post, processing, reset, errors } = useForm({
        service_id: booking.service?.id || '',
        license_plate: booking.license_plate,
        message: '',
    });

    const submitFeedback = (e) => {
        e.preventDefault();
        post(route('feedback.store'), {
            preserveScroll: true,
            onSuccess: () => reset('message'),
        });
    };

    const isAssigned = booking.status !== 'pending';
    const canFeedback = booking.status === 'completed' && booking.service && !booking.service.feedback;

    return (
        <UserLayout>
            <Head title={`Booking Details: ${booking.license_plate}`} />

            <div className="max-w-5xl mx-auto space-y-8 pb-12">
                <div className="flex items-center justify-between">
                    <Link href={route('user.bookings')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to history
                    </Link>
                    <div className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${
                        booking.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100 animate-pulse' :
                        booking.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        booking.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                        'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                        {booking.status === 'pending' ? 'Finding Mechanic' : 
                         booking.status === 'accepted' ? 'Assigned' : 
                         booking.status === 'completed' ? 'Completed' :
                         booking.status === 'rejected' ? 'Declined' :
                         booking.status.replace('_', ' ')}
                    </div>
                </div>

                <div className="bg-white rounded-3xl md:rounded-[3rem] p-6 sm:p-10 lg:p-14 border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02]">
                        <Clock className="w-64 h-64 text-indigo-950" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                            <div className="space-y-4">
                                <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none">{booking.vehicle_name}</h1>
                                <span className="inline-block bg-indigo-600 text-white px-4 py-1 rounded-xl text-lg font-black tracking-widest shadow-lg shadow-indigo-200">{booking.license_plate}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 font-bold text-sm">
                                <Calendar className="w-5 h-5" />
                                Requested on {new Date(booking.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-50 pt-10">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-4">
                                        <AlertCircle className="w-4 h-4 text-orange-500" />
                                        Reported Issue
                                    </h3>
                                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-600 text-lg leading-relaxed font-medium">
                                        "{booking.issue_description}"
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 mb-4">
                                        <MapPin className="w-4 h-4 text-indigo-500" />
                                        Breakdown Location
                                    </h3>
                                    <p className="text-xl font-black text-slate-900">{booking.city}</p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{booking.region}</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {isAssigned ? (
                                    <div className="bg-indigo-50 rounded-[2.5rem] p-8 border border-indigo-100 space-y-6">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            {booking.status === 'completed' ? 'Assistance Completed' : 'Mechanic Assigned'}
                                        </h3>
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 font-black text-xl shadow-sm">
                                                {booking.mechanic_name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-lg font-black text-slate-900 leading-tight">{booking.mechanic_name}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">License: {booking.mechanic_license}</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-indigo-500 font-medium leading-relaxed">
                                            {booking.status === 'completed' 
                                                ? "This service has been finalized. We hope your breakdown was handled smoothly."
                                                : "A mechanic has been assigned and is currently managing your assistance request."}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 space-y-6">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                                            <CircleDashed className="w-4 h-4 animate-spin-slow" />
                                            Dispatching
                                        </h3>
                                        <p className="text-sm font-bold text-slate-600 leading-relaxed">
                                            We are currently locating the nearest available mechanic to your position in <span className="text-indigo-600">{booking.city}</span>. Please stay with your vehicle.
                                        </p>
                                        <div className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center gap-3">
                                            <Phone className="w-4 h-4 text-slate-300" />
                                            <span className="text-xs font-black text-slate-900">{booking.phone}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200/50">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
                                        <Car className="w-4 h-4 text-indigo-400" />
                                        Owner Info
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-indigo-400">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black tracking-tight">{booking.vehicle_owner}</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{booking.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Section */}
            {canFeedback && (
                <div className="max-w-5xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                            <MessageSquare className="w-48 h-48 text-indigo-950" />
                        </div>
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Service Feedback</h2>
                            <p className="text-slate-500 font-medium mb-8">How was your experience with {booking.mechanic_name}? Your feedback helps us maintain high quality standards.</p>
                            
                            <form onSubmit={submitFeedback} className="space-y-6">
                                <div className="space-y-2">
                                    <textarea
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        placeholder="Share your experience with the assistance..."
                                        className="w-full min-h-[150px] bg-slate-50 border-slate-100 rounded-[2rem] p-6 text-slate-700 font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all resize-none"
                                        required
                                    />
                                    {errors.message && <p className="text-xs text-rose-500 font-bold ml-4">{errors.message}</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-10 py-5 bg-indigo-600 hover:bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-200 disabled:opacity-50 flex items-center gap-3 group"
                                >
                                    {processing ? 'Submitting...' : 'Submit Feedback'}
                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Existing Feedback Display */}
            {booking.service?.feedback && (
                <div className="max-w-5xl mx-auto mt-12">
                    <div className="bg-emerald-50/50 rounded-[2.5rem] p-10 border border-emerald-100/50 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
                            <Check className="w-32 h-32 text-emerald-900" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-emerald-900 font-black text-xl mb-4 flex items-center gap-3">
                                <MessageSquare className="w-6 h-6" />
                                Your Feedback Submitted
                            </h3>
                            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-emerald-100 italic text-slate-600 font-medium leading-relaxed">
                                "{booking.service.feedback.message}"
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </UserLayout>
    );
}
