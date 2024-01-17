<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserLoginResource extends JsonResource
{
    private ?string $bearerToken;

    public function __construct($resource, ?string $bearerToken = null)
    {
        parent::__construct($resource);
        $this->bearerToken = $bearerToken;
    }

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'role' => $this->role,
            'verified' => $this->email_verified_at != null,
            'passwordReset' => $this->password_reset,
            'faculty' => $this->faculty ? new FacultyResource($this->faculty) : null,
            'token' => $this->bearerToken ?? $this->createToken('token', [$this->role->name])->plainTextToken
        ];
    }
}
