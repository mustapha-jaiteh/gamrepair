import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (links.length === 3) return null;

    return (
        <div className="flex flex-wrap justify-center gap-1 py-4">
            {links.map((link, key) => (
                link.url === null ? (
                    <div
                        key={key}
                        className="px-4 py-3 text-sm leading-4 text-slate-400 border border-slate-100 rounded-xl bg-white"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <Link
                        key={key}
                        className={`px-4 py-3 text-sm leading-4 border rounded-xl transition-all duration-200 ${
                            link.active
                                ? 'bg-slate-800 text-white border-slate-800 font-bold shadow-lg shadow-slate-200'
                                : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                        }`}
                        href={link.url}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                )
            ))}
        </div>
    );
}
