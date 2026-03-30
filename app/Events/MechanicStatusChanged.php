<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MechanicStatusChanged implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $mechanicId;
    public $isOnline;

    /**
     * Create a new event instance.
     */
    public function __construct(int $mechanicId, bool $isOnline)
    {
        $this->mechanicId = $mechanicId;
        $this->isOnline = $isOnline;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('mechanics-public'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'MechanicStatusChanged';
    }
}
