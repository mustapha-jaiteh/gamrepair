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
     * Show the form for creating a new booking.
     */
    public function create(\App\Models\Mechanic $mechanic): Response
    {
        return Inertia::render('Bookings/Create', [
            'mechanic' => $mechanic,
        ]);
    }

    /**
     * Store a new booking.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'mechanic_id' => 'required|exists:mechanics,id',
            'vehicle_name' => 'required|string',
            'license_plate' => 'required|string',
            'vehicle_owner' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'city' => 'required|string',
            'issue_description' => 'required|string',
            'date' => 'required|date',
        ]);

        $validated['user_id'] = \Illuminate\Support\Facades\Auth::check() ? \Illuminate\Support\Facades\Auth::id() : null;

        // If guest booking, attempt to link to a registered user by license plate
        if (!$validated['user_id']) {
            $user = \App\Models\User::where('license_plate', $validated['license_plate'])->first();
            if ($user) {
                $validated['user_id'] = $user->id;
            }
        }

        $validated['status'] = 'pending';

        $mechanic = \App\Models\Mechanic::findOrFail($validated['mechanic_id']);
        $validated['mechanic_name'] = $mechanic->name;
        $validated['mechanic_license'] = $mechanic->mechanic_license;

        Booking::create($validated);

        return back();
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
