<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class SendPasswordResetLinkRequest extends FormRequest
{
    public function rules()
    {
        return [
            'email' => 'required|email|exists:users,email',
        ];
    }
}
