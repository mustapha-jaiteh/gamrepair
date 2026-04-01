import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Wrench, Shield, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function Register() {
    const [showSuccess, setShowSuccess] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        street_address: '',
        city: '',
        region: '',
        mechanic_license: '',
        years_of_experience: '',
        specialization: '',
        username: '',
        password: '',
        password_confirmation: '',
        profile_image: null,
        role: 'mechanic',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('mechanics.register'), {
            onSuccess: () => {
                setShowSuccess(true);
                reset();
                setTimeout(() => {
                    router.visit(route("welcome"));
                }, 3000);
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Mechanic Registration" />

            <div className="mb-10 text-center">
                <div className="inline-flex p-4 bg-orange-50 rounded-3xl mb-4 border border-orange-100 shadow-sm shadow-orange-100">
                    <Wrench className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Mechanic Partner</h2>
                <p className="text-slate-500 font-medium mt-2 tracking-wide">Join our network of certified roadside experts.</p>
            </div>

            {showSuccess && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-100 px-6 py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-2xl shadow-emerald-500/20 animate-in fade-in slide-in-from-top-10 duration-500">
                    Mechanic Registration successful! Redirecting...
                </div>
            )}

            <form onSubmit={submit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="name" value="Full Name" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-2 block w-full"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email Address" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-2 block w-full"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="phone" value="Phone Number" />
                        <TextInput
                            id="phone"
                            name="phone"
                            value={data.phone}
                            className="mt-2 block w-full"
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="username" value="Username" />
                        <TextInput
                            id="username"
                            name="username"
                            value={data.username}
                            className="mt-2 block w-full"
                            onChange={(e) => setData('username', e.target.value)}
                            required
                        />
                        <InputError message={errors.username} className="mt-2" />
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 underline-offset-8 decoration-indigo-500/30">Service Area & Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <InputLabel htmlFor="city" value="City" />
                            <TextInput
                                id="city"
                                name="city"
                                value={data.city}
                                className="mt-2 block w-full"
                                onChange={(e) => setData('city', e.target.value)}
                                required
                            />
                            <InputError message={errors.city} className="mt-2" />
                        </div>
                        <div className="md:col-span-1">
                            <InputLabel htmlFor="region" value="Region" />
                            <TextInput
                                id="region"
                                name="region"
                                value={data.region}
                                className="mt-2 block w-full"
                                onChange={(e) => setData('region', e.target.value)}
                                required
                            />
                            <InputError message={errors.region} className="mt-2" />
                        </div>
                        <div className="md:col-span-1">
                            <InputLabel htmlFor="street_address" value="Street" />
                            <TextInput
                                id="street_address"
                                name="street_address"
                                value={data.street_address}
                                className="mt-2 block w-full"
                                onChange={(e) => setData('street_address', e.target.value)}
                                required
                            />
                            <InputError message={errors.street_address} className="mt-2" />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 underline-offset-8 decoration-orange-500/30">Professional Credentials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="mechanic_license" value="License / Certification ID" />
                            <TextInput
                                id="mechanic_license"
                                name="mechanic_license"
                                value={data.mechanic_license}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('mechanic_license', e.target.value)}
                                required
                            />
                            <InputError message={errors.mechanic_license} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="years_of_experience" value="Years of Experience" />
                            <TextInput
                                id="years_of_experience"
                                type="number"
                                name="years_of_experience"
                                value={data.years_of_experience}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('years_of_experience', e.target.value)}
                                required
                            />
                            <InputError message={errors.years_of_experience} className="mt-2" />
                        </div>

                        <div className="md:col-span-2">
                            <InputLabel htmlFor="specialization" value="Primary Specialization" />
                            <TextInput
                                id="specialization"
                                name="specialization"
                                value={data.specialization}
                                className="mt-1 block w-full"
                                placeholder="e.g. Engine Repair, Electrical Systems, Flat Tires"
                                onChange={(e) => setData('specialization', e.target.value)}
                                required
                            />
                            <InputError message={errors.specialization} className="mt-2" />
                        </div>

                        <div className="md:col-span-2">
                            <InputLabel htmlFor="profile_image" value="Profile Photo" />
                            <div className="mt-2 group cursor-pointer">
                                <input
                                    type="file"
                                    id="profile_image"
                                    className="block w-full text-sm text-slate-400 file:mr-4 file:py-3 file:px-8 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:tracking-widest file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 transition-all"
                                    onChange={(e) => setData('profile_image', e.target.files[0])}
                                />
                            </div>
                            <InputError message={errors.profile_image} className="mt-2" />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6">
                    <Link href={route('login')} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 transition-colors">
                        Already partner? Log in
                    </Link>
                    <PrimaryButton disabled={processing} className="px-10 py-5 bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-100 rounded-3xl">
                        Register As Partner
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
