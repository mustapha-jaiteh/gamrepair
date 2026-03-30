<?php

namespace App\Events;

use App\Models\Service;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ServiceUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $service;

    public function __construct(Service $service)
    {
        $this->service = $service;
    }

    public function broadcastOn(): array
    {
        // Broadcast globally and on specific booking ID so user dashboard can pick it up
        return [
            new Channel('services'),
            new Channel('service.booking_' . $this->service->booking_id),
            new Channel('admin-dashboard'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'ServiceUpdated';
    }
}
