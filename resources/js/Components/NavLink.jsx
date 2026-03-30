import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-slate-800 text-white rounded-md px-3 py-1'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md px-3 py-1') +
                className
            }
        >
            {children}
        </Link>
    );
}
