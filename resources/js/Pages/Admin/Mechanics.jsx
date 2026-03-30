import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, Link } from '@inertiajs/react';
import { 
    Search, 
    Wrench, 
    MoreVertical, 
    MapPin, 
    Star, 
    Award,
    Trash2,
    Edit2,
    Shield,
    AlertTriangle
} from 'lucide-react';
import Pagination from '@/Components/Pagination';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog"

export default function Mechanics({ mechanics, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [mechanicToDelete, setMechanicToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);
        
        router.get(
            route('admin.mechanics'),
            { search: query },
            { preserveState: true, replace: true }
        );
    };

    const handleDelete = () => {
        if (!mechanicToDelete) return;
        
        setIsDeleting(true);
        router.delete(route('admin.mechanics.destroy', mechanicToDelete.id), {
            preserveScroll: true,
            onSuccess: () => setMechanicToDelete(null),
            onFinish: () => setIsDeleting(false),
        });
    };

    const handleVerify = (e, mechanicId) => {
        e.preventDefault();
        router.put(route('admin.mechanics.verify', mechanicId), {}, {
            preserveScroll: true
        });
    };

    return (
        <AdminLayout>
            <Head title="Manage Mechanics" />

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mechanics</h1>
                        <p className="text-slate-500">View and manage specialized service providers.</p>
                    </div>
                    <Button asChild className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-6 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200 border-none">
                        <Link href={route('mechanics.register')}>
                            <Wrench className="size-5" />
                            Add New Mechanic
                        </Link>
                    </Button>
                </div>

                {/* Filters/Search */}
                <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all duration-300 group">
                    <Search className="size-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input 
                        type="text" 
                        placeholder="Search mechanics by name, skill, or location..." 
                        className="flex-1 bg-transparent border-none focus-visible:ring-0 text-slate-600 placeholder:text-slate-400 font-medium h-auto p-0"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mechanics.data.length > 0 ? (
                        mechanics.data.map((mechanic) => (
                            <Card key={mechanic.id} className="border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 relative group pt-0 pb-0 overflow-hidden flex flex-col justify-between">
                                <CardHeader className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg overflow-hidden border border-blue-100">
                                                {mechanic.profile_image ? (
                                                    <img src={`/storage/${mechanic.profile_image}`} alt="" className="w-full h-full object-cover" />
                                                ) : mechanic.name.charAt(0)}
                                            </div>
                                            <div>
                                                <CardTitle className="font-bold text-slate-900">{mechanic.name}</CardTitle>
                                                <CardDescription className="text-blue-600 text-[10px] font-bold uppercase tracking-widest mt-0.5">{mechanic.specialization}</CardDescription>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon-sm" className="text-slate-400">
                                            <MoreVertical className="size-4" />
                                        </Button>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6 pt-0">
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-slate-500 text-sm">
                                            <MapPin className="size-4" />
                                            {mechanic.city}, {mechanic.region}
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500 text-sm">
                                            <Award className="size-4" />
                                            {mechanic.years_of_experience} Yrs Experience
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="size-3 text-orange-400 fill-orange-400" />
                                            ))}
                                        </div>
                                        {mechanic.is_verified ? (
                                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md">Verified</span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-1 rounded-md">Pending</span>
                                        )}
                                    </div>
                                </CardContent>

                                <CardFooter className="p-2 bg-slate-50/50 gap-2 border-t border-slate-50 flex-wrap">
                                    <Button 
                                        variant="ghost" 
                                        className={`flex-1 rounded-xl text-xs font-bold border-none transition-all ${
                                            mechanic.is_verified 
                                                ? 'hover:bg-amber-100 hover:text-amber-700 text-slate-500' 
                                                : 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200'
                                        }`}
                                        onClick={(e) => handleVerify(e, mechanic.id)}
                                    >
                                        <Shield className="size-3.5 mr-1" />
                                        {mechanic.is_verified ? 'Revoke' : 'Verify'}
                                    </Button>
                                    <Button asChild variant="ghost" className="flex-1 hover:bg-blue-50 hover:text-blue-600 px-2 rounded-xl text-slate-500 text-xs font-bold border-none transition-all">
                                        <Link href={route('admin.mechanics.show', mechanic.id)}>
                                            <Edit2 className="size-3.5 mr-1" />
                                            View
                                        </Link>
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        className="flex-1 hover:bg-red-50 hover:text-red-600 px-2 rounded-xl text-slate-500 text-xs font-bold border-none transition-all"
                                        onClick={(e) => { e.preventDefault(); setMechanicToDelete(mechanic); }}
                                    >
                                        <Trash2 className="size-3.5 mr-1" />
                                        Remove
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                           <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="size-8 text-slate-300" />
                           </div>
                            <h3 className="text-slate-900 font-bold text-xl mb-1">No mechanics found</h3>
                            <p className="text-slate-500 text-sm">No service providers match your search criteria.</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-10">
                    <Pagination links={mechanics.links} />
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!mechanicToDelete} onOpenChange={(open) => !open && setMechanicToDelete(null)}>
                <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-none shadow-2xl">
                    <div className="bg-white p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 shrink-0">
                                <AlertTriangle className="size-6" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold text-slate-900">Remove Mechanic</DialogTitle>
                                <DialogDescription className="text-slate-500">This will remove them from the directory.</DialogDescription>
                            </div>
                        </div>
                        
                        <p className="text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm italic">
                            Are you sure you want to remove <span className="font-bold text-slate-900 not-italic">"{mechanicToDelete?.name}"</span>? This will deactivate their profile from the platform.
                        </p>

                        <div className="flex gap-3">
                            <Button 
                                variant="outline" 
                                className="flex-1 rounded-xl h-12 font-bold text-slate-600 border-slate-200 hover:bg-slate-50"
                                onClick={() => setMechanicToDelete(null)}
                                disabled={isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button 
                                variant="default" 
                                className="flex-1 rounded-xl h-12 font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-100 border-none px-6"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Removing...' : 'Confirm Remove'}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
