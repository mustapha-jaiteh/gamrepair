<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = $this->user();
        $role = $user->role ?? null;

        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique($user::class)->ignore($user->id),
            ],
        ];

        if ($role === 'mechanic') {
            $rules = array_merge($rules, [
                'phone' => ['nullable', 'string', 'max:20'],
                'city' => ['nullable', 'string', 'max:255'],
                'mechanic_license' => ['required', 'string', 'max:50', Rule::unique(\App\Models\Mechanic::class)->ignore($user->id)],
                'years_of_experience' => ['nullable', 'integer', 'min:0'],
                'specialization' => ['nullable', 'string', 'max:255'],
            ]);
        } elseif ($role === 'admin') {
            // Admin only has name and email for now
        } else {
            // Default to User
            $rules = array_merge($rules, [
                'phone' => ['nullable', 'string', 'max:20'],
                'city' => ['nullable', 'string', 'max:255'],
                'vehicle_name' => ['nullable', 'string', 'max:255'],
                'license_plate' => ['nullable', 'string', 'max:50', Rule::unique(User::class)->ignore($user->id)],
                'vehicle_model' => ['nullable', 'string', 'max:255'],
                'vehicle_year' => ['nullable', 'integer', 'min:1900', 'max:' . (date('Y') + 1)],
            ]);
        }

        return $rules;
    }
}
