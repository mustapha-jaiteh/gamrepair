<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $guard = $request->authenticate();

        $request->session()->regenerate();

        if ($guard === 'admin') {
            return redirect()->intended(route('admin.dashboard'));
        }

        if ($guard === 'mechanic') {
            /** @var \App\Models\Mechanic $mechanic */
            $mechanic = Auth::guard('mechanic')->user();
            $mechanic->is_online = true;
            $mechanic->save();

            broadcast(new \App\Events\MechanicStatusChanged($mechanic->id, true));

            return redirect()->intended(route('mechanics.dashboard'));
        }

        return redirect()->intended(route('dashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // If a mechanic is logging out, set them offline
        if (Auth::guard('mechanic')->check()) {
            /** @var \App\Models\Mechanic $mechanic */
            $mechanic = Auth::guard('mechanic')->user();
            $mechanic->is_online = false;
            $mechanic->save();

            broadcast(new \App\Events\MechanicStatusChanged($mechanic->id, false));
        }

        // Logout from all possible guards
        Auth::guard('web')->logout();
        Auth::guard('admin')->logout();
        Auth::guard('mechanic')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('welcome');
    }
}
