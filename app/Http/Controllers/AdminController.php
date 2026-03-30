<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Mechanic;
use App\Models\Booking;
use App\Models\Service;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\MechanicVerifiedMail;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard with overview.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'usersCount' => User::count(),
            'mechanicsCount' => Mechanic::count(),
            'bookingsCount' => Booking::count(),
            'servicesCount' => Service::count(),
        ]);
    }

    /**
     * Display users list.
     */
    public function users(Request $request): Response
    {
        return Inertia::render('Admin/Users', [
            'users' => User::query()
                ->when($request->search, function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('license_plate', 'like', "%{$search}%");
                })
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Display mechanics list.
     */
    public function mechanics(Request $request): Response
    {
        return Inertia::render('Admin/Mechanics', [
            'mechanics' => Mechanic::query()
                ->when($request->search, function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('mechanic_license', 'like', "%{$search}%")
                        ->orWhere('specialization', 'like', "%{$search}%");
                })
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Display bookings list.
     */
    public function bookings(Request $request): Response
    {
        return Inertia::render('Admin/Bookings', [
            'bookings' => Booking::query()
                ->where('assigned', false)
                ->when($request->search, function ($query, $search) {
                    $query->where('id', 'like', "%{$search}%")
                        ->orWhere('license_plate', 'like', "%{$search}%")
                        ->orWhere('mechanic_license', 'like', "%{$search}%")
                        ->orWhere('vehicle_name', 'like', "%{$search}%");
                })
                ->latest()
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Display services list.
     */
    public function services(Request $request): Response
    {
        return Inertia::render('Admin/Services', [
            'services' => Service::query()
                ->when($request->search, function ($query, $search) {
                    $query->where('id', 'like', "%{$search}%")
                        ->orWhere('license_plate', 'like', "%{$search}%")
                        ->orWhere('mechanic_license', 'like', "%{$search}%")
                        ->orWhere('status', 'like', "%{$search}%");
                })
                ->latest()
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Display feedback list.
     */
    public function feedbacks(Request $request): Response
    {
        return Inertia::render('Admin/Feedbacks', [
            'feedbacks' => Feedback::with('service')
                ->when($request->search, function ($query, $search) {
                    $query->where('message', 'like', "%{$search}%")
                        ->orWhere('license_plate', 'like', "%{$search}%");
                })
                ->latest()
                ->paginate(10)
                ->withQueryString(),
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Display a specific user's details.
     */
    public function showUser(int $id): Response
    {
        return Inertia::render('Admin/UserDetails', [
            'user' => User::findOrFail($id),
            'bookings' => Booking::where('license_plate', User::findOrFail($id)->license_plate)->where('assigned', false)->get(),
            'services' => Service::where('license_plate', User::findOrFail($id)->license_plate)->get(),
        ]);
    }

    /**
     * Display a specific mechanic's details.
     */
    public function showMechanic(int $id): Response
    {
        return Inertia::render('Admin/MechanicDetails', [
            'mechanic' => Mechanic::findOrFail($id),
            'bookings' => Booking::where('mechanic_license', Mechanic::findOrFail($id)->mechanic_license)->where('assigned', false)->get(),
            'services' => Service::where('mechanic_license', Mechanic::findOrFail($id)->mechanic_license)->get(),
        ]);
    }

    /**
     * Display a specific booking's details.
     */
    public function showBooking(int $id): Response
    {
        return Inertia::render('Admin/BookingDetails', [
            'booking' => Booking::findOrFail($id)
        ]);
    }

    /**
     * Display a specific service's details.
     */
    public function showService(int $id): Response
    {
        return Inertia::render('Admin/ServiceDetails', [
            'service' => Service::findOrFail($id)
        ]);
    }
    /**
     * Delete a specific user.
     */
    public function destroyUser(int $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return redirect()->route('admin.users')->with('success', 'User deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to delete user. They may have related records.']);
        }
    }

    /**
     * Delete a specific mechanic.
     */
    public function destroyMechanic(int $id)
    {
        try {
            $mechanic = Mechanic::findOrFail($id);
            $mechanic->delete();
            return redirect()->route('admin.mechanics')->with('success', 'Mechanic removed successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to remove mechanic. They may have related records.']);
        }
    }

    /**
     * Display the system activity logs.
     */
    public function logs(Request $request): Response
    {
        // Fetch recent activities from various tables to create a unified log

        // 1. Recent Bookings
        $recentBookings = Booking::latest()->take(20)->get()->map(function ($booking) {
            return [
                'id' => 'booking_' . $booking->id,
                'type' => 'booking',
                'title' => 'New Booking Request',
                'description' => "Booking created for {$booking->vehicle_name} ({$booking->license_plate}) by {$booking->vehicle_owner}.",
                'created_at' => $booking->created_at,
                'status' => $booking->assigned ? 'assigned' : 'pending',
                'icon' => 'calendar',
                'color' => 'blue',
            ];
        });

        // 2. Recent Services
        $recentServices = Service::latest()->take(20)->get()->map(function ($service) {
            return [
                'id' => 'service_' . $service->id,
                'type' => 'service',
                'title' => 'Service Completed',
                'description' => "Service rendered for license plate {$service->license_plate} by mechanic {$service->mechanic_license}.",
                'created_at' => $service->created_at,
                'status' => 'completed',
                'icon' => 'clipboard',
                'color' => 'purple',
            ];
        });

        // 3. Recent Users
        $recentUsers = User::latest()->take(10)->get()->map(function ($user) {
            return [
                'id' => 'user_' . $user->id,
                'type' => 'user',
                'title' => 'New User Registration',
                'description' => "User {$user->name} registered from {$user->city}.",
                'created_at' => $user->created_at,
                'status' => 'info',
                'icon' => 'user',
                'color' => 'emerald',
            ];
        });

        // 4. Recent Mechanics
        $recentMechanics = Mechanic::latest()->take(10)->get()->map(function ($mechanic) {
            return [
                'id' => 'mechanic_' . $mechanic->id,
                'type' => 'mechanic',
                'title' => 'New Mechanic Onboarded',
                'description' => "Mechanic {$mechanic->name} ({$mechanic->specialization}) joined the platform.",
                'created_at' => $mechanic->created_at,
                'status' => 'info',
                'icon' => 'wrench',
                'color' => 'orange',
            ];
        });

        // Merge, sort by created_at descending, and paginate manually if needed, or just return the top N
        $allLogs = collect()
            ->merge($recentBookings)
            ->merge($recentServices)
            ->merge($recentUsers)
            ->merge($recentMechanics)
            ->sortByDesc('created_at')
            ->values()
            ->take(50); // Show top 50 recent activities

        return Inertia::render('Admin/Logs', [
            'logs' => $allLogs,
        ]);
    }

    /**
     * Toggle the verification status of a mechanic.
     */
    public function verifyMechanic(int $id)
    {
        try {
            $mechanic = Mechanic::findOrFail($id);
            $wasVerified = $mechanic->is_verified;

            $mechanic->is_verified = !$wasVerified;
            $mechanic->save();

            // Send email only when they are verified, not when revoked
            if (!$wasVerified && $mechanic->is_verified) {
                Mail::to($mechanic->email)->send(new MechanicVerifiedMail($mechanic));
            }

            $action = $mechanic->is_verified ? 'verified' : 'revoked';
            return redirect()->back()->with('success', "Mechanic successfully {$action}.");
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to update mechanics verification status.']);
        }
    }
}
