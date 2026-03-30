<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    /**
     * Display a listing of feedback for Admin.
     */
    public function index()
    {
        $feedbacks = Feedback::with('service')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Feedback', [
            'feedbacks' => $feedbacks
        ]);
    }

    /**
     * Store a newly created feedback in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'license_plate' => 'required|string',
            'message' => 'required|string|max:1000',
        ]);

        Feedback::create([
            'service_id' => $request->service_id,
            'license_plate' => $request->license_plate,
            'message' => $request->message,
        ]);

        return back()->with('success', 'Feedback submitted successfully!');
    }
}
