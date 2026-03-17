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
    public function users(): Response
    {
        return Inertia::render('Admin/Users', [
            'users' => User::all()
        ]);
    }

    /**
     * Display mechanics list.
     */
    public function mechanics(): Response
    {
        return Inertia::render('Admin/Mechanics', [
            'mechanics' => Mechanic::all()
        ]);
    }

    /**
     * Display bookings list.
     */
    public function bookings(): Response
    {
        return Inertia::render('Admin/Bookings', [
            'bookings' => Booking::all()
        ]);
    }

    /**
     * Display services list.
     */
    public function services(): Response
    {
        return Inertia::render('Admin/Services', [
            'services' => Service::all()
        ]);
    }

    /**
     * Display feedback list.
     */
    public function feedbacks(): Response
    {
        return Inertia::render('Admin/Feedbacks', [
            'feedbacks' => Feedback::all()
        ]);
    }
}
