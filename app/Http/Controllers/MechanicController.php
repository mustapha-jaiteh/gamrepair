<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Mechanic;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class MechanicController extends Controller
{
    /**
     * Display the mechanic registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Mechanic/Register');
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
     * Get assigned bookings for a mechanic.
     */
    public function assignedBookings(string $license): Response
    {
        $bookings = Booking::where('mechanic_license', $license)->get();

        return Inertia::render('Mechanic/AssignedBookings', [
            'bookings' => $bookings
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
            'charges' => 'nullable|numeric',
            'payment_status' => 'nullable|string',
            'paid_date' => 'nullable|date',
            'payment_receipt' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('payment_receipt')) {
            $path = $request->file('payment_receipt')->store('receipts', 'public');
            $validated['payment_receipt'] = $path;
        }

        Service::create($validated);

        return back()->with('success', 'Service updated successfully!');
    }

    /**
     * Display mechanic services.
     */
    public function services(string $license): Response
    {
        $services = Service::where('mechanic_license', $license)->get();

        return Inertia::render('Mechanic/Services', [
            'services' => $services
        ]);
    }
}
