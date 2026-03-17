<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Mechanic extends Authenticatable
{
    use HasFactory, Notifiable;

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
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }
}
