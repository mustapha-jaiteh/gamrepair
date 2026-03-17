<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\MechanicController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Booking routes for users
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
});

// Admin Routes
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::get('/mechanics', [AdminController::class, 'mechanics'])->name('mechanics');
    Route::get('/bookings', [AdminController::class, 'bookings'])->name('bookings');
    Route::get('/services', [AdminController::class, 'services'])->name('services');
    Route::get('/feedbacks', [AdminController::class, 'feedbacks'])->name('feedbacks');
    Route::put('/assign-mechanic/{id}', [BookingController::class, 'assignMechanic'])->name('assign-mechanic');
});

// Mechanic Routes
Route::prefix('mechanics')->name('mechanics.')->group(function () {
    Route::get('/register', [MechanicController::class, 'create'])->name('register');
    Route::post('/register', [MechanicController::class, 'store']);
    Route::get('/bookings/{license}', [MechanicController::class, 'assignedBookings'])->name('bookings');
    Route::post('/service-update', [MechanicController::class, 'updateService'])->name('service-update');
    Route::get('/services/{license}', [MechanicController::class, 'services'])->name('services');
});

require __DIR__ . '/auth.php';
