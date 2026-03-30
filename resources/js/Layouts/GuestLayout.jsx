import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-slate-50 py-12 sm:justify-center">
            <Link href="/" className="mb-8 flex items-center gap-3 group cursor-pointer">
                <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-xl shadow-indigo-200 transition-transform group-hover:scale-110">
                    <ApplicationLogo className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black text-slate-900 tracking-tighter">ORVBA<span className="text-indigo-600">.</span></span>
            </Link>

            <div className="mt-6 w-full overflow-hidden bg-white px-8 py-10 shadow-2xl border border-slate-100 sm:max-w-2xl sm:rounded-[2.5rem]">
                {children}
            </div>
        </div>
    );
}
