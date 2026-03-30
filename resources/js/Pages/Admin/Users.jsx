import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, Link } from '@inertiajs/react';
import { 
    Search, 
    UserPlus, 
    MoreVertical, 
    Mail, 
    Phone, 
    Car,
    Shield,
    Trash2,
    Edit2,
    AlertTriangle
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog"

export default function Users({ users, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);
        
        router.get(
            route('admin.users'),
            { search: query },
            { preserveState: true, replace: true }
        );
    };

    const handleDelete = () => {
        if (!userToDelete) return;
        
        setIsDeleting(true);
        router.delete(route('admin.users.destroy', userToDelete.id), {
            preserveScroll: true,
            onSuccess: () => setUserToDelete(null),
            onFinish: () => setIsDeleting(false),
        });
    };

    return (
        <AdminLayout>
            <Head title="Manage Users" />

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Users</h1>
                        <p className="text-slate-500">Manage your platform's registered vehicle owners.</p>
                    </div>
                    <Button asChild className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-6 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200 border-none">
                        <Link href={route('register')}>
                            <UserPlus className="size-5" />
                            Add New User
                        </Link>
                    </Button>
                </div>

                {/* Filters/Search */}
                <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all duration-300 group">
                    <Search className="size-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input 
                        type="text" 
                        placeholder="Search by name, email, or license plate..." 
                        className="flex-1 bg-transparent border-none focus-visible:ring-0 text-slate-600 placeholder:text-slate-400 font-medium h-auto p-0"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto h-full w-full">
                        <Table className="min-w-[800px] md:min-w-full">
                            <TableHeader>
                                <TableRow className="bg-slate-50/50 border-b border-slate-100 hover:bg-slate-50/50">
                                    <TableHead className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">User Information</TableHead>
                                    <TableHead className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Contact & Location</TableHead>
                                    <TableHead className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider">Vehicle Details</TableHead>
                                    <TableHead className="px-6 py-5 text-slate-500 font-semibold text-xs uppercase tracking-wider text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-slate-50">
                                {users.data.length > 0 ? (
                                    users.data.map((user) => (
                                        <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors group border-slate-50">
                                            <TableCell className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold overflow-hidden">
                                                        {user.profile_image ? (
                                                            <img src={`/storage/${user.profile_image}`} alt="" className="w-full h-full object-cover" />
                                                        ) : user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <Link 
                                                            href={route('admin.users.show', user.id)}
                                                            className="font-bold text-slate-900 leading-none hover:text-blue-600 transition-colors"
                                                        >
                                                            {user.name}
                                                        </Link>
                                                        <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
                                                            <Mail className="size-3" />
                                                            {user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-5">
                                                <div className="space-y-1">
                                                    <p className="text-slate-600 text-sm font-medium">{user.city}</p>
                                                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                                                        <Phone className="size-3" />
                                                        {user.phone}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <Car className="size-4 text-slate-400" />
                                                    <span className="text-slate-700 font-bold text-sm">
                                                        {user.vehicle_name || 'Vehicle'} {user.vehicle_model}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1.5 bg-blue-50 px-2.5 py-1 rounded-full inline-block border border-blue-100">
                                                    {user.license_plate || 'No License'}
                                                </p>
                                            </TableCell>
                                            <TableCell className="px-6 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button asChild variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-black text-xs uppercase tracking-widest group border-none px-3">
                                                        <Link href={route('admin.users.show', user.id)}>
                                                            View Details
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon-sm" 
                                                        className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg h-9 w-9"
                                                        onClick={() => setUserToDelete(user)}
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-400">
                                                <Shield className="size-12 mb-4 opacity-20" />
                                                <p className="text-lg font-medium">No users found</p>
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
                    <Pagination links={users.links} />
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
                <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden border-none shadow-2xl">
                    <div className="bg-white p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 shrink-0">
                                <AlertTriangle className="size-6" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold text-slate-900">Delete User Account</DialogTitle>
                                <DialogDescription className="text-slate-500">This action cannot be undone.</DialogDescription>
                            </div>
                        </div>
                        
                        <p className="text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm italic">
                            Are you sure you want to delete <span className="font-bold text-slate-900 not-italic">"{userToDelete?.name}"</span>? All records associated with this account will be permanently removed.
                        </p>

                        <div className="flex gap-3">
                            <Button 
                                variant="outline" 
                                className="flex-1 rounded-xl h-12 font-bold text-slate-600 border-slate-200 hover:bg-slate-50"
                                onClick={() => setUserToDelete(null)}
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
                                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
