import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { 
    Activity, 
    Calendar, 
    Clipboard, 
    User, 
    Wrench,
    Clock
} from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Logs({ logs }) {
    const getIcon = (iconName, colorClass) => {
        const icons = {
            calendar: <Calendar className={`w-5 h-5 text-${colorClass}-600`} />,
            clipboard: <Clipboard className={`w-5 h-5 text-${colorClass}-600`} />,
            user: <User className={`w-5 h-5 text-${colorClass}-600`} />,
            wrench: <Wrench className={`w-5 h-5 text-${colorClass}-600`} />,
        };
        return icons[iconName] || <Activity className={`w-5 h-5 text-${colorClass}-600`} />;
    };

    return (
        <AdminLayout>
            <Head title="System Logs" />

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                            <Activity className="w-8 h-8 text-blue-600" />
                            System Activity Logs
                        </h1>
                        <p className="text-slate-500 mt-1">Real-time overview of all system events and activities.</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                    {logs.length > 0 ? (
                        <div className="relative border-l-2 border-slate-100 ml-4 space-y-8">
                            {logs.map((log, index) => (
                                <div key={`${log.id}-${index}`} className="relative pl-8">
                                    <div className={`absolute -left-[17px] top-1 p-1.5 bg-white border-2 border-${log.color}-100 rounded-xl`}>
                                        <div className={`p-1.5 bg-${log.color}-50 rounded-lg`}>
                                            {getIcon(log.icon, log.color)}
                                        </div>
                                    </div>
                                    
                                    <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl p-5 transition-colors">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                                                {log.title}
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest bg-${log.color}-100 text-${log.color}-700`}>
                                                    {log.type}
                                                </span>
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                <Clock className="w-3.5 h-3.5" />
                                                {dayjs(log.created_at).fromNow()}
                                            </div>
                                        </div>
                                        
                                        <p className="text-slate-600 font-medium">
                                            {log.description}
                                        </p>
                                        
                                        <div className="mt-3 text-xs text-slate-400 font-medium flex items-center gap-2">
                                            <span>System Time: {dayjs(log.created_at).format('MMM D, YYYY h:mm A')}</span>
                                            <span>•</span>
                                            <span className="uppercase tracking-widest font-bold">Status: {log.status}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                <Activity className="w-10 h-10 text-slate-300" />
                            </div>
                            <h3 className="text-slate-900 font-bold text-xl mb-2">No Recent Activity</h3>
                            <p className="text-slate-500">The system logs are currently empty.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
