import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { useState } from "react";

export default function Register() {
    const [showSuccess, setShowSuccess] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "user",
        phone: "",
        street_address: "",
        city: "",
        region: "",
        vehicle_name: "",
        vehicle_model: "",
        vehicle_year: "",
        license_plate: "",
        vehicle_type: "",
        username: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccess(true);
                reset();
                setTimeout(() => {
                    router.visit(route("dashboard"));
                }, 3000);
            },
            onError: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h2>
                <p className="text-slate-500 font-medium mt-2">Get back on the road with premium assistance.</p>
            </div>

            {showSuccess && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-100 px-6 py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-2xl shadow-emerald-500/20 animate-in fade-in slide-in-from-top-10 duration-500">
                    Registration successful! Redirecting...
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
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
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
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="username" value="Username" />
                        <TextInput
                            id="username"
                            name="username"
                            value={data.username}
                            className="mt-2 block w-full"
                            onChange={(e) => setData("username", e.target.value)}
                            required
                        />
                        <InputError message={errors.username} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="phone" value="Phone Number" />
                        <TextInput
                            id="phone"
                            name="phone"
                            value={data.phone}
                            className="mt-2 block w-full"
                            onChange={(e) => setData("phone", e.target.value)}
                            required
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Location Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <InputLabel htmlFor="city" value="City" />
                            <TextInput
                                id="city"
                                name="city"
                                value={data.city}
                                className="mt-2 block w-full"
                                onChange={(e) => setData("city", e.target.value)}
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
                                onChange={(e) => setData("region", e.target.value)}
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
                                onChange={(e) => setData("street_address", e.target.value)}
                                required
                            />
                            <InputError message={errors.street_address} className="mt-2" />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-50">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Vehicle Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="vehicle_name" value="Vehicle Name" />
                            <TextInput
                                id="vehicle_name"
                                name="vehicle_name"
                                value={data.vehicle_name}
                                className="mt-2 block w-full"
                                placeholder="e.g. Toyota"
                                onChange={(e) => setData("vehicle_name", e.target.value)}
                                required
                            />
                            <InputError message={errors.vehicle_name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="vehicle_model" value="Vehicle Model" />
                            <TextInput
                                id="vehicle_model"
                                name="vehicle_model"
                                value={data.vehicle_model}
                                className="mt-2 block w-full"
                                placeholder="e.g. Camry"
                                onChange={(e) => setData("vehicle_model", e.target.value)}
                                required
                            />
                            <InputError message={errors.vehicle_model} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="license_plate" value="License Plate" />
                            <TextInput
                                id="license_plate"
                                name="license_plate"
                                value={data.license_plate}
                                className="mt-2 block w-full"
                                onChange={(e) => setData("license_plate", e.target.value)}
                                required
                            />
                            <InputError message={errors.license_plate} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <InputLabel htmlFor="vehicle_year" value="Year" />
                            <TextInput
                                id="vehicle_year"
                                type="number"
                                name="vehicle_year"
                                value={data.vehicle_year}
                                className="mt-2 block w-full"
                                onChange={(e) => setData("vehicle_year", e.target.value)}
                                required
                            />
                            <InputError message={errors.vehicle_year} className="mt-2" />
                        </div>

                        <div className="md:col-span-2">
                            <InputLabel htmlFor="vehicle_type" value="Vehicle Type" />
                            <TextInput
                                id="vehicle_type"
                                name="vehicle_type"
                                value={data.vehicle_type}
                                className="mt-2 block w-full"
                                placeholder="e.g. Sedan, SUV, Truck"
                                onChange={(e) => setData("vehicle_type", e.target.value)}
                                required
                            />
                            <InputError message={errors.vehicle_type} className="mt-2" />
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
                            className="mt-2 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData("password", e.target.value)}
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
                            className="mt-2 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6">
                    <Link
                        href={route("login")}
                        className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 rounded-2xl" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
