<?php

namespace App\Mail;

use App\Models\Mechanic;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MechanicVerifiedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $mechanic;

    /**
     * Create a new message instance.
     */
    public function __construct(Mechanic $mechanic)
    {
        $this->mechanic = $mechanic;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Congratulations! Your ORVBA Account is Verified',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.mechanics.verified',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
