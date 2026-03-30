<x-mail::message>
    # Welcome to ORVBA!

    Hi {{ $mechanic->name }},

    Great news! Your mechanic account has been successfully verified by our administrators.

    You are now officially listed on our public directory, meaning drivers in need of breakdown assistance can find and contact you directly.

    <x-mail::button :url="url('/mechanic/dashboard')">
        View Your Dashboard
    </x-mail::button>

    Make sure your profile remains up to date, and thank you for being a reliable partner on our platform.

    Best regards,<br>
    The {{ config('app.name') }} Team
</x-mail::message>