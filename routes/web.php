<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\MechanicController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\PublicController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'verifiedMechanicsCount' => \App\Models\Mechanic::where('is_verified', true)->count(),
    ]);
})->name('welcome');

Route::get('/mechanics-list', [PublicController::class, 'mechanics'])->name('public.mechanics');

Route::get('/dashboard', [UserDashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth:web,admin,mechanic')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Booking routes for users
    Route::get('/mechanics', [UserDashboardController::class, 'mechanics'])->name('user.mechanics');
    Route::get('/my-bookings', [UserDashboardController::class, 'bookings'])->name('user.bookings');
    Route::get('/my-bookings/{id}', [UserDashboardController::class, 'bookingDetails'])->name('user.booking-details');
    Route::get('/my-services/{id}', [UserDashboardController::class, 'serviceDetails'])->name('user.service-details');

    // Feedback submission
    Route::post('/feedback', [\App\Http\Controllers\FeedbackController::class, 'store'])->name('feedback.store');
});

// Unified Booking Routes (Guest & Auth)
Route::get('/book/{mechanic}', [BookingController::class, 'create'])->name('bookings.create');
Route::post('/book', [BookingController::class, 'store'])->name('bookings.store');

// Admin Routes
Route::middleware(['auth:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::get('/mechanics', [AdminController::class, 'mechanics'])->name('mechanics');
    Route::get('/bookings', [AdminController::class, 'bookings'])->name('bookings');
    Route::get('/services', [AdminController::class, 'services'])->name('services');
    Route::get('/feedbacks', [AdminController::class, 'feedbacks'])->name('feedbacks');
    Route::get('/logs', [AdminController::class, 'logs'])->name('logs');
    Route::get('/users/{id}', [AdminController::class, 'showUser'])->name('users.show');
    Route::get('/mechanics/{id}', [AdminController::class, 'showMechanic'])->name('mechanics.show');
    Route::put('/mechanics/{id}/verify', [AdminController::class, 'verifyMechanic'])->name('mechanics.verify');
    Route::get('/bookings/{id}', [AdminController::class, 'showBooking'])->name('bookings.show');
    Route::get('/services/{id}', [AdminController::class, 'showService'])->name('services.show');
    Route::delete('/users/{id}', [AdminController::class, 'destroyUser'])->name('users.destroy');
    Route::delete('/mechanics/{id}', [AdminController::class, 'destroyMechanic'])->name('mechanics.destroy');
    Route::put('/assign-mechanic/{id}', [BookingController::class, 'assignMechanic'])->name('assign-mechanic');
});

// Mechanic Routes
Route::middleware(['auth:mechanic'])->prefix('mechanics')->name('mechanics.')->group(function () {
    Route::get('/dashboard', [MechanicController::class, 'index'])->name('dashboard');
    Route::get('/requests', [MechanicController::class, 'assignedBookings'])->name('bookings');
    Route::get('/requests/{id}', [MechanicController::class, 'showBooking'])->name('booking.show');
    Route::put('/requests/{id}/accept', [MechanicController::class, 'acceptBooking'])->name('bookings.accept');
    Route::put('/requests/{id}/reject', [MechanicController::class, 'rejectBooking'])->name('bookings.reject');
    Route::post('/service-update', [MechanicController::class, 'updateService'])->name('service-update');
    Route::get('/services', [MechanicController::class, 'services'])->name('services');
    Route::get('/services/{id}', [MechanicController::class, 'showService'])->name('service.show');
});

Route::prefix('mechanics')->name('mechanics.')->group(function () {
    Route::get('/register', [MechanicController::class, 'create'])->name('register');
    Route::post('/register', [MechanicController::class, 'store']);
});

require __DIR__ . '/auth.php';
