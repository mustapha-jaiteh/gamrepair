import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone: user.phone || '',
            city: user.city || '',
            // User specific
            vehicle_name: user.vehicle_name || '',
            vehicle_model: user.vehicle_model || '',
            vehicle_year: user.vehicle_year || '',
            license_plate: user.license_plate || '',
            // Mechanic specific
            mechanic_license: user.mechanic_license || '',
            years_of_experience: user.years_of_experience || '',
            specialization: user.specialization || '',
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    const isUser = user.role !== 'admin' && user.role !== 'mechanic';
    const isMechanic = user.role === 'mechanic';
    const isAdmin = user.role === 'admin';

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {(isUser || isMechanic) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="phone" value="Phone Number" />
                            <TextInput
                                id="phone"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.phone} />
                        </div>

                        <div>
                            <InputLabel htmlFor="city" value="City" />
                            <TextInput
                                id="city"
                                className="mt-1 block w-full"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.city} />
                        </div>
                    </div>
                )}

                {isMechanic && (
                    <div className="pt-6 border-t border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Mechanic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="mechanic_license" value="Mechanic License" />
                                <TextInput
                                    id="mechanic_license"
                                    className="mt-1 block w-full"
                                    value={data.mechanic_license}
                                    onChange={(e) => setData('mechanic_license', e.target.value)}
                                    required
                                />
                                <InputError className="mt-2" message={errors.mechanic_license} />
                            </div>

                            <div>
                                <InputLabel htmlFor="years_of_experience" value="Years of Experience" />
                                <TextInput
                                    id="years_of_experience"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.years_of_experience}
                                    onChange={(e) => setData('years_of_experience', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.years_of_experience} />
                            </div>

                            <div className="md:col-span-2">
                                <InputLabel htmlFor="specialization" value="Specialization" />
                                <TextInput
                                    id="specialization"
                                    className="mt-1 block w-full"
                                    value={data.specialization}
                                    onChange={(e) => setData('specialization', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.specialization} />
                            </div>
                        </div>
                    </div>
                )}

                {isUser && (
                    <div className="pt-6 border-t border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Vehicle Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="vehicle_name" value="Vehicle Name" />
                                <TextInput
                                    id="vehicle_name"
                                    className="mt-1 block w-full"
                                    value={data.vehicle_name}
                                    onChange={(e) => setData('vehicle_name', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.vehicle_name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="license_plate" value="License Plate" />
                                <TextInput
                                    id="license_plate"
                                    className="mt-1 block w-full"
                                    value={data.license_plate}
                                    onChange={(e) => setData('license_plate', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.license_plate} />
                            </div>

                            <div>
                                <InputLabel htmlFor="vehicle_model" value="Vehicle Model" />
                                <TextInput
                                    id="vehicle_model"
                                    className="mt-1 block w-full"
                                    value={data.vehicle_model}
                                    onChange={(e) => setData('vehicle_model', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.vehicle_model} />
                            </div>

                            <div>
                                <InputLabel htmlFor="vehicle_year" value="Vehicle Year" />
                                <TextInput
                                    id="vehicle_year"
                                    type="number"
                                    className="mt-1 block w-full"
                                    value={data.vehicle_year}
                                    onChange={(e) => setData('vehicle_year', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.vehicle_year} />
                            </div>
                        </div>
                    </div>
                )}

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
