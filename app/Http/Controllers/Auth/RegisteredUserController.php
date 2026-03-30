<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string',
            'phone' => 'required|string',
            'street_address' => 'required|string',
            'city' => 'required|string',
            'region' => 'required|string',
            'vehicle_name' => 'required|string',
            'vehicle_model' => 'required|string',
            'vehicle_year' => 'required|integer|min:1900|max:' . date('Y'),
            'license_plate' => 'required|string|unique:users',
            'vehicle_type' => 'required|string',
            'username' => 'required|string|unique:users,username',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'phone' => $request->phone,
            'street_address' => $request->street_address,
            'city' => $request->city,
            'region' => $request->region,
            'vehicle_name' => $request->vehicle_name,
            'vehicle_model' => $request->vehicle_model,
            'vehicle_year' => $request->vehicle_year,
            'license_plate' => $request->license_plate,
            'vehicle_type' => $request->vehicle_type,
            'username' => $request->username,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return back();
    }
}
