import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
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
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <InputLabel htmlFor="username" value="Username" />
                        <TextInput
                            id="username"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.username}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="phone" value="Phone" />
                        <TextInput
                            id="phone"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("phone", e.target.value)}
                            required
                        />
                        <InputError message={errors.phone} className="mt-2" />
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <InputLabel
                            htmlFor="street_address"
                            value="Street Address"
                        />
                        <TextInput
                            id="street_address"
                            name="street_address"
                            value={data.street_address}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("street_address", e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.street_address}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="city" value="City" />
                        <TextInput
                            id="city"
                            name="city"
                            value={data.city}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("city", e.target.value)}
                            required
                        />
                        <InputError message={errors.city} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="region" value="Region" />
                        <TextInput
                            id="region"
                            name="region"
                            value={data.region}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("region", e.target.value)}
                            required
                        />
                        <InputError message={errors.region} className="mt-2" />
                    </div>
                </div>

                <div className="mt-8 border-t pt-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        Vehicle Information
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <InputLabel
                                htmlFor="vehicle_name"
                                value="Vehicle Name"
                            />
                            <TextInput
                                id="vehicle_name"
                                name="vehicle_name"
                                value={data.vehicle_name}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("vehicle_name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.vehicle_name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="vehicle_model"
                                value="Vehicle Model"
                            />
                            <TextInput
                                id="vehicle_model"
                                name="vehicle_model"
                                value={data.vehicle_model}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("vehicle_model", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.vehicle_model}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <InputLabel
                                htmlFor="vehicle_year"
                                value="Vehicle Year"
                            />
                            <TextInput
                                id="vehicle_year"
                                type="number"
                                name="vehicle_year"
                                value={data.vehicle_year}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("vehicle_year", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.vehicle_year}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="license_plate"
                                value="License Plate"
                            />
                            <TextInput
                                id="license_plate"
                                name="license_plate"
                                value={data.license_plate}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("license_plate", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.license_plate}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="vehicle_type"
                                value="Vehicle Type"
                            />
                            <TextInput
                                id="vehicle_type"
                                name="vehicle_type"
                                value={data.vehicle_type}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("vehicle_type", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.vehicle_type}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t pt-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
