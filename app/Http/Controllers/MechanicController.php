<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Mechanic;
use App\Models\Service;
use App\Events\BookingUpdated;
use App\Events\ServiceUpdated;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class MechanicController extends Controller
{
    /**
     * Display the mechanic dashboard.
     */
    public function index(): Response
    {
        $mechanic = Auth::guard('mechanic')->user();

        $bookings = Booking::where('mechanic_id', $mechanic->id)->get();
        // Fallback for old services matching license for backward compatibility during transition
        $services = Service::where('mechanic_license', $mechanic->mechanic_license)->get();

        // Performance stats
        $sixMonthsAgo = now()->subMonths(6);
        $jobOrder = $bookings->where('date', '>=', $sixMonthsAgo)->count();
        $completedServices = $services->where('status', 'completed')->count();

        // Latest service (simplified logic for now)
        $currentService = $services->sortByDesc('request_date')->first();

        return Inertia::render('Mechanic/Dashboard', [
            'mechanic' => $mechanic,
            'jobOrder' => $jobOrder,
            'completedServices' => $completedServices,
            'currentService' => $currentService,
            'bookings' => $bookings->where('assigned', false)->values(),
            'services' => $services
        ]);
    }

    /**
     * Display the mechanic registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Mechanics/Register');
    }

    /**
     * Handle mechanic registration.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'profile_image' => 'required|image|mimes:jpg,png,jpeg|max:2048',
            'name' => 'required|string',
            'email' => 'required|email|unique:mechanics',
            'role' => 'required|string',
            'phone' => 'required|string',
            'street_address' => 'required|string',
            'city' => 'required|string',
            'region' => 'required|string',
            'mechanic_license' => 'required|unique:mechanics',
            'years_of_experience' => 'required|string',
            'specialization' => 'required|string',
            'username' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $imagePath = $request->file('profile_image')->store('mechanic_profiles', 'public');

        Mechanic::create([
            'profile_image' => $imagePath,
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'phone' => $request->phone,
            'street_address' => $request->street_address,
            'city' => $request->city,
            'region' => $request->region,
            'mechanic_license' => $request->mechanic_license,
            'years_of_experience' => $request->years_of_experience,
            'specialization' => $request->specialization,
            'username' => $request->username,
            'password' => bcrypt($request->password),
        ]);

        return redirect()->route('login')->with('success', 'Mechanic registered successfully!');
    }

    /**
     * Get assigned booking requests for a mechanic.
     */
    public function assignedBookings(Request $request): Response
    {
        $mechanic = Auth::guard('mechanic')->user();
        $bookings = Booking::where('mechanic_id', $mechanic->id)
            ->where('assigned', false)
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('vehicle_name', 'like', "%{$search}%")
                        ->orWhere('license_plate', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('vehicle_owner', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Mechanic/AssignedBookings', [
            'bookings' => $bookings,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Display a specific booking detail.
     */
    public function showBooking(int $id): Response
    {
        return Inertia::render('Mechanic/BookingDetails', [
            'booking' => Booking::with('service')->findOrFail($id)
        ]);
    }

    /**
     * Update/Store service details.
     */
    public function updateService(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'booking_id' => 'required|integer',
            'license_plate' => 'required|string',
            'vehicle_name' => 'required|string',
            'vehicle_owner' => 'required|string',
            'mechanic_name' => 'required|string',
            'mechanic_license' => 'required|string',
            'mechanic_phone' => 'required|string',
            'mechanic_location' => 'required|string',
            'request_date' => 'required|date',
            'issue_description' => 'required|string',
            'status' => 'required|string',
        ]);

        $service = Service::updateOrCreate(
            ['booking_id' => $validated['booking_id']],
            $validated
        );

        // Also update the booking status if service is marked completed
        if (isset($validated['status'])) {
            $booking = Booking::where('id', $validated['booking_id'])->first();
            if ($booking) {
                $booking->update(['status' => $validated['status']]);
                broadcast(new BookingUpdated($booking));
            }
        }

        broadcast(new ServiceUpdated($service));

        return back()->with('success', 'Service updated successfully!');
    }

    /**
     * Display mechanic services.
     */
    public function services(Request $request): Response
    {
        $mechanic = Auth::guard('mechanic')->user();
        $services = Service::where('mechanic_license', $mechanic->mechanic_license)
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('vehicle_name', 'like', "%{$search}%")
                        ->orWhere('license_plate', 'like', "%{$search}%")
                        ->orWhere('vehicle_owner', 'like', "%{$search}%")
                        ->orWhere('status', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Mechanic/Services', [
            'services' => $services,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Display a specific service detail.
     */
    public function showService(int $id): Response
    {
        return Inertia::render('Mechanic/ServiceDetails', [
            'service' => Service::findOrFail($id)
        ]);
    }

    /**
     * Accept a booking request.
     */
    public function acceptBooking(int $id): RedirectResponse
    {
        $booking = Booking::findOrFail($id);

        if ($booking->mechanic_id !== Auth::guard('mechanic')->id()) {
            abort(403);
        }

        $mechanic = Auth::guard('mechanic')->user();
        $booking->update([
            'status' => 'accepted',
            'assigned' => true,
            'mechanic_name' => $mechanic->name,
            'mechanic_license' => $mechanic->mechanic_license,
        ]);

        // Auto-create/update initial service record
        $service = Service::updateOrCreate(
            ['booking_id' => $booking->id],
            [
                'license_plate' => $booking->license_plate,
                'vehicle_name' => $booking->vehicle_name,
                'vehicle_owner' => $booking->vehicle_owner,
                'mechanic_name' => Auth::guard('mechanic')->user()->name,
                'mechanic_license' => Auth::guard('mechanic')->user()->mechanic_license,
                'mechanic_phone' => Auth::guard('mechanic')->user()->phone,
                'mechanic_location' => Auth::guard('mechanic')->user()->city,
                'request_date' => $booking->date,
                'issue_description' => $booking->issue_description,
                'status' => 'accepted',
            ]
        );

        broadcast(new BookingUpdated($booking));
        broadcast(new ServiceUpdated($service));

        return back()->with('success', 'Booking accepted successfully! A service record has been created.');
    }

    /**
     * Reject a booking request.
     */
    public function rejectBooking(int $id): RedirectResponse
    {
        $booking = Booking::findOrFail($id);

        if ($booking->mechanic_id !== Auth::guard('mechanic')->id()) {
            abort(403);
        }

        $booking->update([
            'status' => 'rejected',
            'assigned' => false
        ]);

        broadcast(new BookingUpdated($booking));

        return back()->with('success', 'Booking request declined.');
    }
}
