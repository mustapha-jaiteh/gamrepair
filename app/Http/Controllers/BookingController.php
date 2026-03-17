<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    /**
     * Store a new booking.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'vehicle_name' => 'required|string',
            'license_plate' => 'required|string',
            'vehicle_owner' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'city' => 'required|string',
            'issue_description' => 'required|string',
            'date' => 'required|date',
        ]);

        Booking::create($validated);

        return back()->with('success', 'Booking created successfully!');
    }

    /**
     * Assign mechanic to booking.
     */
    public function assignMechanic(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'mechanic_license' => 'required|string',
            'mechanic_name' => 'required|string',
        ]);

        $booking = Booking::findOrFail($id);
        $booking->update([
            'mechanic_license' => $request->mechanic_license,
            'mechanic_name' => $request->mechanic_name,
            'assigned' => true,
        ]);

        return back()->with('success', 'Booking assigned successfully!');
    }
}
