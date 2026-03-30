<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class UserDashboardController extends Controller
{
    /**
     * Display the user dashboard with their data.
     */
    public function index(): Response
    {
        $user = Auth::user();

        // Fetch bookings and services related to this user's license plate
        // Note: In a real app, we'd use a foreign key, but following original logic:
        $bookings = Booking::where('license_plate', $user->license_plate)->get();
        $services = Service::where('license_plate', $user->license_plate)->get();

        return Inertia::render('Dashboard', [
            'bookings' => $bookings,
            'services' => $services,
        ]);
    }

    public function mechanics(Request $request): Response
    {
        return Inertia::render('User/Mechanics', [
            'mechanics' => \App\Models\Mechanic::query()
                ->where('is_verified', true)
                ->when($request->search, function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('specialization', 'like', "%{$search}%");
                })
                ->paginate(9)
                ->withQueryString(),
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Display the user's booking history.
     */
    public function bookings(Request $request): Response
    {
        $user = Auth::user();
        $bookings = Booking::where('license_plate', $user->license_plate)
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('vehicle_name', 'like', "%{$search}%")
                        ->orWhere('mechanic_license', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('status', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('User/Bookings', [
            'bookings' => $bookings,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Display a specific service detail for the user.
     */
    public function serviceDetails(int $id): Response
    {
        $service = Service::findOrFail($id);

        // Security check: ensure this service belongs to the user
        if ($service->license_plate !== Auth::user()->license_plate) {
            abort(403);
        }

        return Inertia::render('User/ServiceDetails', [
            'service' => $service->load('feedback'),
        ]);
    }
    /**
     * Display a specific booking detail for the user.
     */
    public function bookingDetails(int $id): Response
    {
        $booking = Booking::findOrFail($id);

        // Security check: ensure this booking belongs to the user
        if ($booking->license_plate !== Auth::user()->license_plate) {
            abort(403);
        }

        return Inertia::render('User/BookingDetails', [
            'booking' => $booking->load('service.feedback'),
        ]);
    }
}
