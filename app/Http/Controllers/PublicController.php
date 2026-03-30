<?php

namespace App\Http\Controllers;

use App\Models\Mechanic;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    /**
     * Display a paginated list of mechanics for guests.
     */
    public function mechanics(Request $request): Response
    {
        return Inertia::render('Mechanics', [
            'mechanics' => Mechanic::query()
                ->where('is_verified', true)
                ->when($request->search, function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('specialization', 'like', "%{$search}%");
                })
                ->select(['id', 'name', 'profile_image', 'city', 'region', 'specialization', 'years_of_experience', 'phone'])
                ->paginate(12)
                ->withQueryString(),
            'filters' => $request->only(['search'])
        ]);
    }
}
