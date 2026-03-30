<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Mechanic extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'profile_image',
        'name',
        'email',
        'role',
        'phone',
        'street_address',
        'city',
        'region',
        'mechanic_license',
        'years_of_experience',
        'specialization',
        'username',
        'password',
        'is_verified',
        'is_online',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'is_verified' => 'boolean',
            'is_online' => 'boolean',
        ];
    }
}
