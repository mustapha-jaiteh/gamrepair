<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_name',
        'license_plate',
        'vehicle_owner',
        'email',
        'phone',
        'city',
        'issue_description',
        'date',
        'mechanic_license',
        'mechanic_name',
        'assigned',
        'user_id',
        'mechanic_id',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'assigned' => 'boolean',
        ];
    }

    public function service()
    {
        return $this->hasOne(Service::class);
    }
}
