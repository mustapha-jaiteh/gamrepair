import AdminLayout from '@/Layouts/AdminLayout';
import MechanicLayout from '@/Layouts/MechanicLayout';
import UserLayout from '@/Layouts/UserLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const role = auth.user.role;

    let Layout = UserLayout;
    if (role === 'admin') Layout = AdminLayout;
    else if (role === 'mechanic') Layout = MechanicLayout;

    return (
        <Layout>
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto space-y-10">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <UpdatePasswordForm />
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-red-100 shadow-sm">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
