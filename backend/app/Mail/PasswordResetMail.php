<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $token; // Token als Code

    public function __construct(string $token)
    {
        $this->token = $token;
    }

    public function build(): PasswordResetMail
    {
        return $this->subject('Passwort zurücksetzen')
            ->view('email.password-reset') // E-Mail-Template
            ->with([
                'token' => $this->token // Füge den Token (Code) hinzu
            ]);
    }
}
